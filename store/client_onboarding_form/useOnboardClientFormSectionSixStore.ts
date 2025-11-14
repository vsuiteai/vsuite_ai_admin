import { defineStore } from "pinia";

export const useOnboardClientFormSectionSixStore = defineStore(
  "OnboardClientFormSectionSixStore",
  () => {
    const step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn =
      reactive({
        question_number: 1,
        question_label:
          "How often do you succeed in convincing clients or employees to adopt your ideas or solutions?",
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

    const step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs =
      reactive({
        question_number: 2,
        question_label:
          "How would you rate your ability to tailor your pitch to meet the specific needs of clients or stakeholders?",
        question_answer: "",
        question_options: ["Poor", "Fair", "Average", "Good", "Excellent"],
        mapped_question_options: {
          e: "Poor",
          d: "Fair",
          c: "Average",
          b: "Good",
          a: "Excellent",
        },
        for_ai_multiple_choice_analysis: true,
      });

    const step_six_how_frequently_do_you_use_storytelling = reactive({
      question_number: 3,
      question_label:
        "How frequently do you use storytelling techniques to make your business proposals more compelling?",
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

    const step_six_how_confident_are_you_when_negotiating_favorable_terms =
      reactive({
        question_number: 4,
        question_label:
          "How confident are you when negotiating favorable terms with clients or suppliers?",
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

    const step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument =
      reactive({
        question_number: 5,
        question_label:
          "How often do you prepare thoroughly before making a persuasive argument or presentation?",
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

    const get_step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn =
      computed(() => {
        return step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn.question_answer;
      });

    const get_step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs =
      computed(() => {
        return step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs.question_answer;
      });

    const get_step_six_how_frequently_do_you_use_storytelling = computed(() => {
      return step_six_how_frequently_do_you_use_storytelling.question_answer;
    });

    const get_step_six_how_confident_are_you_when_negotiating_favorable_terms =
      computed(() => {
        return step_six_how_confident_are_you_when_negotiating_favorable_terms.question_answer;
      });

    const get_step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument =
      computed(() => {
        return step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn.question_answer !==
          "" &&
        step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs.question_answer !==
          "" &&
        step_six_how_frequently_do_you_use_storytelling.question_answer !==
          "" &&
        step_six_how_confident_are_you_when_negotiating_favorable_terms.question_answer !==
          "" &&
        step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument.question_answer !==
          ""
      );
    });

    const update_step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn =
      (answer: string) => {
        if (answer === null) return;
        step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn.question_answer =
          answer;
      };

    const update_step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs =
      (answer: string) => {
        if (answer === null) return;
        step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs.question_answer =
          answer;
      };

    const update_step_six_how_frequently_do_you_use_storytelling = (
      answer: string
    ) => {
      if (answer === null) return;
      step_six_how_frequently_do_you_use_storytelling.question_answer = answer;
    };

    const update_step_six_how_confident_are_you_when_negotiating_favorable_terms =
      (answer: string) => {
        if (answer === null) return;
        step_six_how_confident_are_you_when_negotiating_favorable_terms.question_answer =
          answer;
      };

    const update_step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument =
      (answer: string) => {
        if (answer === null) return;
        step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument.question_answer =
          answer;
      };

    const get_answers_for_submission = computed(() => {
      const questions = [
        step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn,
        step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs,
        step_six_how_frequently_do_you_use_storytelling,
        step_six_how_confident_are_you_when_negotiating_favorable_terms,
        step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument,
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
      step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn,
      step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs,
      step_six_how_frequently_do_you_use_storytelling,
      step_six_how_confident_are_you_when_negotiating_favorable_terms,
      step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument,

      // Getters
      get_step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn,
      get_step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs,
      get_step_six_how_frequently_do_you_use_storytelling,
      get_step_six_how_confident_are_you_when_negotiating_favorable_terms,
      get_step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_six_how_often_do_you_succeed_convincing_clients_to_adopt_your_ideas_or_solutn,
      update_step_six_rate_your_ability_to_tailor_your_pitch_to_meet_specific_needs,
      update_step_six_how_frequently_do_you_use_storytelling,
      update_step_six_how_confident_are_you_when_negotiating_favorable_terms,
      update_step_six_how_often_do_you_prepare_thoroughly_before_making_an_argument,
    };
  }
);
