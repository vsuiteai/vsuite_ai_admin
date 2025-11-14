import { Consultants, Clients } from "~/server/models/index";
import { Op } from "sequelize";

// Define the consultant data shape (you can expand this as your model grows)
interface ConsultantAttributes {
  consultant_id: number;
  consultant_first_name?: string;
  consultant_last_name?: string;
  consultant_role?: string;
  consultant_home_address?: string;
  consultant_email?: string;
  consultant_password?: string;
  is_active?: boolean | null;
}

const update_consultant = async (
  consultant_id: string,
  data: Partial<ConsultantAttributes>
) => {
  let consultant = await Consultants.findOne({ where: { consultant_id } });
  if (!consultant) return null;

  await consultant.update(data);
  return await get_consultant_by_id(consultant_id);
};

const get_consultant_by_id = async (consultant_id: string) => {
  const consultant = await Consultants.findOne({
    where: { consultant_id: consultant_id },
    include: [
      {
        model: Clients,
        through: { attributes: [] }, // hide join table fields if not needed
        attributes: [
          "client_id",
          "client_uid",
          "client_contact_fullname",
          "client_contact_work_email",
          "client_company_name",
          "client_contact_role",
          "onboarding_process_status",
          // add other Client fields you want
        ],
      },
    ],
  });
  if (consultant === null) {
    return null;
  } else {
    return consultant.dataValues as ConsultantDetail;
  }
};

const get_consultant_by_email = async (consultant_email: string) => {
  const consultant = await Consultants.findOne({
    where: { consultant_email: consultant_email },
  });
  if (consultant === null) {
    return null;
  } else {
    return consultant.dataValues as ConsultantDetail;
  }
};

const create_consultant = async (consultant_details: ConsultantDetail) => {
  const res = await (
    await Consultants.create({
      // consultant_id: consultant_details.consultant_id,
      consultant_first_name: consultant_details.consultant_first_name,
      consultant_last_name: consultant_details.consultant_last_name,
      consultant_home_address: consultant_details.consultant_home_address,
      consultant_email: consultant_details.consultant_email,
      consultant_password: consultant_details.consultant_password,

      consultant_role: consultant_details.consultant_role,
    })
  ).save();

  const new_consultant = res.dataValues as ConsultantDetail;
  // console.log(res.dataValues);

  return {
    message: "consultant created",
    consultant_id: new_consultant.consultant_id,
  };
};

const get_consultants = async ({
  limit = 10,
  offset = 0,
  search_term = "",
  filter_status = null,
  filter_consultant = null,
  filter_date_from = null,
  filter_date_to = null,
}: {
  limit: number;
  offset: number;
  search_term: string;
  filter_status: string | null;
  filter_consultant: number | null;
  filter_date_from: string | null;
  filter_date_to: string | null;
}) => {
  const where: any = {};

  /**
   * consultant_id?: string;
    consultant_first_name: string;
    consultant_last_name: string;
    consultant_home_address: string;
    consultant_email: string;
    consultant_password: string;
    consultant_created_at?: string;
   */
  // Filter search term
  if (search_term != "") {
    where[Op.or] = [
      {
        consultant_first_name: {
          [Op.substring]: search_term,
        },
      },
      {
        consultant_last_name: {
          [Op.substring]: search_term,
        },
      },
      {
        consultant_email: {
          [Op.substring]: search_term,
        },
      },
    ];
  }

  // Filter status
  if (filter_status === "true") {
    where.status = 1;
  } else if (filter_status === "false") {
    where.status = 0;
  }

  // Filter consultant
  if (filter_consultant) {
    where.consultant = filter_consultant;
  }

  // Filter date range
  if (filter_date_from && filter_date_to) {
    where.createdAt = {
      [Op.between]: [new Date(filter_date_from), new Date(filter_date_to)],
    };
  }

  // console.log(filter_status);
  // console.log(where);

  const { rows: consultants, count: total } = await Consultants.findAndCountAll(
    {
      limit,
      offset,
      order: [["consultant_created_at", "DESC"]],
      where,
      include: [
        {
          model: Clients,
          through: { attributes: [] }, // hide join table fields if not needed
          attributes: [
            "client_id",
            "client_uid",
            "client_contact_fullname",
            "client_contact_work_email",
            "client_company_name",
            "client_contact_role",
            "onboarding_process_status",
            // add other Client fields you want
          ],
        },
      ],
    }
  );
  return { consultants, total };
};

const get_consultant_analytics = async () => {
  const total_consultants = await Consultants.count();

  return {
    total_consultants,
  };
};

export {
  update_consultant,
  create_consultant,
  get_consultant_by_email,
  get_consultant_by_id,
  get_consultants,
  get_consultant_analytics,
};
