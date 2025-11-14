import {
  create_admin,
  get_admin_by_username,
} from "~/server/controller/adminCont";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const admin_username = body.admin_username ?? "";
    const admin_firstname = body.admin_firstname ?? "";
    const admin_lastname = body.admin_lastname ?? "";
    const admin_password = body.admin_password ?? "";

    if (
      admin_username === "" ||
      admin_firstname === "" ||
      admin_lastname === "" ||
      admin_password === ""
    ) {
      throw new Error("Required detail(s) missing");
    }

    const admin_is_a_duplicate = await get_admin_by_username(admin_username);

    if (admin_is_a_duplicate) {
      throw new Error("Admin with this email already exist");
    }

    const hashedPassword = await bcrypt.hash(admin_password, 10);

    const res = await create_admin({
      admin_username: admin_username,
      admin_firstname: admin_firstname,
      admin_lastname: admin_lastname,
      admin_password: hashedPassword,
    });

    return {
      error: false,
      data: res,
      message: "admin created",
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
