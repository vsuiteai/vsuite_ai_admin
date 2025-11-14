import { defineStore } from "pinia";

export const useOnboardClientFormSectionElevenStore = defineStore(
  "OnboardClientFormSectionElevenStore",
  () => {
    const step_eleven_have_you_used_outside_capital = reactive({
      question_number: 1,
      question_label:
        "Have you used outside capital (e.g., loans, investors, grants) to support your business growth?",
      question_answer: "",
      question_options: [
        "No, I have never used outside capital",
        "Yes, but only in the early stages of the business",
        "Yes, occasionally for specific projects",
        "Yes, frequently to support ongoing operations and growth",
        "Yes, as a core part of my business strategy",
      ],

      mapped_question_options: {
        e: "No, I have never used outside capital",
        d: "Yes, but only in the early stages of the business",
        c: "Yes, occasionally for specific projects",
        b: "Yes, frequently to support ongoing operations and growth",
        a: "Yes, as a core part of my business strategy",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const step_eleven_how_confident_are_you_in_understanding_outside_funding =
      reactive({
        question_number: 2,
        question_label:
          "How confident are you in understanding the terms and implications of outside funding (e.g., interest rates, equity dilution)?",
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

    const step_eleven_how_effectively_do_you_use_outside_capital = reactive({
      question_number: 3,
      question_label:
        "How effectively do you use outside capital to achieve specific business outcomes (e.g., increasing revenue, expanding market share)?",
      question_answer: "",
      question_options: [
        "Not effectively",
        "Poorly",
        "Adequately",
        "Well",
        "Exceptionally well",
      ],

      mapped_question_options: {
        e: "Not effectively",
        d: "Poorly",
        c: "Adequately",
        b: "Well",
        a: "Exceptionally well",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital =
      reactive({
        question_number: 4,
        question_label:
          "How frequently do you evaluate the return on investment (ROI) of outside capital in your business?",
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

    const step_eleven_how_prepared_are_you_to_present_your_business = reactive({
      question_number: 5,
      question_label:
        "How prepared are you to present your business to potential lenders or investors to secure additional funding?",
      question_answer: "",
      question_options: [
        "Not prepared at all",
        "Slightly prepared",
        "Neutral",
        "Well prepared",
        "Very well prepared",
      ],

      mapped_question_options: {
        e: "Not prepared at all",
        d: "Slightly prepared",
        c: "Neutral",
        b: "Well prepared",
        a: "Very well prepared",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const get_step_eleven_have_you_used_outside_capital = computed(() => {
      return step_eleven_have_you_used_outside_capital.question_answer;
    });

    const get_step_eleven_how_confident_are_you_in_understanding_outside_funding =
      computed(() => {
        return step_eleven_how_confident_are_you_in_understanding_outside_funding.question_answer;
      });

    const get_step_eleven_how_effectively_do_you_use_outside_capital = computed(
      () => {
        return step_eleven_how_effectively_do_you_use_outside_capital.question_answer;
      }
    );

    const get_step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital =
      computed(() => {
        return step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital.question_answer;
      });

    const get_step_eleven_how_prepared_are_you_to_present_your_business =
      computed(() => {
        return step_eleven_how_prepared_are_you_to_present_your_business.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_eleven_have_you_used_outside_capital.question_answer !== "" &&
        step_eleven_how_confident_are_you_in_understanding_outside_funding.question_answer !==
          "" &&
        step_eleven_how_effectively_do_you_use_outside_capital.question_answer !==
          "" &&
        step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital.question_answer !==
          "" &&
        step_eleven_how_prepared_are_you_to_present_your_business.question_answer !==
          ""
      );
    });

    const update_step_eleven_have_you_used_outside_capital = (
      answer: string
    ) => {
      if (answer === null) return;
      step_eleven_have_you_used_outside_capital.question_answer = answer;
    };

    const update_step_eleven_how_confident_are_you_in_understanding_outside_funding =
      (answer: string) => {
        if (answer === null) return;
        step_eleven_how_confident_are_you_in_understanding_outside_funding.question_answer =
          answer;
      };

    const update_step_eleven_how_effectively_do_you_use_outside_capital = (
      answer: string
    ) => {
      if (answer === null) return;
      step_eleven_how_effectively_do_you_use_outside_capital.question_answer =
        answer;
    };

    const update_step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital =
      (answer: string) => {
        if (answer === null) return;
        step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital.question_answer =
          answer;
      };

    const update_step_eleven_how_prepared_are_you_to_present_your_business = (
      answer: string
    ) => {
      if (answer === null) return;
      step_eleven_how_prepared_are_you_to_present_your_business.question_answer =
        answer;
    };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_eleven_have_you_used_outside_capital,
        step_eleven_how_confident_are_you_in_understanding_outside_funding,
        step_eleven_how_effectively_do_you_use_outside_capital,
        step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital,
        step_eleven_how_prepared_are_you_to_present_your_business,
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
      step_eleven_have_you_used_outside_capital,
      step_eleven_how_confident_are_you_in_understanding_outside_funding,
      step_eleven_how_effectively_do_you_use_outside_capital,
      step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital,
      step_eleven_how_prepared_are_you_to_present_your_business,

      // Getters
      get_step_eleven_have_you_used_outside_capital,
      get_step_eleven_how_confident_are_you_in_understanding_outside_funding,
      get_step_eleven_how_effectively_do_you_use_outside_capital,
      get_step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital,
      get_step_eleven_how_prepared_are_you_to_present_your_business,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_eleven_have_you_used_outside_capital,
      update_step_eleven_how_confident_are_you_in_understanding_outside_funding,
      update_step_eleven_how_effectively_do_you_use_outside_capital,
      update_step_eleven_how_frequently_do_you_evaluate_the_ROI_of_outside_capital,
      update_step_eleven_how_prepared_are_you_to_present_your_business,
    };
  }
);
