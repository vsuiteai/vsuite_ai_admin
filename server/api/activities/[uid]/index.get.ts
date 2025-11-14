import { get_client_by_uuid } from "~/server/controller/clientCont";

export default defineEventHandler(async (event) => {
  try {
    const uid = getRouterParam(event, "uid") ?? false;

    if (!uid) throw new Error("client uid not provided");

    const client = await get_client_by_uuid(uid);

    return {
      error: false,
      data: {
        client,
      },
      message: "Client fetched successfully",
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
