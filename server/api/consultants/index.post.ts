import { v4 as uuidv4 } from "uuid";
import {
  get_consultant_by_email,
  create_consultant,
} from "~/server/controller/consultantCont";
import bcrypt from "bcrypt";
import { get_admin_by_username } from "~/server/controller/adminCont";
import { generate_new_consultant_mail } from "~/mails/new_consultant_mail";
import { parent_routes } from "~/config/parent_routes";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const consultant_first_name = body?.consultant_first_name ?? "";
    const consultant_last_name = body?.consultant_last_name ?? "";
    const consultant_role = body?.consultant_role ?? "";
    const consultant_home_address = body?.consultant_home_address ?? "";
    const consultant_email = body?.consultant_email ?? "";
    const consultant_password = body?.consultant_password ?? "";
    const is_active = body?.is_active ?? null;

    if (
      consultant_first_name === "" ||
      consultant_last_name === "" ||
      consultant_role === "" ||
      consultant_home_address === "" ||
      consultant_email === "" ||
      consultant_password === ""
    ) {
      throw new Error("Required detail(s) missing");
    }

    let email_already_belongs_to_an_admin = await get_admin_by_username(
      consultant_email
    );

    if (email_already_belongs_to_an_admin) {
      throw new Error("Email already taken by an admin");
    }

    let email_is_a_duplicate = await get_consultant_by_email(consultant_email);

    if (email_is_a_duplicate) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(consultant_password, 10);

    const res = await create_consultant({
      consultant_first_name: consultant_first_name,
      consultant_last_name: consultant_last_name,
      consultant_role: consultant_role,
      consultant_home_address: consultant_home_address,
      consultant_email: consultant_email,
      consultant_password: hashedPassword,
    });

    const consultant_name = `${consultant_first_name} ${consultant_last_name}`;
    const current_domain = process.env.CURRENT_DOMAIN ?? "";
    const login_url = `${current_domain}${parent_routes.web_app.sign_in.path}`;

    const new_consultant_email = generate_new_consultant_mail(
      consultant_name,
      consultant_email,
      consultant_password,
      login_url
    );

    await sendEmail(
      consultant_email,
      "Welcome to vSuite – Your Consultant Account Details",
      new_consultant_email
    );

    return {
      error: false,
      data: res,
      message: "consultant created",
    };
  } catch (err) {
    console.log(err);

    if (err instanceof Error) {
      return {
        error: true,
        data: null,
        message: err.message,
      };
    } else {
      return {
        error: true,
        data: null,
        message: String(err),
      };
    }
  }
});
