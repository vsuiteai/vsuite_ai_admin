import { parent_routes } from "~/config/parent_routes";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  if (!user.value) {
    return navigateTo(parent_routes.web_app.sign_in.path);
  }

  if (to.path.startsWith('/consultant') && user.value.category === 'consultant') {
    return navigateTo(parent_routes.web_app.dashboard.path);  
  }
});
