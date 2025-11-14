import { defineStore } from "pinia";

export const useOnboardClientFormSectionFourStore = defineStore(
  "OnboardClientFormSectionFourStore",
  () => {
    const step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn =
      reactive({
        question_number: 1,
        question_label:
          "How often do you actively build relationships with business clients beyond transactional interactions?",
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

    const step_four_how_well_do_you_maintain_long_term_relationships_with_clients =
      reactive({
        question_number: 2,
        question_label:
          "How well do you maintain long-term relationships with key clients or partners to foster loyalty?",
        question_answer: "",
        question_options: [
          "Poorly",
          "Fairly",
          "Adequately",
          "Well",
          "Exceptionally well",
        ],

        mapped_question_options: {
          e: "Poorly",
          d: "Fairly",
          c: "Adequately",
          b: "Well",
          a: "Exceptionally well",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_four_how_often_do_you_engage_with_potential_recruits = reactive({
      question_number: 3,
      question_label:
        "How often do you engage with potential recruits to identify and hire key talent for your business?",
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

    const step_four_how_comfortable_are_you_in_initiating_conversatn = reactive(
      {
        question_number: 4,
        question_label:
          "When networking, how comfortable are you in initiating conversations that could lead to strategic business partnerships?",
        question_answer: "",
        question_options: [
          "Very uncomfortable",
          "Uncomfortable",
          "Neutral",
          "Comfortable",
          "Very comfortable",
        ],

        mapped_question_options: {
          e: "Very uncomfortable",
          d: "Uncomfortable",
          c: "Neutral",
          b: "Comfortable",
          a: "Very comfortable",
        },
        for_ai_multiple_choice_analysis: true,
      }
    );

    const step_four_how_frequent_do_you_folloup_after_initial_interactn =
      reactive({
        question_number: 5,
        question_label:
          "How frequently do you follow up with clients or recruits after initial interactions to sustain engagement?",
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

    const get_step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn =
      computed(() => {
        return step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn.question_answer;
      });

    const get_step_four_how_well_do_you_maintain_long_term_relationships_with_clients =
      computed(() => {
        return step_four_how_well_do_you_maintain_long_term_relationships_with_clients.question_answer;
      });

    const get_step_four_how_often_do_you_engage_with_potential_recruits =
      computed(() => {
        return step_four_how_often_do_you_engage_with_potential_recruits.question_answer;
      });

    const get_step_four_how_comfortable_are_you_in_initiating_conversatn =
      computed(() => {
        return step_four_how_comfortable_are_you_in_initiating_conversatn.question_answer;
      });

    const get_step_four_how_frequent_do_you_folloup_after_initial_interactn =
      computed(() => {
        return step_four_how_frequent_do_you_folloup_after_initial_interactn.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn.question_answer !==
          "" &&
        step_four_how_well_do_you_maintain_long_term_relationships_with_clients.question_answer !==
          "" &&
        step_four_how_often_do_you_engage_with_potential_recruits.question_answer !==
          "" &&
        step_four_how_comfortable_are_you_in_initiating_conversatn.question_answer !==
          "" &&
        step_four_how_frequent_do_you_folloup_after_initial_interactn.question_answer !==
          ""
      );
    });

    const update_step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn =
      (answer: string) => {
        if (answer === null) return;
        step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn.question_answer =
          answer;
      };

    const update_step_four_how_well_do_you_maintain_long_term_relationships_with_clients =
      (answer: string) => {
        if (answer === null) return;
        step_four_how_well_do_you_maintain_long_term_relationships_with_clients.question_answer =
          answer;
      };

    const update_step_four_how_often_do_you_engage_with_potential_recruits = (
      answer: string
    ) => {
      if (answer === null) return;
      step_four_how_often_do_you_engage_with_potential_recruits.question_answer =
        answer;
    };

    const update_step_four_how_comfortable_are_you_in_initiating_conversatn = (
      answer: string
    ) => {
      if (answer === null) return;
      step_four_how_comfortable_are_you_in_initiating_conversatn.question_answer =
        answer;
    };

    const update_step_four_how_frequent_do_you_folloup_after_initial_interactn =
      (answer: string) => {
        if (answer === null) return;
        step_four_how_frequent_do_you_folloup_after_initial_interactn.question_answer =
          answer;
      };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn,
        step_four_how_well_do_you_maintain_long_term_relationships_with_clients,
        step_four_how_often_do_you_engage_with_potential_recruits,
        step_four_how_comfortable_are_you_in_initiating_conversatn,
        step_four_how_frequent_do_you_folloup_after_initial_interactn,
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
      step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn,
      step_four_how_well_do_you_maintain_long_term_relationships_with_clients,
      step_four_how_often_do_you_engage_with_potential_recruits,
      step_four_how_comfortable_are_you_in_initiating_conversatn,
      step_four_how_frequent_do_you_folloup_after_initial_interactn,

      // Getters
      get_step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn,
      get_step_four_how_well_do_you_maintain_long_term_relationships_with_clients,
      get_step_four_how_often_do_you_engage_with_potential_recruits,
      get_step_four_how_comfortable_are_you_in_initiating_conversatn,
      get_step_four_how_frequent_do_you_folloup_after_initial_interactn,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_four_how_often_do_you_build_relatn_with_clients_beyond_transactnal_interactn,
      update_step_four_how_well_do_you_maintain_long_term_relationships_with_clients,
      update_step_four_how_often_do_you_engage_with_potential_recruits,
      update_step_four_how_comfortable_are_you_in_initiating_conversatn,
      update_step_four_how_frequent_do_you_folloup_after_initial_interactn,
    };
  }
);
