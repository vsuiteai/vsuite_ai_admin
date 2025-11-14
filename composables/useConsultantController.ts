export const useConsultantController = () => {
  const get_consultants = async (
    page: number = 1,
    search_term: string | null = null,
    filter_status: boolean | null = null,
    filter_date_from: string | null = null,
    filter_date_to: string | null = null
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/consultants?page=${page}`;

      if (search_term && search_term != "") {
        url = `${url}&search_term=${search_term}`;
      }

      if (filter_status !== null) {
        url = `${url}&filter_status=${filter_status}`;
      }

      if (filter_date_from !== null) {
        url = `${url}&filter_date_from=${filter_date_from}`;
      }

      if (filter_date_to !== null) {
        url = `${url}&filter_date_to=${filter_date_to}`;
      }

      const response = await axios.get(url);

      // console.log(response);

      const pagination =
        (response.data?.data?.pagination as Pagination) ?? null;
      const consultants =
        (response.data?.data?.consultants as ConsultantDetail[]) ?? [];
      return { pagination, consultants };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const create_consultant = async (consultant_details: ConsultantDetail) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.post("/api/consultants", consultant_details);

      if (response.data.error) {
        const message = response.data?.message || "An unknown error occurred";
        throw new Error(message);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }

    // console.log(response);
  };

  const update_consultant = async (
    consultant_id: string,
    consultant_details: ConsultantDetail
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.put(
        `/api/consultants/${consultant_id}`,
        consultant_details
      );

      if (response.data.error) {
        const message = response.data?.message || "An unknown error occurred";
        throw new Error(message);
      }

      const consultant =
        (response.data?.data?.updated_consultant as ConsultantDetail) ?? null;

      return { consultant };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }

    // console.log(response);
  };

  const get_consultant = async (uid: string) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.get(`/api/consultants/${uid}`);
      // console.log(response);

      const consultant =
        (response.data?.data?.consultant as ConsultantDetail) ?? null;
      return { consultant };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    get_consultants,
    update_consultant,
    create_consultant,
    get_consultant,
  };
};
