import { get_activities } from "~/server/controller/activitiesCont";

export default defineEventHandler(async (event) => {
  try {
    const activities = await get_activities();

    return {
      error: false,
      data: activities,

      message: "activities fetched successfully",
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
