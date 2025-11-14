type ClientAnalyticsData = {
  total_clients: number;
  clients_by_industry: {
    label: string | null;
    count: number;
  }[];
  total_consultants: number;
  ai_query_count: number;
};

export const useAnalyticsController = () => {
  const get_dashboard_startup_analytics = async () => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/analytics`;

      const response = await axios.get(url);

      // console.log(response);

      const data = (response.data?.data as ClientAnalyticsData) ?? null;

      return { data };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const get_prompt_stats = async () => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      let url = `/api/analytics/prompt-stats`;

      const response = await axios.get(url);

      // console.log(response);

      const data = (response.data.data as prompt_stats[]) ?? null;

      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    get_dashboard_startup_analytics,
    get_prompt_stats,
  };
};
