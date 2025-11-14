import { get_submissions } from "~/server/controller/formCont";

export default defineEventHandler(async (event) => {
  try {
    const client_uid = getRouterParam(event, "uid") ?? false;
    const form_type = (getRouterParam(event, "form_type") ?? "") as string;

    if (!client_uid) throw new Error("client uid not provided");

    const submissions = await get_submissions({ client_uid });

    return {
      error: false,
      data: {
        submissions,
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
