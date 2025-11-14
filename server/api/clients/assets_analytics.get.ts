import { get_clients_files_analytics } from "~/server/controller/clientFilesCont";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const filter_date_from = query.filter_date_from as string;
    const filter_date_to = query.filter_date_to as string;

    const file_analytics = await get_clients_files_analytics();

    return {
      error: false,
      data: file_analytics,
      message: "Clients fetched successfully",
    };
  } catch (err) {
    console.log(err instanceof Error ? err.message : String(err));
    return {
      error: true,
      data: null,
      message: err instanceof Error ? err.message : String(err),
    };
  }
});
