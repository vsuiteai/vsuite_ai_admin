import { defineStore } from "pinia";

export const useOnboardClientFormSectionNineStore = defineStore(
  "OnboardClientFormSectionNineStore",
  () => {
    const step_nine_do_you_currently_have_a_documented_marketing_plan =
      reactive({
        question_number: 1,
        question_label:
          "Do you currently have a documented marketing plan that outlines your goals and objectives?",
        question_answer: "",
        question_options: [
          "No, I do not have a marketing plan",
          "I have an informal plan but it is not documented",
          "Yes, but it is outdated",
          "Yes, and it is partially implemented",
          "Yes, and it is fully implemented",
        ],

        mapped_question_options: {
          e: "No, I do not have a marketing plan",
          d: "I have an informal plan but it is not documented",
          c: "Yes, but it is outdated",
          b: "Yes, and it is partially implemented",
          a: "Yes, and it is fully implemented",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts =
      reactive({
        question_number: 2,
        question_label:
          "How often do you evaluate the impact of your marketing efforts on key business outcomes (e.g., revenue growth, customer acquisition)?",
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

    const step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need =
      reactive({
        question_number: 3,
        question_label:
          "How confident are you in understanding which marketing channels (e.g., social media, email, SEO) drive the most significant results for your business?",
        question_answer: "",
        question_options: [
          "Not confident",
          "Slightly confident",
          "Neutral",
          "Confident",
          "Exceptionally confident",
        ],
        mapped_question_options: {
          e: "Not confident",
          d: "Slightly confident",
          c: "Neutral",
          b: "Confident",
          a: "Exceptionally confident",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_nine_how_effectively_do_you_measure_the_ROI = reactive({
      question_number: 4,
      question_label:
        "How effectively do you measure the return on investment (ROI) of your marketing activities?­",
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

    const get_step_nine_do_you_currently_have_a_documented_marketing_plan =
      computed(() => {
        return step_nine_do_you_currently_have_a_documented_marketing_plan.question_answer;
      });

    const get_step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts =
      computed(() => {
        return step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts.question_answer;
      });

    const get_step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need =
      computed(() => {
        return step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need.question_answer;
      });

    const get_step_nine_how_effectively_do_you_measure_the_ROI = computed(
      () => {
        return step_nine_how_effectively_do_you_measure_the_ROI.question_answer;
      }
    );

    const get_is_step_valid = computed(() => {
      return (
        step_nine_do_you_currently_have_a_documented_marketing_plan.question_answer !==
          "" &&
        step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts.question_answer !==
          "" &&
        step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need.question_answer !==
          "" &&
        step_nine_how_effectively_do_you_measure_the_ROI.question_answer !== ""
      );
    });

    const update_step_nine_do_you_currently_have_a_documented_marketing_plan = (
      answer: string
    ) => {
      if (answer === null) return;
      step_nine_do_you_currently_have_a_documented_marketing_plan.question_answer =
        answer;
    };

    const update_step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts =
      (answer: string) => {
        if (answer === null) return;
        step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts.question_answer =
          answer;
      };

    const update_step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need =
      (answer: string) => {
        if (answer === null) return;
        step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need.question_answer =
          answer;
      };

    const update_step_nine_how_effectively_do_you_measure_the_ROI = (
      answer: string
    ) => {
      if (answer === null) return;
      step_nine_how_effectively_do_you_measure_the_ROI.question_answer = answer;
    };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_nine_do_you_currently_have_a_documented_marketing_plan,
        step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts,
        step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need,
        step_nine_how_effectively_do_you_measure_the_ROI,
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
      step_nine_do_you_currently_have_a_documented_marketing_plan,
      step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts,
      step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need,
      step_nine_how_effectively_do_you_measure_the_ROI,

      // Getters
      get_step_nine_do_you_currently_have_a_documented_marketing_plan,
      get_step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts,
      get_step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need,
      get_step_nine_how_effectively_do_you_measure_the_ROI,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_nine_do_you_currently_have_a_documented_marketing_plan,
      update_step_nine_how_often_do_you_evaluate_the_impact_of_your_marketing_efforts,
      update_step_nine_how_confident_are_you_in_understanding_which_marketing_channels_you_need,
      update_step_nine_how_effectively_do_you_measure_the_ROI,
    };
  }
);
