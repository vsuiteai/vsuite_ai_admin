import type { User } from "#auth-utils";
import { defineStore } from "pinia";

export const useCurrentAdminStore = defineStore("currentAdminStore", () => {
  const current_admin = ref<User | null>(null);

  const getCurrentAdmin = computed(() => {
    return current_admin.value;
  });

  const setCurrentAdmin = (data: User) => {
    current_admin.value = data;
  };

  return {
    getCurrentAdmin,
    setCurrentAdmin,
  };
});
