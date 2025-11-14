import { defineStore } from "pinia";

export const useAOFSectionTwoStore = defineStore("AOFSectionTwoStore", () => {
  const step_two_social_media_with_thes_trongest_presence = reactive({
    question_number: 1,
    question_label:
      "Which social media does your company have the strongest presence? List the top 2",
    question_answer: [] as string[],
    question_options: [
      "Linkedin",
      "Instagram",
      "Facebook",
      "Twitter",
      "TikTok",
    ],
  });

  const step_two_company_start_date = reactive({
    question_number: 2,
    question_label: "Company Start Date",
    question_answer: "",
  });

  const step_two_legal_organization_status = reactive({
    question_number: 3,
    question_label: "Legal Organization Status",
    question_answer: "",
    question_options: [
      "LLC",
      "LLC with S-Corp Designation",
      "Corporation",
      "LLP",
      "Partnership",
    ],
  });

  const step_two_number_of_employees = reactive({
    question_number: 4,
    question_label: "Number of Employees",
    question_answer: "",
    question_options: [
      "Less than 10 Employees",
      "11 - 25 Employees",
      "26 - 50 Employees",
      "51 - 100 Employees",
      "100 + Employees",
    ],
  });

  const step_two_number_of_contractors = reactive({
    question_number: 5,
    question_label: "Number of Contractors",
    question_answer: "",
    question_options: [
      "Less than 5 Contractors",
      "6 - 10 Contractors",
      "11 - 25 Contractors",
      "26 + Contractors",
    ],
  });

  const step_two_does_your_firm_have_union_workers = reactive({
    question_number: 6,
    question_label: "Does your firm have union workers?",
    question_answer: "",
    question_options: ["Yes", "No"],
  });

  const get_step_two_social_media_with_thes_trongest_presence = computed<
    string[]
  >(() => {
    return step_two_social_media_with_thes_trongest_presence.question_answer;
  });

  const get_step_two_company_start_date = computed(() => {
    return step_two_company_start_date.question_answer;
  });

  const get_step_two_legal_organization_status = computed(() => {
    return step_two_legal_organization_status.question_answer;
  });

  const get_step_two_number_of_employees = computed(() => {
    return step_two_number_of_employees.question_answer;
  });

  const get_step_two_number_of_contractors = computed(() => {
    return step_two_number_of_contractors.question_answer;
  });

  const get_step_two_does_your_firm_have_union_workers = computed(() => {
    return step_two_does_your_firm_have_union_workers.question_answer;
  });

  const get_is_step_valid = computed(() => {
    return (
      step_two_social_media_with_thes_trongest_presence.question_answer
        .length !== 0 &&
      step_two_company_start_date.question_answer !== "" &&
      step_two_legal_organization_status.question_answer !== "" &&
      step_two_number_of_employees.question_answer !== "" &&
      step_two_number_of_contractors.question_answer !== "" &&
      step_two_does_your_firm_have_union_workers.question_answer !== ""
    );
  });

  const update_step_two_social_media_with_thes_trongest_presence = (
    social_media_with_thes_trongest_presence: string[]
  ) => {
    if (social_media_with_thes_trongest_presence === null) return;
    step_two_social_media_with_thes_trongest_presence.question_answer =
      social_media_with_thes_trongest_presence;
  };

  const update_step_two_company_start_date = (company_start_date: string) => {
    if (company_start_date === null) return;
    step_two_company_start_date.question_answer = company_start_date;
  };

  const update_step_two_legal_organization_status = (
    legal_organization_status: string
  ) => {
    if (legal_organization_status === null) return;
    step_two_legal_organization_status.question_answer =
      legal_organization_status;
  };

  const update_step_two_number_of_employees = (number_of_employees: string) => {
    if (number_of_employees === null) return;
    step_two_number_of_employees.question_answer = number_of_employees;
  };

  const update_step_two_number_of_contractors = (
    number_of_employees: string
  ) => {
    if (number_of_employees === null) return;
    step_two_number_of_contractors.question_answer = number_of_employees;
  };

  const update_step_two_does_your_firm_have_union_workers = (
    number_of_employees: string
  ) => {
    if (number_of_employees === null) return;
    step_two_does_your_firm_have_union_workers.question_answer =
      number_of_employees;
  };

  const get_answers_for_submission = computed(() => {
    return [
      {
        question:
          step_two_social_media_with_thes_trongest_presence.question_label,
        answer:
          step_two_social_media_with_thes_trongest_presence.question_answer,
      },

      {
        question: step_two_company_start_date.question_label,
        answer: step_two_company_start_date.question_answer,
      },

      {
        question: step_two_legal_organization_status.question_label,
        answer: step_two_legal_organization_status.question_answer,
      },

      {
        question: step_two_number_of_employees.question_label,
        answer: step_two_number_of_employees.question_answer,
      },

      {
        question: step_two_number_of_contractors.question_label,
        answer: step_two_number_of_contractors.question_answer,
      },

      {
        question: step_two_does_your_firm_have_union_workers.question_label,
        answer: step_two_does_your_firm_have_union_workers.question_answer,
      },
    ];
  });

  return {
    step_two_social_media_with_thes_trongest_presence,
    step_two_company_start_date,
    step_two_legal_organization_status,
    step_two_number_of_employees,
    step_two_number_of_contractors,
    step_two_does_your_firm_have_union_workers,

    // Getters
    get_step_two_social_media_with_thes_trongest_presence,
    get_step_two_company_start_date,
    get_step_two_legal_organization_status,
    get_step_two_number_of_employees,
    get_is_step_valid,
    get_step_two_number_of_contractors,
    get_step_two_does_your_firm_have_union_workers,
    get_answers_for_submission,

    // Mutations
    update_step_two_social_media_with_thes_trongest_presence,
    update_step_two_company_start_date,
    update_step_two_legal_organization_status,
    update_step_two_number_of_employees,
    update_step_two_number_of_contractors,
    update_step_two_does_your_firm_have_union_workers,
  };
});
