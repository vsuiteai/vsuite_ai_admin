import { defineStore } from "pinia";

export const useOnboardClientFormSectionOneStore = defineStore(
  "OnboardClientFormSectionOneStore",
  () => {
    const step_one_fullname = reactive({
      question_number: 1,
      question_label: "Fullname",
      question_answer: "",
    });

    const step_one_phone = reactive({
      question_number: 2,
      question_label: "Primary Contact Phone Number",
      question_answer: "",
    });

    const step_one_work_email = reactive({
      question_number: 3,
      question_label: "Primary Contact Work Email",
      question_answer: "",
    });

    const step_one_mailing_address = reactive({
      question_number: 4,
      question_label: "Mailing Address",
      question_answer: "",
    });

    const get_step_one_fullname = computed(() => {
      return step_one_fullname.question_answer;
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

    const get_is_step_valid = computed(() => {
      return (
        step_one_fullname.question_answer !== "" &&
        step_one_phone.question_answer !== "" &&
        step_one_work_email.question_answer !== "" &&
        step_one_mailing_address.question_answer !== ""
      );
    });

    const update_step_one_fullname = (fullname: string) => {
      if (fullname === null) return;
      step_one_fullname.question_answer = fullname;
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

    const get_answers_for_submission = computed(() => {
      return [
        {
          question: step_one_fullname.question_label,
          answer: step_one_fullname.question_answer,
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
      ];
    });

    return {
      step_one_fullname,
      step_one_phone,
      step_one_work_email,
      step_one_mailing_address,

      // Getters
      get_step_one_fullname,
      get_step_one_phone,
      get_step_one_work_email,
      get_step_one_mailing_address,
      get_is_step_valid,
      get_answers_for_submission,

      // Mutations
      update_step_one_fullname,
      update_step_one_phone,
      update_step_one_work_email,
      update_step_one_mailing_address,
    };
  }
);
