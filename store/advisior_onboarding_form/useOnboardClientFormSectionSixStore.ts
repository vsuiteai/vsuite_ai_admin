import { defineStore } from "pinia";

export const useAOFSectionSixStore = defineStore("AOFSectionSixStore", () => {
  const step_four_any_legal_action_pending = reactive({
    question_number: 1,
    question_label: "Any legal action pending against your firm?",
    question_answer: "",
    question_options: ["Yes", "No"],
  });

  const step_six_are_there_any_confidentiality_security_agreements = reactive({
    question_number: 2,
    question_label:
      "Are there any confidentiality or security agreements we need to be aware of?",
    question_answer: "",
    question_options: ["Yes", "No"],
  });

  const get_step_six_are_there_any_confidentiality_security_agreements =
    computed(() => {
      return step_six_are_there_any_confidentiality_security_agreements.question_answer;
    });

  const get_step_four_any_legal_action_pending = computed(() => {
    return step_four_any_legal_action_pending.question_answer;
  });

  const get_is_step_valid = computed(() => {
    return (
      step_six_are_there_any_confidentiality_security_agreements.question_answer !==
        "" && step_four_any_legal_action_pending.question_answer !== ""
    );
  });

  const update_step_six_are_there_any_confidentiality_security_agreements = (
    answer: string
  ) => {
    if (answer === null) return;
    step_six_are_there_any_confidentiality_security_agreements.question_answer =
      answer;
  };

  const update_step_four_any_legal_action_pending = (answer: string) => {
    if (answer === null) return;
    step_four_any_legal_action_pending.question_answer = answer;
  };

  const get_answers_for_submission = computed(() => {
    return [
      {
        question:
          step_six_are_there_any_confidentiality_security_agreements.question_label,
        answer:
          step_six_are_there_any_confidentiality_security_agreements.question_answer,
      },

      {
        question: step_four_any_legal_action_pending.question_label,
        answer: step_four_any_legal_action_pending.question_answer,
      },
    ];
  });

  return {
    step_six_are_there_any_confidentiality_security_agreements,
    step_four_any_legal_action_pending,

    // Getters
    get_step_six_are_there_any_confidentiality_security_agreements,
    get_is_step_valid,
    get_step_four_any_legal_action_pending,
    get_answers_for_submission,

    // Mutations
    update_step_six_are_there_any_confidentiality_security_agreements,
    update_step_four_any_legal_action_pending,
  };
});
