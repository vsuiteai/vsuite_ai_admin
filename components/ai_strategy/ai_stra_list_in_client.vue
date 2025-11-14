<script setup lang="ts">
import { initModals } from "flowbite";

interface PromptType {
  status: boolean;
  query_result: string | null; // adjust `any` to a stricter type if you know it
}

const props = defineProps<{
  query: Query;
}>();

const is_visible = ref(false);
const reruning_prompt = ref(false);
const reruning_prompt_step_two = ref(false);
const rerun_prompt_success = ref(false);
const rerun_prompt_error = ref("");

const current_step = ref(1);
const client_files_used = ref<ClientUploadedFile[]>([]);
const queryCont = useQueryController();
const selected_client_files = ref([]);
const selected_ai_agent = ref<ai_agentType | null>(null);

const prompt_types = ref<Record<string, PromptType>>({
  "Startup Brain Analysis": {
    status: false,
    query_result: null,
  },
  "Onboarding Questionaire Analysis": {
    status: false,
    query_result: null,
  },
  "Narrative Builder": {
    status: false,
    query_result: null,
  },
  "Financial Risk Scoring Engine": {
    status: false,
    query_result: null,
  },
  "Financial Metric Analysis": {
    status: false,
    query_result: null,
  },
  "Strategic Diagnostic & Competitive Landscape": {
    status: false,
    query_result: null,
  },
  "Nirvana Navigation Scenario Architect": {
    status: false,
    query_result: null,
  },
});

const parse_query_keys = (query: Query) => {
  if (!query) return;

  if (query["StartupBrainAnalysis"])
    prompt_types.value["Startup Brain Analysis"].status = true;
  prompt_types.value["Startup Brain Analysis"].query_result =
    query["StartupBrainAnalysis"]?.prompt_result ?? "";

  if (query["OnboardingQuestionnaireAnalysis"])
    prompt_types.value["Onboarding Questionaire Analysis"].status = true;
  prompt_types.value["Onboarding Questionaire Analysis"].query_result =
    query["OnboardingQuestionnaireAnalysis"]?.prompt_result ?? "";

  if (query["BSANarrativeBuilder"])
    prompt_types.value["Narrative Builder"].status = true;
  prompt_types.value["Narrative Builder"].query_result =
    query["BSANarrativeBuilder"]?.prompt_result ?? "";

  if (query["BSAFinancialRiskScoringEngine"])
    prompt_types.value["Financial Risk Scoring Engine"].status = true;
  prompt_types.value["Financial Risk Scoring Engine"].query_result =
    query["BSAFinancialRiskScoringEngine"]?.prompt_result ?? "";

  if (query["BSAFinancialMetricAnalysis"])
    prompt_types.value["Financial Metric Analysis"].status = true;
  prompt_types.value["Financial Metric Analysis"].query_result =
    query["BSAFinancialMetricAnalysis"]?.prompt_result ?? "";

  if (query["StrategicDiagnosticAndCompetitiveLandscape"])
    prompt_types.value["Strategic Diagnostic & Competitive Landscape"].status =
      true;
  prompt_types.value[
    "Strategic Diagnostic & Competitive Landscape"
  ].query_result =
    query["StrategicDiagnosticAndCompetitiveLandscape"]?.prompt_result ?? "";

  if (query["NirvanaNavigationScenarioArchitect"])
    prompt_types.value["Nirvana Navigation Scenario Architect"].status = true;
  prompt_types.value["Nirvana Navigation Scenario Architect"].query_result =
    query["NirvanaNavigationScenarioArchitect"]?.prompt_result ?? "";
};

const add_files = (files: ClientUploadedFile[] | null) => {
  files?.forEach((el) => {
    const is_file_already_there = client_files_used.value.find((el_cl) => {
      return el_cl.file_id === el.file_id;
    });

    if (!is_file_already_there) {
      client_files_used.value.push(el);
    }
  });
};

const parse_query_files = (query: Query) => {
  if (!query) return;

  if ((query.financial_client_files ?? []).length > 0) {
    add_files(query.financial_client_files);
  }
  if ((query.sales_client_files ?? []).length > 0) {
    add_files(query.sales_client_files);
  }
  if ((query.operational_client_files ?? []).length > 0) {
    add_files(query.operational_client_files);
  }
};

watch(rerun_prompt_success, (new_val) => {
  if (new_val) {
    setTimeout(() => {
      const static_btn = document.querySelector(
        `[data-modal-hide="static-modal_${props.query?.id}"]`
      ) as HTMLButtonElement;

      if (static_btn) {
        current_step.value = 1;
        static_btn.click();
      }
    }, 2000);
  }
});

const can_rerun = computed(() => {
  return (
    (selected_client_files.value ?? []).length > 0 &&
    (props.query?.client.client_uid ?? false)
  );
});

const rerun_prompt = async () => {
  try {
    if (!can_rerun.value) return;

    reruning_prompt.value = true;
    rerun_prompt_error.value = "";

    if (selected_ai_agent.value === null) {
      current_step.value = 2;
      return;
    }

    reruning_prompt_step_two.value = true;

    await queryCont.run_strategy(
      props.query?.client.client_uid!,
      selected_client_files.value,
      selected_ai_agent.value
    );

    rerun_prompt_success.value = true;
  } catch (error: any) {
    rerun_prompt_error.value = error.message || "An error occured";
  }

  reruning_prompt_step_two.value = false;
  reruning_prompt.value = false;
};

const reset_loaded_data = () => {
  selected_client_files.value = [];
  selected_ai_agent.value = null;
  rerun_prompt_error.value = "";
};

onMounted(() => {
  parse_query_keys(props.query);
  parse_query_files(props.query);

  initModals();
});
</script>

<template>
  <tr
    class="border-b-[1px] border-[#E5E7EB] bg-[#ffffff] hover:cursor-pointer hover:bg-gray-100"
  >
    <td class="">
      <button
        @click="is_visible = !is_visible"
        type="button"
        class="px-[20px] py-[23px] flex items-center justify-between gap-[20px]"
      >
        <IconsChevronDown
          :class="{
            'rotate-[-90deg]': !is_visible,
          }"
        />

        <span class="text-[16px]/[21px] text-[#1A1A1D]">
          STR - {{ query?.query_id }}
        </span>
      </button>
    </td>
    <td class="px-[20px] py-[23px]">
      <span class="text-[13px]/[17px] text-[#1A1A1D]">
        {{ query?.formattedDate }}
      </span>
    </td>
    <td class="px-[20px] py-[23px]">
      <AiStrategyStatus :status="query?.status!" />
    </td>
    <td class="px-[20px] py-[23px]">
      <span class="font-[500] text-[13px]/[17px] text-[#1A1A1D] uppercase">
        Client
      </span>
    </td>
    <td class="px-[20px] py-[23px] flex items-center gap-[10px]">
      <button
        disabled
        class="flex items-center justify-center w-[28px] h-[28px] bg-[#27A376] rounded-[24px]"
      >
        <IconsFiDownloadCloud />
      </button>
      <button
        :data-modal-target="`static-modal_${query?.id}`"
        :data-modal-toggle="`static-modal_${query?.id}`"
        class="flex items-center justify-center w-[28px] h-[28px] bg-[#2F78EE] rounded-[24px]"
      >
        <IconsEyeOpen color="#fff" />
      </button>
      <button
        disabled
        class="flex items-center justify-center w-[28px] h-[28px] bg-[#E03137] rounded-[24px]"
      >
        <IconsFiTrash2 />
      </button>
    </td>
  </tr>
  <tr v-if="false">
    <td colspan="5" class="px-[20px] py-[23px]">
      <div class="w-full flex flex-col item-start gap-[16px]">
        <span class="font-[600] text-[16px]/[24px] text-[#474D66]">
          ATTACHMENTS
        </span>

        <AiStrategyFileUsed :client_files_used="client_files_used" />
      </div>
    </td>
  </tr>
  <tr v-if="false">
    <td colspan="5" class="px-[20px] py-[23px]">
      <div class="w-full flex flex-col item-start gap-[16px]">
        <span class="font-[600] text-[16px]/[24px] text-[#474D66]">
          QUERIES
        </span>
        <!-- {{ query?.OnboardingQuestionnaireAnalysis }} -->
        <div class="w-full flex flex-col items-start gap-[8px]">
          <template v-for="(value, key, index) in prompt_types">
            <div
              class="w-full bg-[#ffffff] rounded-[6px] gap-[10px] py-[12px] px-[24px] flex flex-col items-center justify-center"
            >
              <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-[10px]">
                  <IconsAPrompt />

                  <div
                    class="flex flex-col items-start justify-center gap-[4px]"
                  >
                    <div class="flex items-center gap-[8px]">
                      <span class="text-[14px]/[18px] text-[#111827]">
                        {{ key }}
                      </span>

                      <div
                        v-if="!value.status"
                        class="flex items-center justify-center py-[3px] px-[5px] gap-[3px] bg-[#FCE7F3] rounded-[9px]"
                      >
                        <span class="text-[8px]/[9px] text-[#BE185D]">
                          FAILED
                        </span>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 divide-x-1 divide-gray-500">
                      <span
                        class="inline-block px-[5px] font-[400] text-[12px]/[16px] text-[#808080]"
                      >
                        27th March, 2025 - 10:39 pm
                      </span>

                      <span
                        class="inline-block px-[5px] font-[400] text-[12px]/[16px] text-[#808080]"
                      >
                        Initiated by Client</span
                      >
                    </div>
                  </div>
                </div>

                <button
                  disabled
                  class="py-[12px] px-[24px] flex items-center justify-center"
                >
                  <span class="text-[#E10600] text-[15px]/[20px] font-[500]"
                    >View</span
                  >
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </td>
  </tr>

  <!-- Main modal -->
  <div
    :id="`static-modal_${query?.id}`"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#00000033]"
  >
    <div class="relative p-4 w-full max-w-6xl max-h-full h-full">
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-[100%] max-h-full h-full overflow-y-auto"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <div class="flex items-center gap-[10px]">
            <button
              @click="reset_loaded_data"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              :data-modal-hide="`static-modal_${query?.id}`"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>

            <span class="font-[600] text-[20px] text-[#1A1A1D]">
              STR - {{ query?.query_id }}
            </span>
          </div>

          <button
            :disabled="!can_rerun"
            @click="rerun_prompt"
            type="button"
            class="flex items-center p-[16px] gap-[8px] rounded-[200px] bg-[#E10600] hover:opacity-50 focus:opacity-[50] focus:ring-3 focus:ring-red-300"
          >
            <IconsRefresh v-if="reruning_prompt" class="animate-spin" />
            <span class="font-[500] text-[15px]/[20px] text-[#ffffff]">
              Rerun Prompt
            </span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="grid grid-cols-6 items-start p-4 md:p-5">
          <div
            class="col-span-2 flex flex-col items-start gap-[32px] pt-[10px] pb-[20px]"
          >
            <div class="flex flex-col items-start w-full gap-[20px]">
              <span class="font-[500] text-[16px] text-[#1A1A1D]">
                Prompt Details
              </span>
              <div class="flex flex-col w-full gap-[20px]">
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Initiator:
                  </span>
                  <span class="font-[400] text-[14px] text-[#E10600]">
                    Client
                  </span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Generated Date:
                  </span>
                  <span class="font-[400] text-[14px] text-[#636D7E]">
                    {{ query?.formattedDate }}
                  </span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Generated Time:
                  </span>
                  <span class="font-[400] text-[14px] text-[#636D7E]">
                    {{ query?.formattedTime }}
                  </span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Status:
                  </span>
                  <span class="font-[400] text-[14px] text-[#E10600]">
                    <AiStrategyStatus :status="query?.status!" />
                  </span>
                </div>
              </div>
            </div>
            <AiStrategyFileUsed
              :client_files_used="client_files_used"
              v-model="selected_client_files"
            />
          </div>
          <div class="col-span-4 pt-[10px] p-[20px] flex items-start">
            <div
              class="flex w-full flex-col p-[20px] gap-[32px] border border-[#F1F6FA] rounded-[8px]"
            >
              <span class="font-[500] text-[16px] text-[#1A1A1D]">
                vSuite Intelligence
              </span>

              <div class="flex flex-col items-start gap-[16px]">
                <template v-for="(value, k, index) in prompt_types">
                  <AiStrategyAPromptRep
                    :label="k"
                    :query_result="value.query_result ?? ''"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- AI Agent Selector Modal -->
  <div
    v-if="current_step === 2"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] flex justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#00000033]"
  >
    <div
      class="relative p-4 w-[500px] max-w-6xl max-h-full flex justify-center items-center"
    >
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-[12px] shadow-sm dark:bg-gray-700 w-[100%] max-h-full h-full overflow-y-auto flex flex-col items-center justify-center p-[32px] gap-[32px]"
      >
        <div class="w-full flex flex-col gap-[24px]">
          <div class="flex justify-between items-start">
            <div class="flex flex-col items-start gap-[6px]">
              <span class="font-[500] text-[18px]/[23px] text-[#111827]">
                Choice of AI
              </span>
              <span class="font-[400] text-[15px] text-[#6B7280]">
                Select type of data you will like to request
              </span>
            </div>

            <button
              @click="
                () => {
                  current_step = 1;
                  reruning_prompt = false;
                }
              "
              type="button"
              class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="flex flex-col items-start gap-[16px]">
            <div class="w-full">
              <input
                type="radio"
                id="open_ai"
                name="ai_agent"
                v-model="selected_ai_agent"
                value="open_ai"
                class="hidden peer"
              />

              <label
                for="open_ai"
                class="border border-[#F1F6FA] rounded-[4px] min-h-[50px] py-[20px] px-[32px] flex flex-col peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
              >
                <div class="h-full w-full flex items-center gap-[24px]">
                  <img
                    src="/assets/images/chat_gpt_icon.png"
                    class="w-[35px] h-[35px] rounded-full"
                    alt=""
                  />
                  <span class="font-[500] text-[16px]/[21px] text-[#111827]">
                    ChatGPT
                  </span>
                </div>
              </label>
            </div>
            <div class="w-full">
              <input
                type="radio"
                id="gemini"
                name="ai_agent"
                v-model="selected_ai_agent"
                value="gemini"
                class="hidden peer"
              />

              <label
                for="gemini"
                class="border border-[#F1F6FA] rounded-[4px] min-h-[50px] py-[20px] px-[32px] flex flex-col peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
              >
                <div class="h-full w-full flex items-center gap-[24px]">
                  <img
                    src="/assets/images/gemini_icon.png"
                    class="w-[35px] h-[35px] rounded-full"
                    alt=""
                  />
                  <span class="font-[500] text-[16px]/[21px] text-[#111827]">
                    Gemini
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col items-center gap-[5px]">
          <span
            v-if="rerun_prompt_success"
            class="text-center font-[500] text-[14px]/[20px] text-[#0000ff]"
          >
            Process started
          </span>
          <span
            v-if="rerun_prompt_error"
            class="text-center font-[500] text-[14px]/[20px] text-[#0000ff]"
          >
            {{ rerun_prompt_error }}
          </span>
          <button
            :disabled="!selected_ai_agent || reruning_prompt_step_two"
            @click="rerun_prompt"
            class="w-full flex items-center justify-center bg-[#E10600] border border-[#E10600] rounded-[200px] py-[6px] px-[14px] min-h-[40px]"
          >
            <span class="font-[400] text-[15px]/[20px] text-[#ffffff]">
              Proceed
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
