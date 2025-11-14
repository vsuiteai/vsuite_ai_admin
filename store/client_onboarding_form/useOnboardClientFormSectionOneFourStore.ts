import { defineStore } from "pinia";

export const useOnboardClientFormSectionOneFourStore = defineStore(
  "OnboardClientFormSectionOneFourStore",
  () => {
    const step_one_four_business_reflection = reactive({
      question_number: 1,
      question_label:
        "Looking back over the last 3 years, share no more than two major business decisions you would do differently, big or small, and what you learned (or wish you'd learned) from that experience.",
      question_answer: "",
      for_ai_multiple_choice_analysis: true,
    });

    const step_one_four_business_challenge_faced_today = reactive({
      question_number: 2,
      question_label:
        "Describe in your own words no more than three of the greatest challenges your business faces today. What have you already tried, and why do you believe it's still unresolved?",
      question_answer: "",
      for_ai_multiple_choice_analysis: true,
    });

    const step_one_four_possible_new_biz_ventures = reactive({
      question_number: 3,
      question_label:
        "Imagine your business in 24 months at its very best. What new products, markets, or revenue streams does it have, and what's stopping you from going after them today?",
      question_answer: "",
      for_ai_multiple_choice_analysis: true,
    });

    const get_step_one_four_business_reflection = computed(() => {
      return step_one_four_business_reflection.question_answer;
    });

    const get_step_one_four_business_challenge_faced_today = computed(() => {
      return step_one_four_business_challenge_faced_today.question_answer;
    });

    const get_step_one_four_possible_new_biz_ventures = computed(() => {
      return step_one_four_possible_new_biz_ventures.question_answer;
    });

    const get_is_step_valid = computed(() => {
      return (
        step_one_four_business_reflection.question_answer !== "" &&
        step_one_four_business_challenge_faced_today.question_answer !== "" &&
        step_one_four_possible_new_biz_ventures.question_answer !== ""
      );
    });

    const update_step_one_four_business_reflection = (answer: string) => {
      if (answer === null) return;
      step_one_four_business_reflection.question_answer = answer;
    };

    const update_step_one_four_business_challenge_faced_today = (
      answer: string
    ) => {
      if (answer === null) return;
      step_one_four_business_challenge_faced_today.question_answer = answer;
    };

    const update_step_one_four_possible_new_biz_ventures = (answer: string) => {
      if (answer === null) return;
      step_one_four_possible_new_biz_ventures.question_answer = answer;
    };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_one_four_business_reflection,
        step_one_four_business_challenge_faced_today,
        step_one_four_possible_new_biz_ventures,
      ];

      const processed_output = [];

      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];

        processed_output.push({
          question: element.question_label,
          answer: element.question_answer,
          for_ai_multiple_choice_analysis:
            element.for_ai_multiple_choice_analysis,
        });
      }

      return processed_output;
    });

    return {
      step_one_four_business_reflection,
      step_one_four_business_challenge_faced_today,
      step_one_four_possible_new_biz_ventures,

      // Getters
      get_step_one_four_business_reflection,
      get_step_one_four_business_challenge_faced_today,
      get_step_one_four_possible_new_biz_ventures,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_one_four_business_reflection,
      update_step_one_four_business_challenge_faced_today,
      update_step_one_four_possible_new_biz_ventures,
    };
  }
);
