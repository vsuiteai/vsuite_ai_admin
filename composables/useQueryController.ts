export const useQueryController = () => {
  const get_query = async (query_id: string) => {
    if (!process.client) return;
    try {
      const axios = (await import("axios")).default;

      const response = await axios.get(`/api/query/${query_id}`);
      console.log(response);

      const query = response.data?.data?.query ?? null;
      return { query };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_queries = async (uid: string) => {
    if (!process.client) return;
    try {
      const axios = (await import("axios")).default;
      const response = await axios.get(`/api/clients/${uid}/queries`);

      console.log(response);

      const queries = (response.data?.data?.queries as any) ?? [];
      return { queries };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const run_strategy = async (
    uid: string,
    client_files: ClientUploadedFile[],
    selected_ai_agent: ai_agentType
  ) => {
    if (!process.client) return;
    try {
      const axios = (await import("axios")).default;
      const res = await axios.post(`/api/clients/${uid}/run_strategy`, {
        client_files,
        ai_agent: selected_ai_agent,
      });

      // console.log(res);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    get_query,
    get_queries,
    run_strategy,
  };
};
