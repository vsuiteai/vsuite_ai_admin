import { defineStore } from "pinia";

export const useOnboardClientFormSectionSevenStore = defineStore(
  "OnboardClientFormSectionSevenStore",
  () => {
    const step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems =
      reactive({
        question_number: 1,
        question_label:
          "How frequently do you identify the root cause of business problems before implementing solutions?",
        question_answer: "",
        question_options: [
          "Never",
          "Rarely",
          "Occasionally",
          "Often",
          "Always",
        ],
        mapped_question_options: {
          e: "Never",
          d: "Rarely",
          c: "Occasionally",
          b: "Often",
          a: "Always",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_seven_how_confident_are_you_in_handling_unexpected_operational_issues =
      reactive({
        question_number: 2,
        question_label:
          "How confident are you in handling unexpected operational issues?",
        question_answer: "",
        question_options: [
          "Not confident",
          "Slightly confident",
          "Neutral",
          "Confident",
          "Very confident",
        ],
        mapped_question_options: {
          e: "Not confident",
          d: "Slightly confident",
          c: "Neutral",
          b: "Confident",
          a: "Very confident",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_seven_how_often_do_you_seek_input_when_solving_complex_problems =
      reactive({
        question_number: 3,
        question_label:
          "How often do you seek input from your team or stakeholders when solving complex problems?",
        question_answer: "",
        question_options: [
          "Never",
          "Rarely",
          "Occasionally",
          "Often",
          "Always",
        ],
        mapped_question_options: {
          e: "Never",
          d: "Rarely",
          c: "Occasionally",
          b: "Often",
          a: "Always",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges =
      reactive({
        question_number: 4,
        question_label:
          "How quickly do you typically make decisions when faced with multiple business challenges?",
        question_answer: "",
        question_options: [
          "Very slowly",
          "Slowly",
          "Moderately",
          "Quickly",
          "Very quickly",
        ],
        mapped_question_options: {
          e: "Very slowly",
          d: "Slowly",
          c: "Moderately",
          b: "Quickly",
          a: "Very quickly",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn =
      reactive({
        question_number: 5,
        question_label:
          "How often do you evaluate the success of your solutions after implementation?",
        question_answer: "",
        question_options: [
          "Never",
          "Rarely",
          "Occasionally",
          "Often",
          "Always",
        ],
        mapped_question_options: {
          e: "Never",
          d: "Rarely",
          c: "Occasionally",
          b: "Often",
          a: "Always",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const get_step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems =
      computed(() => {
        return step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems.question_answer;
      });

    const get_step_seven_how_confident_are_you_in_handling_unexpected_operational_issues =
      computed(() => {
        return step_seven_how_confident_are_you_in_handling_unexpected_operational_issues.question_answer;
      });

    const get_step_seven_how_often_do_you_seek_input_when_solving_complex_problems =
      computed(() => {
        return step_seven_how_often_do_you_seek_input_when_solving_complex_problems.question_answer;
      });

    const get_step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges =
      computed(() => {
        return step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges.question_answer;
      });

    const get_step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn =
      computed(() => {
        return step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems.question_answer !==
          "" &&
        step_seven_how_confident_are_you_in_handling_unexpected_operational_issues.question_answer !==
          "" &&
        step_seven_how_often_do_you_seek_input_when_solving_complex_problems.question_answer !==
          "" &&
        step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges.question_answer !==
          "" &&
        step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn.question_answer !==
          ""
      );
    });

    const update_step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems =
      (answer: string) => {
        if (answer === null) return;
        step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems.question_answer =
          answer;
      };

    const update_step_seven_how_confident_are_you_in_handling_unexpected_operational_issues =
      (answer: string) => {
        if (answer === null) return;
        step_seven_how_confident_are_you_in_handling_unexpected_operational_issues.question_answer =
          answer;
      };

    const update_step_seven_how_often_do_you_seek_input_when_solving_complex_problems =
      (answer: string) => {
        if (answer === null) return;
        step_seven_how_often_do_you_seek_input_when_solving_complex_problems.question_answer =
          answer;
      };

    const update_step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges =
      (answer: string) => {
        if (answer === null) return;
        step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges.question_answer =
          answer;
      };

    const update_step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn =
      (answer: string) => {
        if (answer === null) return;
        step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn.question_answer =
          answer;
      };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems,
        step_seven_how_confident_are_you_in_handling_unexpected_operational_issues,
        step_seven_how_often_do_you_seek_input_when_solving_complex_problems,
        step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges,
        step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn,
      ];

      const processed_output = [];

      for (let index = 0; index < questions.length; index++) {
        const element = questions[index];

        processed_output.push({
          question: element.question_label,
          options: element.mapped_question_options,
          answer: element.question_answer,
          for_ai_multiple_choice_analysis:
            element.for_ai_multiple_choice_analysis,
        });
      }

      return processed_output;
    });

    return {
      step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems,
      step_seven_how_confident_are_you_in_handling_unexpected_operational_issues,
      step_seven_how_often_do_you_seek_input_when_solving_complex_problems,
      step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges,
      step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn,

      // Getters
      get_step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems,
      get_step_seven_how_confident_are_you_in_handling_unexpected_operational_issues,
      get_step_seven_how_often_do_you_seek_input_when_solving_complex_problems,
      get_step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges,
      get_step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_seven_how_frequently_do_you_identify_the_root_cause_of_biz_problems,
      update_step_seven_how_confident_are_you_in_handling_unexpected_operational_issues,
      update_step_seven_how_often_do_you_seek_input_when_solving_complex_problems,
      update_step_seven_how_quickly_do_you_make_decisions_when_faced_with_business_challenges,
      update_step_seven_how_often_do_you_evaluate_the_success_of_your_solutn_after_implementn,
    };
  }
);
