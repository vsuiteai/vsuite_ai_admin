import { v4 as uuidv4 } from "uuid";
import {
  get_consultant_by_email,
  get_consultant_by_id,
  update_consultant,
} from "~/server/controller/consultantCont";
import bcrypt from "bcrypt";
import { get_admin_by_username } from "~/server/controller/adminCont";
import { generate_consultant_update_mail } from "~/mails/updated_consultant_mail";
import { parent_routes } from "~/config/parent_routes";

export default defineEventHandler(async (event) => {
  try {
    let send_consultant_updated_email = false;
    const body = await readBody(event);

    const updateData: Record<string, any> = {};

    const consultant_id = getRouterParam(event, "uid");

    const consultant_first_name = body?.consultant_first_name ?? "";
    const consultant_last_name = body?.consultant_last_name ?? "";
    const consultant_role = body?.consultant_role ?? "";
    const consultant_home_address = body?.consultant_home_address ?? "";
    const consultant_email = body?.consultant_email ?? "";
    const consultant_password = body?.consultant_password ?? "";
    const is_active = body?.is_active ?? null;

    if (!consultant_id) throw new Error("Consultant ID missing");

    const consultant = await get_consultant_by_id(consultant_id);
    if (!consultant) throw new Error("Consultant not found");

    // If email is changed, ensure it's not taken by another consultant or admin
    if (consultant_email && consultant_email !== consultant.consultant_email) {
      const email_taken_by_admin = await get_admin_by_username(
        consultant_email
      );
      if (email_taken_by_admin)
        throw new Error("Email already taken by an admin");

      const email_taken_by_consultant = await get_consultant_by_email(
        consultant_email
      );
      if (
        email_taken_by_consultant &&
        email_taken_by_consultant.consultant_id !== consultant_id
      ) {
        throw new Error("Email already exists");
      }

      updateData.consultant_email = consultant_email;
      send_consultant_updated_email = true;
    }

    // Update only the fields that exist in the request body
    if (consultant_first_name) {
      updateData.consultant_first_name = consultant_first_name;
      send_consultant_updated_email = true;
    }

    if (consultant_last_name) {
      updateData.consultant_last_name = consultant_last_name;
      send_consultant_updated_email = true;
    }

    if (consultant_role) updateData.consultant_role = consultant_role;

    if (consultant_home_address)
      updateData.consultant_home_address = consultant_home_address;

    if (is_active !== undefined) updateData.is_active = is_active;

    if (consultant_password) {
      const hashedPassword = await bcrypt.hash(consultant_password, 10);
      updateData.consultant_password = hashedPassword;

      send_consultant_updated_email = true;
    }

    // If no fields were passed to update
    if (Object.keys(updateData).length === 0) {
      throw new Error("No data provided to update");
    }

    const updated_consultant = await update_consultant(
      consultant_id,
      updateData
    );

    if (send_consultant_updated_email) {
      await send_updated_data_consultant(
        consultant_first_name,
        consultant_last_name,
        consultant_email,
        consultant_password
      );
    }

    return {
      error: false,
      data: { updated_consultant },
      message: "Consultant updated successfully",
    };
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      return { error: true, data: null, message: err.message };
    } else {
      return { error: true, data: null, message: String(err) };
    }
  }
});

const send_updated_data_consultant = async (
  consultant_first_name: string,
  consultant_last_name: string,
  consultant_email: string,
  consultant_password: string
) => {
  const consultant_name = `${consultant_first_name} ${consultant_last_name}`;
  const updated_consultant_email = consultant_email ? consultant_email : false;
  const updated_consultant_password = consultant_password
    ? consultant_password
    : false;

  const current_domain = process.env.CURRENT_DOMAIN ?? "";
  const login_url = `${current_domain}${parent_routes.web_app.sign_in.path}`;

  const new_consultant_email = generate_consultant_update_mail(
    consultant_name,
    updated_consultant_email,
    login_url,
    updated_consultant_password
  );

  await sendEmail(
    consultant_email,
    "vSuite - Consultant Account Update",
    new_consultant_email
  );
};
