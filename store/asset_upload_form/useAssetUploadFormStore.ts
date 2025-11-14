import { defineStore } from "pinia";

export const useAssetUploadFormStore = defineStore(
  "AssetUploadFormStore",
  () => {
    const step_two_analysis_start_date = reactive({
      question_number: 1,
      question_label: "Start Date",
      question_answer: "",
    });

    const step_two_analysis_end_date = reactive({
      question_number: 2,
      question_label: "End Date",
      question_answer: "",
    });

    const step_two_metrics_type_contained_in_the_file = reactive({
      question_number: 3,
      question_label:
        "Select what kind of metrics is contained in the file(Select all that applies)",
      question_answer: [] as string[],
      question_options: [
        {
          value: "Financial Metrics",
          description:
            "Last three years tax returns, previous year Profit & Loss, current year income statement. This information is needed to analyze Gross Profit, Operating Profit, Net Profit, EBITDA, Quick Ratio, and Current Ratio for each of the previous three years",
        },
        {
          value: "Sales Metrics",
          description:
            "Average Revenue Per Customer (ARPC), Monthly & Annual Recurring Revenue (MRR/ARR), Sales Growth Rate (SGR), Sales Cycle Length, Customer Lifetime Value, Customer Retention Rate, Churn Rate, Customer Acquisition Cost, Lead Generation, Sales Pipeline Velocity, Sales Closure Rate",
        },
        {
          value: "Operational Metrics",
          description:
            "Cost of Goods Sold (COGS), Operating Expenses, Overhead Costs, Defect Rate, Net Promoter Score (NPS), Returns, Lead Time, Cycle Time, Downtime, Inventory Turnover, Order Fulfillment Rate.",
        },
      ],
    });

    const step_two_file_to_be_uploaded = reactive({
      question_number: 4,
      question_label: "File",
      question_answer: null as file_to_be_uploaded,
      file_types_needed: ["csv", "pdf", "xlxs", "doc", "docx"],
    });

    const get_step_two_analysis_start_date = computed(() => {
      return step_two_analysis_start_date.question_answer;
    });

    const get_step_two_analysis_end_date = computed(() => {
      return step_two_analysis_end_date.question_answer;
    });

    const get_step_two_metrics_type_contained_in_the_file = computed<string[]>(
      () => {
        return step_two_metrics_type_contained_in_the_file.question_answer;
      }
    );

    const get_step_two_file_to_be_uploaded = computed(() => {
      return step_two_file_to_be_uploaded.question_answer;
    });

    const get_is_step_valid = computed(() => {
      return (
        step_two_analysis_start_date.question_answer !== "" &&
        step_two_analysis_end_date.question_answer !== "" &&
        step_two_metrics_type_contained_in_the_file.question_answer.length !==
          0 &&
        step_two_file_to_be_uploaded.question_answer !== null
      );
    });

    const update_step_two_analysis_start_date = (start_date: string) => {
      if (start_date === null) return;
      step_two_analysis_start_date.question_answer = start_date;
    };

    const update_step_two_analysis_end_date = (end_date: string) => {
      if (end_date === null) return;
      step_two_analysis_end_date.question_answer = end_date;
    };

    const update_step_two_metrics_type_contained_in_the_file = (
      metrics: string[]
    ) => {
      if (metrics === null) return;
      step_two_metrics_type_contained_in_the_file.question_answer = metrics;
    };

    const update_step_two_file_to_be_uploaded = (file: File | null) => {
      if (file === null) return;
      step_two_file_to_be_uploaded.question_answer = file;
    };

    const get_answers_for_submission = computed(() => {
      return {
        start_date: step_two_analysis_start_date.question_answer,
        end_date: step_two_analysis_end_date.question_answer,
        metric_contained:
          step_two_metrics_type_contained_in_the_file.question_answer,
        file: step_two_file_to_be_uploaded.question_answer,
      };
    });

    const get_answers_as_formdata_for_submission = computed(() => {
      if (
        step_two_file_to_be_uploaded.question_answer === null ||
        (step_two_metrics_type_contained_in_the_file.question_answer ?? [])
          .length === 0
      )
        return false;
      const formData = new FormData();

      formData.append(
        "start_date",
        step_two_analysis_start_date.question_answer
      );
      formData.append("end_date", step_two_analysis_end_date.question_answer);
      formData.append(
        "metric_contained",
        step_two_metrics_type_contained_in_the_file.question_answer.join(",")
      );
      formData.append(
        "step_two_file_to_be_uploaded",
        step_two_file_to_be_uploaded.question_answer
      );

      return formData;
    });

    return {
      step_two_metrics_type_contained_in_the_file,
      step_two_analysis_start_date,
      step_two_analysis_end_date,
      step_two_file_to_be_uploaded,

      // Getters
      get_step_two_metrics_type_contained_in_the_file,
      get_step_two_analysis_start_date,
      get_step_two_analysis_end_date,
      get_step_two_file_to_be_uploaded,
      get_is_step_valid,
      get_answers_for_submission,
      get_answers_as_formdata_for_submission,

      // Mutations
      update_step_two_metrics_type_contained_in_the_file,
      update_step_two_analysis_start_date,
      update_step_two_analysis_end_date,
      update_step_two_file_to_be_uploaded,
    };
  }
);
