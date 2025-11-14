import { get_admin_by_username } from "~/server/controller/adminCont";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { get_consultant_by_email } from "~/server/controller/consultantCont";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const admin_username = body.admin_username ?? "";
  const admin_password = body.admin_password ?? "";

  if (admin_username === "" || admin_password === "") {
    throw new Error("Required detail(s) missing");
  }

  const admin = await get_admin_by_username(admin_username);

  if (!admin) {
    const consultant = await get_consultant_by_email(admin_username);

    if (!consultant)
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email",
      });

    const consultant_password_isMatch = await bcrypt.compare(
      admin_password,
      consultant.consultant_password
    );

    if (!consultant_password_isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Wrong consultant password",
      });
    }

    await setUserSession(event, {
      user: {
        id: consultant.consultant_id,
        email: consultant.consultant_email,
        name: consultant.consultant_first_name ?? "",
        category: "consultant",
      },
    });
    return { message: "Login successful" };
  }

  const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
  if (!isMatch) {
    throw createError({
      statusCode: 401,
      statusMessage: "Wrong admin password",
    });
  }

  await setUserSession(event, {
    user: {
      id: admin.admin_id,
      email: admin.admin_username,
      name: admin.admin_firstname ?? "",
      category: "admin",
    },
  });
  return { message: "Login successful" };
});
