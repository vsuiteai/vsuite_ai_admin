import { defineStore } from "pinia";

export const useOnboardClientFormSectionOneThreeStore = defineStore(
  "OnboardClientFormSectionOneThreeStore",
  () => {
    const step_one_three_how_well_do_you_leverage_industry_trends = reactive({
      question_number: 1,
      question_label:
        "How well do you leverage industry trends or insights to inspire new ideas for your business?",
      question_answer: "",
      question_options: [
        "Not well",
        "Poorly",
        "Adequately",
        "Well",
        "Exceptionally well",
      ],
      mapped_question_options: {
        e: "Not well",
        d: "Poorly",
        c: "Adequately",
        b: "Well",
        a: "Exceptionally well",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const step_one_three_how_often_do_you_experiment_in_your_biz = reactive({
      question_number: 2,
      question_label:
        "How often do you experiment with new approaches, products, or services to drive innovation in your business?",
      question_answer: "",
      question_options: ["Never", "Rarely", "Occasionally", "Often", "Always"],
      mapped_question_options: {
        e: "Never",
        d: "Rarely",
        c: "Occasionally",
        b: "Often",
        a: "Always",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market =
      reactive({
        question_number: 3,
        question_label:
          "How confident are you in your understanding of your target market's current needs and preferences?",
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

    const step_one_three_how_often_do_you_analyze_your_competitors_strategies =
      reactive({
        question_number: 4,
        question_label:
          "How often do you analyze your competitors' strategies to inform your own business decisions?",
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

    const step_one_three_how_effectively_do_you_stay_updated_on_industry_trends =
      reactive({
        question_number: 5,
        question_label:
          "How effectively do you stay updated on industry trends and market changes that may impact your business?",
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

    const step_one_three_how_frequently_do_you_use_customer_feedback = reactive(
      {
        question_number: 6,
        question_label:
          "How frequently do you use customer feedback to adjust your products, services, or business strategy?",
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
      }
    );

    const step_one_three_how_well_do_you_identify_new_opportunities = reactive({
      question_number: 5,
      question_label:
        "How well do you identify new opportunities (e.g., market gaps, emerging trends) to differentiate your business?",
      question_answer: "",
      question_options: [
        "Not well",
        "Poorly",
        "Adequately",
        "Well",
        "Exceptionally well",
      ],
      mapped_question_options: {
        e: "Not well",
        d: "Poorly",
        c: "Adequately",
        b: "Well",
        a: "Exceptionally well",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const get_step_one_three_how_well_do_you_leverage_industry_trends =
      computed(() => {
        return step_one_three_how_well_do_you_leverage_industry_trends.question_answer;
      });

    const get_step_one_three_how_often_do_you_experiment_in_your_biz = computed(
      () => {
        return step_one_three_how_often_do_you_experiment_in_your_biz.question_answer;
      }
    );

    const get_step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market =
      computed(() => {
        return step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market.question_answer;
      });

    const get_step_one_three_how_often_do_you_analyze_your_competitors_strategies =
      computed(() => {
        return step_one_three_how_often_do_you_analyze_your_competitors_strategies.question_answer;
      });

    const get_step_one_three_how_effectively_do_you_stay_updated_on_industry_trends =
      computed(() => {
        return step_one_three_how_effectively_do_you_stay_updated_on_industry_trends.question_answer;
      });

    const get_step_one_three_how_frequently_do_you_use_customer_feedback =
      computed(() => {
        return step_one_three_how_frequently_do_you_use_customer_feedback.question_answer;
      });

    const get_step_one_three_how_well_do_you_identify_new_opportunities =
      computed(() => {
        return step_one_three_how_well_do_you_identify_new_opportunities.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_one_three_how_well_do_you_leverage_industry_trends.question_answer !==
          "" &&
        step_one_three_how_often_do_you_experiment_in_your_biz.question_answer !==
          "" &&
        step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market.question_answer !==
          "" &&
        step_one_three_how_often_do_you_analyze_your_competitors_strategies.question_answer !==
          "" &&
        step_one_three_how_effectively_do_you_stay_updated_on_industry_trends.question_answer !==
          "" &&
        step_one_three_how_frequently_do_you_use_customer_feedback.question_answer !==
          "" &&
        step_one_three_how_well_do_you_identify_new_opportunities.question_answer !==
          ""
      );
    });

    const update_step_one_three_how_well_do_you_leverage_industry_trends = (
      answer: string
    ) => {
      if (answer === null) return;
      step_one_three_how_well_do_you_leverage_industry_trends.question_answer =
        answer;
    };

    const update_step_one_three_how_often_do_you_experiment_in_your_biz = (
      answer: string
    ) => {
      if (answer === null) return;
      step_one_three_how_often_do_you_experiment_in_your_biz.question_answer =
        answer;
    };

    const update_step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market =
      (answer: string) => {
        if (answer === null) return;
        step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market.question_answer =
          answer;
      };

    const update_step_one_three_how_often_do_you_analyze_your_competitors_strategies =
      (answer: string) => {
        if (answer === null) return;
        step_one_three_how_often_do_you_analyze_your_competitors_strategies.question_answer =
          answer;
      };

    const update_step_one_three_how_effectively_do_you_stay_updated_on_industry_trends =
      (answer: string) => {
        if (answer === null) return;
        step_one_three_how_effectively_do_you_stay_updated_on_industry_trends.question_answer =
          answer;
      };

    const update_step_one_three_how_frequently_do_you_use_customer_feedback = (
      answer: string
    ) => {
      if (answer === null) return;
      step_one_three_how_frequently_do_you_use_customer_feedback.question_answer =
        answer;
    };

    const update_step_one_three_how_well_do_you_identify_new_opportunities = (
      answer: string
    ) => {
      if (answer === null) return;
      step_one_three_how_well_do_you_identify_new_opportunities.question_answer =
        answer;
    };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_one_three_how_well_do_you_leverage_industry_trends,
        step_one_three_how_often_do_you_experiment_in_your_biz,
        step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market,
        step_one_three_how_often_do_you_analyze_your_competitors_strategies,
        step_one_three_how_effectively_do_you_stay_updated_on_industry_trends,
        step_one_three_how_frequently_do_you_use_customer_feedback,
        step_one_three_how_well_do_you_identify_new_opportunities,
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
      step_one_three_how_well_do_you_leverage_industry_trends,
      step_one_three_how_often_do_you_experiment_in_your_biz,
      step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market,
      step_one_three_how_often_do_you_analyze_your_competitors_strategies,
      step_one_three_how_effectively_do_you_stay_updated_on_industry_trends,
      step_one_three_how_frequently_do_you_use_customer_feedback,
      step_one_three_how_well_do_you_identify_new_opportunities,

      // Getters
      get_step_one_three_how_well_do_you_leverage_industry_trends,
      get_step_one_three_how_often_do_you_experiment_in_your_biz,
      get_step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market,
      get_step_one_three_how_often_do_you_analyze_your_competitors_strategies,
      get_step_one_three_how_effectively_do_you_stay_updated_on_industry_trends,
      get_step_one_three_how_frequently_do_you_use_customer_feedback,
      get_step_one_three_how_well_do_you_identify_new_opportunities,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_one_three_how_well_do_you_leverage_industry_trends,
      update_step_one_three_how_often_do_you_experiment_in_your_biz,
      update_step_one_three_how_confident_are_you_in_your_understanding_of_your_target_market,
      update_step_one_three_how_often_do_you_analyze_your_competitors_strategies,
      update_step_one_three_how_effectively_do_you_stay_updated_on_industry_trends,
      update_step_one_three_how_frequently_do_you_use_customer_feedback,
      update_step_one_three_how_well_do_you_identify_new_opportunities,
    };
  }
);
