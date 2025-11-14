import { defineStore } from "pinia";

export const useAOFSectionFiveStore = defineStore("AOFSectionFiveStore", () => {
  const step_five_NAICSCode = reactive({
    question_number: 1,
    question_label: "NAICS Code",
    question_answer: "",
  });

  const get_step_five_NAICSCode = computed(() => {
    return step_five_NAICSCode.question_answer;
  });

  const get_is_step_valid = computed(() => {
    return step_five_NAICSCode.question_answer !== "";
  });

  const update_step_five_NAICSCode = (answer: string) => {
    if (answer === null) return;
    step_five_NAICSCode.question_answer = answer;
  };

  const get_answers_for_submission = computed(() => {
    return [
      {
        question: step_five_NAICSCode.question_label,
        answer: step_five_NAICSCode.question_answer,
      },
    ];
  });

  return {
    step_five_NAICSCode,

    // Getters
    get_step_five_NAICSCode,
    get_is_step_valid,
    get_answers_for_submission,

    // Mutations
    update_step_five_NAICSCode,
  };
});
