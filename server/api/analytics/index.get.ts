import { get_client_analytics } from "~/server/controller/clientCont";
import { get_consultant_analytics } from "~/server/controller/consultantCont";
import { get_all_queries_count } from "~/server/controller/queryCont";

export default defineEventHandler(async (event) => {
  try {
    const { total_clients, clients_by_industry } = await get_client_analytics();
    const { total_consultants } = await get_consultant_analytics();
    const count = await get_all_queries_count();

    return {
      error: false,
      data: {
        total_clients,
        clients_by_industry,
        total_consultants,
        ai_query_count: count,
      },
      message: "analytics fetched successfully",
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
