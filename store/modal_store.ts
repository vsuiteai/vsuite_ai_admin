import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", () => {
  const currentModal = ref<string | null>(null);

  const getCurrentModal = computed(() => {
    return currentModal.value;
  });

  const closeActiveModal = () => {
    currentModal.value = null;
  };

  const setActiveModal = (modal: string) => {
    currentModal.value = modal;
  };

  return {
    getCurrentModal,
    closeActiveModal,
    setActiveModal,
  };
});
