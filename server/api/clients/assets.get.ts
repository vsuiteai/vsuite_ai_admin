import { get_clients_files_by_uuid_with_pagination } from "~/server/controller/clientFilesCont";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const search_term = query.search_term as string;

    const filter_metric = query.filter_metric as string;
    const filter_date_from = query.filter_date_from as string;
    const filter_date_to = query.filter_date_to as string;

    const offset = (page - 1) * limit;

    const { client_files, total } =
      await get_clients_files_by_uuid_with_pagination(limit, offset);

    if (client_files === null) {
      throw new Error("no file");
    }

    const totalPages = Math.ceil(total / limit);
    const from = offset + 1;
    const to = Math.min(offset + limit, total);

    return {
      error: false,
      data: {
        client_files,
        pagination: {
          currentPage: page,
          perPage: limit,
          totalItems: total,
          totalPages,
          showing: `${from}-${to}`,
          hasNext: page < totalPages,
          hasPrev: page > 1,
          pages: generatePageNumbers(page, totalPages),
        },
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
