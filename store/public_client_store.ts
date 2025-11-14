import { defineStore } from "pinia";

export const usePublicClientStore = defineStore("publicClientStore", () => {
  const client = ref<ClientDetail | null>(null);

  const getClient = computed(() => {
    return client.value;
  });

  const setClient = (data: ClientDetail) => {
    client.value = data;
  };

  return {
    getClient,
    setClient,
  };
});
