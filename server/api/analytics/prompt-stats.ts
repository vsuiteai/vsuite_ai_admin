import { getPromptStats } from "~/server/controller/promptStatCont";

export default defineEventHandler(async (event) => {
  try {
    const promptStatCont = await getPromptStats();

    console.log(promptStatCont);

    return {
      error: false,
      data: promptStatCont,
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

function generatePageNumbers(
  current: number,
  total: number
): (number | string)[] {
  const range = [];
  const delta = 2; // Show current +/- 2 pages
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}
