import { Clients, ClientFiles } from "~/server/models/index";

function mapMimeTypeToFileType(
  mimeType: string
): "csv" | "pdf" | "xlsx" | "word" {
  const mimeMap: Record<string, "csv" | "pdf" | "xlsx" | "word"> = {
    "text/csv": "csv",
    "application/pdf": "pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-excel": "xlsx", // older Excel format
    "application/msword": "word", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "word", // .docx
  };

  const mapped = mimeMap[mimeType];
  if (!mapped) throw new Error(`Unsupported file type: ${mimeType}`);

  return mapped;
}

const get_client_file_by_uuid_and_name = async (
  client_uid: string,
  file_original_name: string
) => {
  const client = await Clients.findOne({ where: { client_uid: client_uid } });
  if (client === null) {
    return null;
  }

  const client_files = await ClientFiles.findOne({
    where: {
      file_owner: client.dataValues.client_id,
      file_original_name: file_original_name,
    },
  });

  if (client_files === null) {
    return null;
  }
  return client_files;
};

const create_client_file = async (client_file_details: ClientUploadedFile) => {
  const mapped_type = mapMimeTypeToFileType(client_file_details.file_type);
  const res = await (
    await ClientFiles.create({
      file_type: mapped_type,
      file_original_name: client_file_details.file_original_name,
      file_GCS_name: client_file_details.file_GCS_name,
      file_GCS_id: client_file_details.file_GCS_id,
      file_owner: client_file_details.file_owner,
      file_metric_contained: client_file_details.file_metric_contained,
    })
  ).save();

  return res.dataValues;
};

const get_client_files_by_uuid_with_pagination = async (
  limit: number,
  offset: number,
  client_uid: string
) => {
  const client = await Clients.findOne({ where: { client_uid: client_uid } });
  if (client === null) {
    return { client_files: null, total: null };
  }

  const { rows: client_files, count: total } =
    await ClientFiles.findAndCountAll({
      where: {
        file_owner: client.dataValues.client_id,
      },
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

  return { client_files, total };
};

const get_clients_files_by_uuid_with_pagination = async (
  limit: number,
  offset: number
) => {
  const { rows: client_files, count: total } =
    await ClientFiles.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Clients,
          as: "owner",
          attributes: ["client_id", "client_uid", "client_company_name"],
        },
      ],
    });

  return { client_files, total };
};

const get_clients_files_analytics = async (): Promise<FileAnalytsis> => {
  try {
    const counts = (await ClientFiles.findOne({
      attributes: [
        // total files
        [
          ClientFiles.sequelize!.fn(
            "COUNT",
            ClientFiles.sequelize!.col("file_id")
          ),
          "total_files",
        ],

        // financial files
        // THIS RETURNS A STRING
        // [
        //   ClientFiles.sequelize!.fn(
        //     "SUM",
        //     ClientFiles.sequelize!.literal(
        //       `CASE WHEN file_metric_contained LIKE '%Financial%' THEN 1 ELSE 0 END`
        //     )
        //   ),
        //   "financial_files",
        // ],
        // THIS RETURNS A NUMBER
        [
          ClientFiles.sequelize!.literal(
            `CAST(SUM(CASE WHEN file_metric_contained LIKE '%FINANCIAL%' THEN 1 ELSE 0 END) AS UNSIGNED)`
          ),
          "financial_files",
        ],

        // sales files
        [
          ClientFiles.sequelize!.literal(
            `CAST(SUM(CASE WHEN file_metric_contained LIKE '%SALES%' THEN 1 ELSE 0 END) AS UNSIGNED)`
          ),
          "sales_files",
        ],

        // operations files
        [
          ClientFiles.sequelize!.literal(
            `CAST(SUM(CASE WHEN file_metric_contained LIKE '%Operational%' THEN 1 ELSE 0 END) AS UNSIGNED)`
          ),
          "operations_files",
        ],
      ],
      raw: true,
    })) as unknown as FileAnalytsis;

    // console.log(counts);
    // console.log(counts[0]);

    const total_files = counts?.total_files ?? 0;
    const sales_files = counts?.sales_files ?? 0;
    const operations_files = counts?.operations_files ?? 0;
    const financial_files = counts?.financial_files ?? 0;

    // console.log(total_files);

    return {
      total_files,
      sales_files,
      operations_files,
      financial_files,
    };
  } catch (error) {
    console.log("Error fetching file analytics:", error);
    return {
      total_files: 0,
      sales_files: 0,
      operations_files: 0,
      financial_files: 0,
    };
  }
};

const get_client_files_by_uuid = async (client_uid: string) => {
  const client = await Clients.findOne({ where: { client_uid: client_uid } });
  if (client === null) {
    return null;
  }

  const client_files = await ClientFiles.findAll({
    where: {
      file_owner: client.dataValues.client_id,
    },
  });

  if (client_files === null) {
    return null;
  }
  // console.log(client_files);

  return client_files;
};

export {
  get_client_file_by_uuid_and_name,
  create_client_file,
  get_client_files_by_uuid_with_pagination,
  get_clients_files_analytics,
  get_clients_files_by_uuid_with_pagination,
  get_client_files_by_uuid,
};
