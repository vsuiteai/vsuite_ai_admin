import { get_consultants } from "~/server/controller/consultantCont";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const search_term = query.search_term as string;

    const filter_status = query.filter_status as string;
    const filter_consultant = query.filter_consultant as number;
    const filter_date_from = query.filter_date_from as string;
    const filter_date_to = query.filter_date_to as string;

    const offset = (page - 1) * limit;

    const { consultants, total } = await get_consultants({
      limit,
      offset,
      search_term,
      filter_status,
      filter_consultant,
      filter_date_from,
      filter_date_to,
    });

    const totalPages = Math.ceil(total / limit);
    const from = offset + 1;
    const to = Math.min(offset + limit, total);

    return {
      error: false,
      data: {
        consultants,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalItems: total,
          totalPages,
          showing: `Showing ${from}-${to} of ${total}`,
          hasNext: page < totalPages,
          hasPrev: page > 1,
          pages: generatePageNumbers(page, totalPages),
        },
      },
      message: "consultants fetched successfully",
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
