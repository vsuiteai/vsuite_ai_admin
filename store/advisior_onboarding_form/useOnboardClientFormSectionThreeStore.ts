import { defineStore } from "pinia";

export const useAOFSectionThreeStore = defineStore(
  "AOFSectionThreeStore",
  () => {
    const step_three_does_you_family_members_in_leadership = reactive({
      question_number: 1,
      question_label:
        "Does your firm have family members in a leadership role?",
      question_answer: "",

      question_options: ["Yes", "No"],
    });

    const step_three_which_staff_titles_are_represented_in_your_firm = reactive(
      {
        question_number: 2,
        question_label:
          "Which staff titles are represented in your firm? Check all that apply",
        question_answer: [] as string[],

        question_options: [
          "CEO",
          "President",
          "Chief Financial Officer (CFO)",
          "Chief Operating Officer (COO)",
          "Chief Information or Technology Officer (CIO/CTO)",
          "Chief Marketing Officer",
          "Sales Manager",
          "General Manager",
          "Operations Manager",
          "Marketing Director",
          "Inventory Manager",
          "Customer Success Manager",
          "HR Manager",
          "Accountant",
        ],
      }
    );

    const step_three_are_there_any_pending_mergers_or_acquisitions = reactive({
      question_number: 3,
      question_label:
        "Are there any pending mergers or acquisitions either your company is targeting or being targeted by others?",
      question_answer: "",
      question_options: ["Yes", "No"],
    });

    const step_three_which_cms_does_your_firm_use = reactive({
      question_number: 4,
      question_label:
        "Which client/patient/customer management system does your firm use?",
      question_answer: "",
    });

    const step_three_how_many_states_do_have_ops = reactive({
      question_number: 4,
      question_label: "How many states do have operations (physical location)",
      question_answer: "",
      question_options: ["1", "2", "3", "4", "5", "Greater than 5"],
    });

    const step_three_what_is_your_product_service_mix = reactive({
      question_number: 5,
      question_label:
        "What is your product/service mix? Be as specific as possible.",
      question_answer: "",
    });

    const get_step_three_does_you_family_members_in_leadership = computed(
      () => {
        return step_three_does_you_family_members_in_leadership.question_answer;
      }
    );

    const get_step_three_which_cms_does_your_firm_use = computed(() => {
      return step_three_which_cms_does_your_firm_use.question_answer;
    });

    const get_step_three_which_staff_titles_are_represented_in_your_firm =
      computed<string[]>(() => {
        return step_three_which_staff_titles_are_represented_in_your_firm.question_answer;
      });

    const get_step_three_how_many_states_do_have_ops = computed(() => {
      return step_three_how_many_states_do_have_ops.question_answer;
    });

    const get_step_three_what_is_your_product_service_mix = computed(() => {
      return step_three_what_is_your_product_service_mix.question_answer;
    });

    const get_step_three_are_there_any_pending_mergers_or_acquisitions =
      computed(() => {
        return step_three_are_there_any_pending_mergers_or_acquisitions.question_answer;
      });

    const get_is_step_valid = computed(() => {
      return (
        step_three_which_staff_titles_are_represented_in_your_firm
          .question_answer.length !== 0 &&
        step_three_which_cms_does_your_firm_use.question_answer !== "" &&
        step_three_does_you_family_members_in_leadership.question_answer !==
          "" &&
        step_three_how_many_states_do_have_ops.question_answer !== "" &&
        step_three_what_is_your_product_service_mix.question_answer !== "" &&
        step_three_are_there_any_pending_mergers_or_acquisitions.question_answer !==
          ""
      );
    });

    const update_step_three_does_you_family_members_in_leadership = (
      answer: string
    ) => {
      if (answer === null) return;
      step_three_does_you_family_members_in_leadership.question_answer = answer;
    };

    const update_step_three_which_cms_does_your_firm_use = (answer: string) => {
      if (answer === null) return;
      step_three_which_cms_does_your_firm_use.question_answer = answer;
    };

    const update_step_three_which_staff_titles_are_represented_in_your_firm = (
      answer: string[]
    ) => {
      if (answer === null) return;
      step_three_which_staff_titles_are_represented_in_your_firm.question_answer =
        answer;
    };

    const update_step_three_how_many_states_do_have_ops = (answer: string) => {
      if (answer === null) return;
      step_three_how_many_states_do_have_ops.question_answer = answer;
    };

    const update_step_three_what_is_your_product_service_mix = (
      answer: string
    ) => {
      if (answer === null) return;
      step_three_what_is_your_product_service_mix.question_answer = answer;
    };

    const update_step_three_are_there_any_pending_mergers_or_acquisitions = (
      answer: string
    ) => {
      if (answer === null) return;
      step_three_are_there_any_pending_mergers_or_acquisitions.question_answer =
        answer;
    };

    const get_answers_for_submission = computed(() => {
      return [
        {
          question:
            step_three_does_you_family_members_in_leadership.question_label,
          answer:
            step_three_does_you_family_members_in_leadership.question_answer,
        },

        {
          question: step_three_which_cms_does_your_firm_use.question_label,
          answer: step_three_which_cms_does_your_firm_use.question_answer,
        },

        {
          question:
            step_three_which_staff_titles_are_represented_in_your_firm.question_label,
          answer:
            step_three_which_staff_titles_are_represented_in_your_firm.question_answer,
        },

        {
          question: step_three_how_many_states_do_have_ops.question_label,
          answer: step_three_how_many_states_do_have_ops.question_answer,
        },

        {
          question: step_three_what_is_your_product_service_mix.question_label,
          answer: step_three_what_is_your_product_service_mix.question_answer,
        },

        {
          question:
            step_three_are_there_any_pending_mergers_or_acquisitions.question_label,
          answer:
            step_three_are_there_any_pending_mergers_or_acquisitions.question_answer,
        },
      ];
    });

    return {
      step_three_does_you_family_members_in_leadership,
      step_three_which_cms_does_your_firm_use,
      step_three_which_staff_titles_are_represented_in_your_firm,
      step_three_how_many_states_do_have_ops,
      step_three_what_is_your_product_service_mix,
      step_three_are_there_any_pending_mergers_or_acquisitions,

      // Getters
      get_step_three_does_you_family_members_in_leadership,
      get_step_three_which_cms_does_your_firm_use,
      get_step_three_which_staff_titles_are_represented_in_your_firm,
      get_step_three_how_many_states_do_have_ops,
      get_is_step_valid,
      get_step_three_what_is_your_product_service_mix,
      get_step_three_are_there_any_pending_mergers_or_acquisitions,
      get_answers_for_submission,

      // Mutations
      update_step_three_does_you_family_members_in_leadership,
      update_step_three_which_cms_does_your_firm_use,
      update_step_three_which_staff_titles_are_represented_in_your_firm,
      update_step_three_how_many_states_do_have_ops,
      update_step_three_what_is_your_product_service_mix,
      update_step_three_are_there_any_pending_mergers_or_acquisitions,
    };
  }
);
