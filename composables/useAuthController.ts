// import axios from "axios";

export const useAuthController = () => {
  const login_admin = async (email: string, password: string) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;

      const response = await axios.post("/api/auth/login", {
        admin_username: email,
        admin_password: password,
      });

      return response.data;
    } catch (error: any) {
      // Axios wraps error responses differently
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  const create_client = async (
    client_details: ClientDetail,
    current_domain: string
  ) => {
    if (!process.client) return;

    try {
      const axios = (await import("axios")).default;
      const response = await axios.post("/api/clients", {
        ...client_details,
        current_domain: current_domain,
      });

      // console.log(response);
    } catch (error: any) {
      // Axios wraps error responses differently
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    login_admin,
    create_client,
  };
};
