import { defineStore } from "pinia";

export const useAOFSectionOneStore = defineStore("AOFSectionOneStore", () => {
  const step_one_company_name = reactive({
    question_number: 1,
    question_label: "Company name",
    question_answer: "",
  });

  const step_one_phone = reactive({
    question_number: 2,
    question_label: "Contact Phone Number",
    question_answer: "",
  });

  const step_one_work_email = reactive({
    question_number: 3,
    question_label: "Contact Work Email",
    question_answer: "",
  });

  const step_one_mailing_address = reactive({
    question_number: 4,
    question_label: "Mailing Address",
    question_answer: "",
  });

  const step_one_physical_address = reactive({
    question_number: 5,
    question_label: "Physical Address",
    question_answer: "",
  });

  const step_one_contact_name = reactive({
    question_number: 6,
    question_label: "Contact Name",
    question_answer: "",
  });

  const step_one_founder_name = reactive({
    question_number: 7,
    question_label: "CEO/Founder Name",
    question_answer: "",
  });

  const step_one_company_website = reactive({
    question_number: 8,
    question_label: "Company Website",
    question_answer: "",
  });

  const get_step_one_company_name = computed(() => {
    return step_one_company_name.question_answer;
  });

  const get_step_one_phone = computed(() => {
    return step_one_phone.question_answer;
  });

  const get_step_one_work_email = computed(() => {
    return step_one_work_email.question_answer;
  });

  const get_step_one_mailing_address = computed(() => {
    return step_one_mailing_address.question_answer;
  });

  const get_step_one_physical_address = computed(() => {
    return step_one_physical_address.question_answer;
  });

  const get_step_one_contact_name = computed(() => {
    return step_one_contact_name.question_answer;
  });

  const get_step_one_founder_name = computed(() => {
    return step_one_founder_name.question_answer;
  });

  const get_step_one_company_website = computed(() => {
    return step_one_company_website.question_answer;
  });

  const get_is_step_valid = computed(() => {
    return (
      step_one_company_name.question_answer !== "" &&
      step_one_phone.question_answer !== "" &&
      step_one_work_email.question_answer !== "" &&
      step_one_mailing_address.question_answer !== "" &&
      step_one_physical_address.question_answer !== "" &&
      step_one_contact_name.question_answer !== "" &&
      step_one_founder_name.question_answer !== "" &&
      step_one_company_website.question_answer !== ""
    );
  });

  const update_step_one_company_name = (company_name: string) => {
    if (company_name === null) return;
    step_one_company_name.question_answer = company_name;
  };

  const update_step_one_phone = (phone: string) => {
    if (phone === null) return;
    step_one_phone.question_answer = phone;
  };

  const update_step_one_work_email = (work_email: string) => {
    if (work_email === null) return;
    step_one_work_email.question_answer = work_email;
  };

  const update_step_one_mailing_address = (mailing_address: string) => {
    if (mailing_address === null) return;
    step_one_mailing_address.question_answer = mailing_address;
  };

  const update_step_one_physical_address = (mailing_address: string) => {
    if (mailing_address === null) return;
    step_one_physical_address.question_answer = mailing_address;
  };

  const update_step_one_contact_name = (mailing_address: string) => {
    if (mailing_address === null) return;
    step_one_contact_name.question_answer = mailing_address;
  };

  const update_step_one_founder_name = (mailing_address: string) => {
    if (mailing_address === null) return;
    step_one_founder_name.question_answer = mailing_address;
  };

  const update_step_one_company_website = (mailing_address: string) => {
    if (mailing_address === null) return;
    step_one_company_website.question_answer = mailing_address;
  };

  const get_answers_for_submission = computed(() => {
    return [
      {
        question: step_one_company_name.question_label,
        answer: step_one_company_name.question_answer,
      },

      {
        question: step_one_phone.question_label,
        answer: step_one_phone.question_answer,
      },

      {
        question: step_one_work_email.question_label,
        answer: step_one_work_email.question_answer,
      },

      {
        question: step_one_mailing_address.question_label,
        answer: step_one_mailing_address.question_answer,
      },

      {
        question: step_one_physical_address.question_label,
        answer: step_one_physical_address.question_answer,
      },

      {
        question: step_one_contact_name.question_label,
        answer: step_one_contact_name.question_answer,
      },

      {
        question: step_one_founder_name.question_label,
        answer: step_one_founder_name.question_answer,
      },

      {
        question: step_one_company_website.question_label,
        answer: step_one_company_website.question_answer,
      },
    ];
  });

  return {
    step_one_company_name,
    step_one_phone,
    step_one_work_email,
    step_one_mailing_address,
    step_one_physical_address,
    step_one_contact_name,
    step_one_founder_name,
    step_one_company_website,

    // Getters
    get_step_one_company_name,
    get_step_one_phone,
    get_step_one_work_email,
    get_step_one_mailing_address,
    get_is_step_valid,
    get_step_one_physical_address,
    get_step_one_contact_name,
    get_step_one_founder_name,
    get_step_one_company_website,
    get_answers_for_submission,

    // Mutations
    update_step_one_company_name,
    update_step_one_phone,
    update_step_one_work_email,
    update_step_one_mailing_address,
    update_step_one_physical_address,
    update_step_one_contact_name,
    update_step_one_founder_name,
    update_step_one_company_website,
  };
});
