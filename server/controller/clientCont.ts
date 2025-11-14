import "dotenv/config";

import {
  Clients,
  ClientVerification,
  Consultants,
  ConsultantClient,
} from "~/server/models/index";
import { sendEmail } from "../utils/sendEmail";
import { generate_incomplete_file_submission_mail } from "~/mails/incomplete_file_submission_mail";
import { generate_onboarding_mail } from "~/mails/onboarding_mail";
import { fn, col, Op } from "sequelize";

import { generateExpiresAt } from "../utils/generateExpiresAt";
import { generate_verification_mail } from "~/mails/verification_mail";
import { v4 as uuidv4 } from "uuid";

const get_clients = async ({
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
  filter_consultant: string | null;
  filter_date_from: string | null;
  filter_date_to: string | null;
}) => {
  const where: any = {};

  // Filter search term
  if (search_term != "") {
    where[Op.or] = [
      {
        client_company_name: {
          [Op.substring]: search_term,
        },
      },
      {
        client_contact_fullname: {
          [Op.substring]: search_term,
        },
      },
      {
        client_contact_work_email: {
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
  console.log(filter_consultant);
  const include: any[] = [];

  if (filter_consultant && filter_consultant.length > 0) {
    include.push({
      model: ConsultantClient,
      as: "consultant_clients",
      where: {
        consultant_id: {
          [Op.in]: filter_consultant,
        },
      },
      required: true,
    });
  }

  // Filter date range
  if (filter_date_from && filter_date_to) {
    where.createdAt = {
      [Op.between]: [new Date(filter_date_from), new Date(filter_date_to)],
    };
  }

  console.log(where);
  const { rows: clients, count: total } = await Clients.findAndCountAll({
    limit,
    offset,
    order: [["client_created_at", "DESC"]],
    where,
  });

  return { clients, total };
};

const get_client_by_uuid = async (client_uid: string) => {
  const client = await Clients.findOne({
    where: { client_uid: client_uid },
    include: [
      {
        model: Consultants,
        through: { attributes: [] }, // hide join table fields if not needed
        attributes: [
          "consultant_id",
          "consultant_first_name",
          "consultant_last_name",
          "consultant_email",
          "consultant_role",
          // add other Consultant fields you want
        ],
      },
    ],
  });

  if (client === null) {
    return null;
  } else {
    return client.dataValues as ClientDetail;
  }
};

const get_client_by_id = async (client_id: string) => {
  const client = await Clients.findOne({ where: { client_id: client_id } });
  if (client === null) {
    return null;
  } else {
    return client.dataValues as ClientDetail;
  }
};

const get_client_verificatn_by_verificatn_token = async (
  verification_token: string
) => {
  const client_verf = await ClientVerification.findOne({
    where: { cl_ver_verification_token: verification_token },
  });
  if (client_verf === null) {
    return null;
  } else {
    return client_verf.dataValues as AClientVerificationRow;
  }
};

const get_client_by_email = async (client_primary_work_email: string) => {
  const client = await Clients.findOne({
    where: { client_contact_work_email: client_primary_work_email },
  });
  if (client === null) {
    return null;
  } else {
    return client.dataValues as ClientDetail;
  }
};

const init_client_onboarding = async (client_ver: AClientVerificationRow) => {
  const current_domain = process.env.CURRENT_DOMAIN ?? "";
  if (!client_ver || current_domain === "") return false;

  const client_details = await get_client_by_id(client_ver.cl_ver_client_id);
  if (!client_details) return false;

  const ceo_onboarding_link = `${current_domain}/client-onboarding?uid=${client_details.client_uid}`;
  const advisior_onboarding_link = `${current_domain}/advisior-onboarding?uid=${client_details.client_uid}`;
  const asset_upload_link = `${current_domain}/asset-upload?uid=${client_details.client_uid}`;

  const html_body = generate_onboarding_mail(
    client_details.client_contact_fullname,
    ceo_onboarding_link,
    advisior_onboarding_link,
    asset_upload_link
  );

  const subject = "Client Onboarding - VSuite";
  sendEmail(client_details.client_contact_work_email, subject, html_body);
};

const email_client_by_uuid = async (
  client_uid: string,
  mail_type: EmailTypes,
  metricsHtmlString: string
) => {
  let html_body;
  let subject;
  const client = await Clients.findOne({ where: { client_uid: client_uid } });

  if (client === null) {
    return null;
  }

  const resolved_client = client.dataValues as ClientDetail;

  switch (mail_type) {
    case "insufficient_files":
      subject = "Incomplete File Submission";
      html_body = generate_incomplete_file_submission_mail(metricsHtmlString);
      break;
  }

  sendEmail(resolved_client.client_contact_work_email, subject, html_body);
};

const get_client_analytics = async () => {
  // 1. Total Clients
  const total_clients = await Clients.count();

  // 2. Total Clients grouped by industries
  const clients_by_industry = await Clients.findAll({
    attributes: ["client_industry", [fn("COUNT", col("client_id")), "total"]],
    group: ["client_industry"],
  });

  return {
    total_clients,
    clients_by_industry: clients_by_industry.map((row: any) => ({
      label: row.client_industry || "Unspecified",
      count: row.get("total"),
    })),
  };
};

const create_client = async (client_details: ClientDetail) => {
  const res = await (
    await Clients.create({
      client_uid: client_details.client_uid,
      client_contact_fullname: client_details.client_contact_fullname,
      client_contact_phone: client_details.client_contact_phone,
      client_contact_work_email: client_details.client_contact_work_email,
      client_company_name: client_details.client_company_name,
      client_contact_role: client_details.client_contact_role,
      client_is_verified: false,
    })
  ).save();

  // console.log(res.dataValues);

  return res.dataValues as ClientDetail;
};

const init_client_verification = async (
  client_details: ClientDetail,
  current_domain: string
) => {
  let verification_token_is_a_duplicate = true;
  let verification_token = "";

  while (verification_token_is_a_duplicate) {
    verification_token = uuidv4();

    let get_client = await get_client_verificatn_by_verificatn_token(
      verification_token
    );
    verification_token_is_a_duplicate = get_client ? true : false;
  }

  const token_expires_at_hours = 24;
  const token_expires_at = generateExpiresAt(token_expires_at_hours);

  // console.log(token_expires_at);

  await (
    await ClientVerification.create({
      cl_ver_verification_token: verification_token,
      cl_ver_client_id: client_details.client_id,
      cl_ver_is_verified: false,
      cl_ver_token_expires_at: token_expires_at,
    })
  ).save();

  const verification_link = `${current_domain}/verify?token=${verification_token}`;
  const html_body = generate_verification_mail(
    client_details.client_contact_fullname,
    verification_link,
    token_expires_at_hours
  );
  const subject = "Email verification - VSuite";
  sendEmail(client_details.client_contact_work_email, subject, html_body);
};

const verify_client = async (client_id: string, verification_token: string) => {
  await ClientVerification.update(
    { cl_ver_is_verified: true },
    {
      where: {
        cl_ver_verification_token: verification_token,
      },
    }
  );

  await Clients.update(
    { client_is_verified: true },
    {
      where: {
        client_id: client_id,
      },
    }
  );
};

const attach_consultants_to_client = async (
  client_id: number,
  consultantIds: number[]
) => {
  try {
    // Find the client

    const client = await Clients.findOne({ where: { client_id: client_id } });

    if (!client) throw new Error("Client not found");

    // Find consultants

    const consultants = await Consultants.findAll({
      where: {
        consultant_id: {
          [Op.in]: consultantIds,
        },
      },
    });

    const foundIds = consultants.map((c: any) => c.consultant_id);
    const missing = consultantIds.filter((id) => !foundIds.includes(id));

    if (missing.length) {
      throw new Error(`Consultants not found: ${missing.join(", ")}`);
    }

    const rows = consultantIds.map((cid) => ({
      consultant_id: cid,
      client_id: client_id,
      attached_at: new Date(),
    }));

    // Attach consultants to the client
    for (const row of rows) {
      await ConsultantClient.upsert({
        consultant_id: row.consultant_id,
        client_id: row.client_id,
        // attached_at: new Date(),
      });
    }

    return { success: true, message: "Consultants attached successfully" };
  } catch (error: any) {
    console.error("Error attaching consultants:", error.message);
    return { success: false, error: error.message };
  }
};

export {
  get_clients,
  get_client_by_id,
  get_client_by_uuid,
  get_client_by_email,
  get_client_verificatn_by_verificatn_token,
  init_client_onboarding,
  email_client_by_uuid,
  get_client_analytics,
  create_client,
  init_client_verification,
  verify_client,
  attach_consultants_to_client,
};
