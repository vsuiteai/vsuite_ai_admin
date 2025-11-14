import { Admins } from "~/server/models/index";

const get_admin_by_username = async (admin_username: string) => {
  const admin = await Admins.findOne({
    where: { admin_username: admin_username },
  });
  if (admin === null) {
    return null;
  } else {
    return admin.dataValues as AdminDetail;
  }
};

const create_admin = async (admin_details: AdminDetail) => {
  const res = await (
    await Admins.create({
      admin_id: admin_details.admin_id,
      admin_username: admin_details.admin_username,
      admin_firstname: admin_details.admin_firstname,
      admin_lastname: admin_details.admin_lastname,
      admin_password: admin_details.admin_password,
    })
  ).save();

  const new_admin = res.dataValues as AdminDetail;
  // console.log(res.dataValues);

  return { message: "Admin created", admin_id: new_admin.admin_id };
};

const get_admins = async ({
  limit = 10,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  const { rows: admins, count: total } = await Admins.findAndCountAll({
    limit,
    offset,
    order: [["admin_created_at", "DESC"]],
  });

  return { admins, total };
};

export { create_admin, get_admin_by_username, get_admins };
