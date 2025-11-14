import { defineStore } from "pinia";

export const useAOFSectionFourStore = defineStore("AOFSectionFourStore", () => {
  const step_four_which_best_rep_your_financial_status = reactive({
    question_number: 1,
    question_label:
      "Which best represents the financial status of your firm over the previous 2 years?",
    question_answer: "",
    question_options: [
      "Declining revenue",
      "Growing revenue",
      "Flat revenue",
      "Scaling revenue",
    ],
  });

  const step_four_which_makes_up_your_capital_stack = reactive({
    question_number: 2,
    question_label:
      "Which of the following make up your capital stack (how you fund at least 80% of operations)? Check as many as applies.",
    question_answer: [] as string[],
    question_options: [
      "Line of Credit",
      "Term Loan",
      "Merchant Cash Advance(S) MCA",
      "SBA Loan",
      "Corporate Credit Card(s)",
      "Free Cash Flow",
    ],
  });

  const step_four_is_your_firm_currently_using_ai = reactive({
    question_number: 3,
    question_label:
      "Is your firm currently using artificial intelligence (AI) in strategy, operations or administration?",
    question_answer: "",
    question_options: ["Yes", "No", "Unsure"],
  });

  const step_four_name_of_your_accountant_CPA_firm = reactive({
    question_number: 4,
    question_label: "What's the name of your accountant/CPA firm?",
    question_answer: "",
  });

  const step_four_any_legal_action_against_your_firm = reactive({
    question_number: 4,
    question_label:
      "Any legal action against your firm in the previous 7 years that was ruled against you?",
    question_answer: "",
    question_options: ["Yes", "No"],
  });

  const step_four_main_competitors = reactive({
    question_number: 5,
    question_label: "Who are your main competitors?",
    question_answer: "",
  });

  const get_step_four_which_best_rep_your_financial_status = computed(() => {
    return step_four_which_best_rep_your_financial_status.question_answer;
  });

  const get_step_four_name_of_your_accountant_CPA_firm = computed(() => {
    return step_four_name_of_your_accountant_CPA_firm.question_answer;
  });

  const get_step_four_which_makes_up_your_capital_stack = computed<string[]>(
    () => {
      return step_four_which_makes_up_your_capital_stack.question_answer;
    }
  );

  const get_step_four_any_legal_action_against_your_firm = computed(() => {
    return step_four_any_legal_action_against_your_firm.question_answer;
  });

  const get_step_four_main_competitors = computed(() => {
    return step_four_main_competitors.question_answer;
  });

  const get_step_four_is_your_firm_currently_using_ai = computed(() => {
    return step_four_is_your_firm_currently_using_ai.question_answer;
  });

  const get_is_step_valid = computed(() => {
    return (
      step_four_which_makes_up_your_capital_stack.question_answer.length !==
        0 &&
      step_four_name_of_your_accountant_CPA_firm.question_answer !== "" &&
      step_four_which_best_rep_your_financial_status.question_answer !== "" &&
      step_four_any_legal_action_against_your_firm.question_answer !== "" &&
      step_four_main_competitors.question_answer !== "" &&
      step_four_is_your_firm_currently_using_ai.question_answer !== ""
    );
  });

  const update_step_four_which_best_rep_your_financial_status = (
    answer: string
  ) => {
    if (answer === null) return;
    step_four_which_best_rep_your_financial_status.question_answer = answer;
  };

  const update_step_four_name_of_your_accountant_CPA_firm = (
    answer: string
  ) => {
    if (answer === null) return;
    step_four_name_of_your_accountant_CPA_firm.question_answer = answer;
  };

  const update_step_four_which_makes_up_your_capital_stack = (
    answer: string[]
  ) => {
    if (answer === null) return;
    step_four_which_makes_up_your_capital_stack.question_answer = answer;
  };

  const update_step_four_any_legal_action_against_your_firm = (
    answer: string
  ) => {
    if (answer === null) return;
    step_four_any_legal_action_against_your_firm.question_answer = answer;
  };

  const update_step_four_main_competitors = (answer: string) => {
    if (answer === null) return;
    step_four_main_competitors.question_answer = answer;
  };

  const update_step_four_is_your_firm_currently_using_ai = (answer: string) => {
    if (answer === null) return;
    step_four_is_your_firm_currently_using_ai.question_answer = answer;
  };

  const get_answers_for_submission = computed(() => {
    return [
      {
        question: step_four_which_best_rep_your_financial_status.question_label,
        answer: step_four_which_best_rep_your_financial_status.question_answer,
      },

      {
        question: step_four_name_of_your_accountant_CPA_firm.question_label,
        answer: step_four_name_of_your_accountant_CPA_firm.question_answer,
      },

      {
        question: step_four_which_makes_up_your_capital_stack.question_label,
        answer: step_four_which_makes_up_your_capital_stack.question_answer,
      },

      {
        question: step_four_any_legal_action_against_your_firm.question_label,
        answer: step_four_any_legal_action_against_your_firm.question_answer,
      },

      {
        question: step_four_main_competitors.question_label,
        answer: step_four_main_competitors.question_answer,
      },

      {
        question: step_four_is_your_firm_currently_using_ai.question_label,
        answer: step_four_is_your_firm_currently_using_ai.question_answer,
      },
    ];
  });

  return {
    step_four_which_best_rep_your_financial_status,
    step_four_name_of_your_accountant_CPA_firm,
    step_four_which_makes_up_your_capital_stack,
    step_four_any_legal_action_against_your_firm,
    step_four_main_competitors,
    step_four_is_your_firm_currently_using_ai,

    // Getters
    get_step_four_which_best_rep_your_financial_status,
    get_step_four_name_of_your_accountant_CPA_firm,
    get_step_four_which_makes_up_your_capital_stack,
    get_step_four_any_legal_action_against_your_firm,
    get_is_step_valid,
    get_step_four_main_competitors,
    get_step_four_is_your_firm_currently_using_ai,
    get_answers_for_submission,

    // Mutations
    update_step_four_which_best_rep_your_financial_status,
    update_step_four_name_of_your_accountant_CPA_firm,
    update_step_four_which_makes_up_your_capital_stack,
    update_step_four_any_legal_action_against_your_firm,
    update_step_four_main_competitors,
    update_step_four_is_your_firm_currently_using_ai,
  };
});
