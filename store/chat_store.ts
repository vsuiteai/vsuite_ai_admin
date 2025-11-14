import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const current_client = ref<ClientDetail | null>(null);
  const selected_queries = ref<string[]>([]);

  const get_current_client = computed(() => {
    return current_client.value;
  });

  const get_selected_queries = computed(() => {
    return selected_queries.value;
  });

  const setcurrent_client = (client: ClientDetail) => {
    current_client.value = client;
  };

  const set_selected_queries = (queries: string[]) => {
    selected_queries.value = queries;
  };

  const reset_data = () => {
    current_client.value = null;
    selected_queries.value = [];
  };

  return {
    get_current_client,
    get_selected_queries,
    setcurrent_client,
    set_selected_queries,
    reset_data,
  };
});
