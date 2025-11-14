import { parent_routes } from "~/config/parent_routes";

export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  if (!loggedIn.value || !user.value) {
    return navigateTo(parent_routes.web_app.sign_in.path);
  }
});
