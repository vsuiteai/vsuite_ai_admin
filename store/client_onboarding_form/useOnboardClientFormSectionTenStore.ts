import { defineStore } from "pinia";

export const useOnboardClientFormSectionTenStore = defineStore(
  "OnboardClientFormSectionTenStore",
  () => {
    const step_ten_how_confident_are_you_in_setting_a_clear_direction =
      reactive({
        question_number: 1,
        question_label:
          "How confident are you in setting a clear vision and direction for your team?",
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

    const step_ten_how_often_do_you_provide_constructive_feedback_to_your_team =
      reactive({
        question_number: 2,
        question_label:
          "How often do you provide constructive feedback to your team to improve their performance?",
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

    const step_ten_how_effectively_do_you_delegate_tasks = reactive({
      question_number: 3,
      question_label:
        "How effectively do you delegate tasks to ensure your business operates efficiently?",
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

    const step_ten_how_frequently_do_you_invest_time_in_developing = reactive({
      question_number: 4,
      question_label:
        "How frequently do you invest time in developing the leadership skills of your team members?",
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

    const step_ten_how_do_you_handle_decision_making = reactive({
      question_number: 5,
      question_label:
        "How do you handle decision-making when faced with conflicting priorities in your business?",
      question_answer: "",
      question_options: [
        "Avoid making decisions",
        "Struggle but eventually decide",
        "Make decisions with some hesitation",
        "Make decisions confidently",
        "Make decisions decisively with consideration of long-term impact",
      ],
      mapped_question_options: {
        e: "Avoid making decisions",
        d: "Struggle but eventually decide",
        c: "Make decisions with some hesitation",
        b: "Make decisions confidently",
        a: "Make decisions decisively with consideration of long-term impact",
      },
      for_ai_multiple_choice_analysis: true,
    });

    const get_step_ten_how_confident_are_you_in_setting_a_clear_direction =
      computed(() => {
        return step_ten_how_confident_are_you_in_setting_a_clear_direction.question_answer;
      });

    const get_step_ten_how_often_do_you_provide_constructive_feedback_to_your_team =
      computed(() => {
        return step_ten_how_often_do_you_provide_constructive_feedback_to_your_team.question_answer;
      });

    const get_step_ten_how_effectively_do_you_delegate_tasks = computed(() => {
      return step_ten_how_effectively_do_you_delegate_tasks.question_answer;
    });

    const get_step_ten_how_frequently_do_you_invest_time_in_developing =
      computed(() => {
        return step_ten_how_frequently_do_you_invest_time_in_developing.question_answer;
      });

    const get_step_ten_how_do_you_handle_decision_making = computed(() => {
      return step_ten_how_do_you_handle_decision_making.question_answer;
    });

    const get_is_step_valid = computed(() => {
      return (
        step_ten_how_confident_are_you_in_setting_a_clear_direction.question_answer !==
          "" &&
        step_ten_how_often_do_you_provide_constructive_feedback_to_your_team.question_answer !==
          "" &&
        step_ten_how_effectively_do_you_delegate_tasks.question_answer !== "" &&
        step_ten_how_frequently_do_you_invest_time_in_developing.question_answer !==
          "" &&
        step_ten_how_do_you_handle_decision_making.question_answer !== ""
      );
    });

    const update_step_ten_how_confident_are_you_in_setting_a_clear_direction = (
      answer: string
    ) => {
      if (answer === null) return;
      step_ten_how_confident_are_you_in_setting_a_clear_direction.question_answer =
        answer;
    };

    const update_step_ten_how_often_do_you_provide_constructive_feedback_to_your_team =
      (answer: string) => {
        if (answer === null) return;
        step_ten_how_often_do_you_provide_constructive_feedback_to_your_team.question_answer =
          answer;
      };

    const update_step_ten_how_effectively_do_you_delegate_tasks = (
      answer: string
    ) => {
      if (answer === null) return;
      step_ten_how_effectively_do_you_delegate_tasks.question_answer = answer;
    };

    const update_step_ten_how_frequently_do_you_invest_time_in_developing = (
      answer: string
    ) => {
      if (answer === null) return;
      step_ten_how_frequently_do_you_invest_time_in_developing.question_answer =
        answer;
    };

    const update_step_ten_how_do_you_handle_decision_making = (
      answer: string
    ) => {
      if (answer === null) return;
      step_ten_how_do_you_handle_decision_making.question_answer = answer;
    };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_ten_how_confident_are_you_in_setting_a_clear_direction,
        step_ten_how_often_do_you_provide_constructive_feedback_to_your_team,
        step_ten_how_effectively_do_you_delegate_tasks,
        step_ten_how_frequently_do_you_invest_time_in_developing,
        step_ten_how_do_you_handle_decision_making,
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
      step_ten_how_confident_are_you_in_setting_a_clear_direction,
      step_ten_how_often_do_you_provide_constructive_feedback_to_your_team,
      step_ten_how_effectively_do_you_delegate_tasks,
      step_ten_how_frequently_do_you_invest_time_in_developing,
      step_ten_how_do_you_handle_decision_making,

      // Getters
      get_step_ten_how_confident_are_you_in_setting_a_clear_direction,
      get_step_ten_how_often_do_you_provide_constructive_feedback_to_your_team,
      get_step_ten_how_effectively_do_you_delegate_tasks,
      get_step_ten_how_frequently_do_you_invest_time_in_developing,
      get_step_ten_how_do_you_handle_decision_making,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_ten_how_confident_are_you_in_setting_a_clear_direction,
      update_step_ten_how_often_do_you_provide_constructive_feedback_to_your_team,
      update_step_ten_how_effectively_do_you_delegate_tasks,
      update_step_ten_how_frequently_do_you_invest_time_in_developing,
      update_step_ten_how_do_you_handle_decision_making,
    };
  }
);
