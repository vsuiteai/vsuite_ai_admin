export const useClientController = () => {
  const get_client = async (uid: string) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.get(`/api/clients/${uid}`);
      // console.log(response);

      const client = (response.data?.data?.client as ClientDetail) ?? null;
      return { client };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_client_submissions = async (uid: string) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;
      const response = await axios.get(`/api/clients/${uid}/form_submission`);

      console.log(response);

      const submissions = (response.data?.data?.submissions as any) ?? [];
      return { submissions };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_client_files = async (uid: string) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.get(`/api/clients/${uid}/assets`);

      // console.log(response);

      const files = (response.data?.data?.client_files as any) ?? [];
      const pagination = (response.data?.data?.pagination as any) ?? null;
      return { files, pagination };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_clients_files = async (
    page: number = 1,
    search_term: string | null = null,
    filter_metric: string | null = null,
    filter_date_from: string | null = null,
    filter_date_to: string | null = null
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/clients/assets?page=${page}`;

      if (search_term && search_term != "") {
        url = `${url}&search_term=${search_term}`;
      }

      if (filter_metric !== null) {
        url = `${url}&filter_metric=${filter_metric}`;
      }

      if (filter_date_from !== null) {
        url = `${url}&filter_date_from=${filter_date_from}`;
      }

      if (filter_date_to !== null) {
        url = `${url}&filter_date_to=${filter_date_to}`;
      }

      const response = await axios.get(url);

      // console.log(response);

      const files = (response.data?.data?.client_files as any) ?? [];
      const pagination = (response.data?.data?.pagination as any) ?? null;
      return { files, pagination };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_clients_files_analytics = async (
    filter_date_from: string | null = null,
    filter_date_to: string | null = null
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/clients/assets_analytics?`;

      if (filter_date_from !== null) {
        url = `${url}filter_date_from=${filter_date_from}`;
      }

      if (filter_date_to !== null) {
        url = `${url}&filter_date_to=${filter_date_to}`;
      }

      const response = await axios.get(url);

      // console.log(response);

      const file_analytics = (response.data?.data as FileAnalytsis) ?? [];
      return file_analytics;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_clients = async (
    page: number = 1,
    search_term: string | null = null,
    filter_status: boolean | null = null,
    filter_consultant: string[] | null = null,
    filter_date_from: string | null = null,
    filter_date_to: string | null = null
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/clients?page=${page}`;

      if (search_term && search_term != "") {
        url = `${url}&search_term=${search_term}`;
      }

      if (filter_status !== null) {
        url = `${url}&filter_status=${filter_status}`;
      }

      if (filter_consultant !== null) {
        url = `${url}&filter_consultant=${filter_consultant}`;
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
      const clients = (response.data?.data?.clients as ClientDetail[]) ?? [];
      return { pagination, clients };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const attach_consultants = async (
    client_id: string,
    consultant_ids: string[]
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const url = `/api/clients/${client_id}/attach-consultants`;

      const response = await axios.post(url, {
        client_id,
        consultant_ids,
      });

      return response.data; // { error, data, message }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    get_clients,
    get_client_submissions,
    get_client_files,
    get_clients_files,
    get_clients_files_analytics,
    get_client,
    attach_consultants,
  };
};
