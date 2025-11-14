import { get_queries_by_client_uid } from "~/server/controller/queryCont";

export default defineEventHandler(async (event) => {
  try {
    const client_uid = getRouterParam(event, "uid") ?? false;
    if (!client_uid) throw new Error("client uid not provided");

    const queries = await get_queries_by_client_uid(client_uid);

    return {
      error: false,
      data: {
        queries,
      },
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
