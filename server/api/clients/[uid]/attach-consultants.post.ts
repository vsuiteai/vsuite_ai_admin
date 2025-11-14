import { attach_consultants_to_client } from "~/server/controller/clientCont";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const client_id = body.client_id;
    const consultant_ids = body.consultant_ids ?? [];

    if (!client_id || consultant_ids.length === 0) {
      throw new Error("Client ID and Consultant IDs are required");
    }

    const res = await attach_consultants_to_client(client_id, consultant_ids);

    if (!res.success) {
      throw new Error(res.error);
    }

    return {
      error: false,
      data: res,
      message: "Consultants attached successfully",
    };
  } catch (err) {
    console.error(err);

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
