import { get_consultant_by_id } from "~/server/controller/consultantCont";

export default defineEventHandler(async (event) => {
  try {
    const uid = getRouterParam(event, "uid") ?? false;

    if (!uid) throw new Error("client uid not provided");

    const consultant = await get_consultant_by_id(uid);

    return {
      error: false,
      data: {
        consultant,
      },
      message: "Consultant fetched successfully",
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
