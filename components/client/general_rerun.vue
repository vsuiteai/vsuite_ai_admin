<script setup lang="ts">
// const toast = useToast();

const props = defineProps<{
  client_details: ClientDetail | null;
}>();

const emits = defineEmits(["close_modal"]);

const clientController = useClientController();
const filesController = useFilesController();

const route = useRoute();

const uid = route.params.uid as string;

const files = ref<ClientUploadedFile[] | null>(null);
const selected_client_files = ref([]);
const selected_ai_agent = ref<ai_agentType | null>(null);

const is_visible = ref(false);
const reruning_prompt = ref(false);
const rerun_prompt_success = ref(false);
const rerun_prompt_error = ref("");

const queryCont = useQueryController();

const can_rerun = computed(() => {
  return (
    (selected_client_files.value ?? []).length > 0 &&
    (props.client_details?.client_uid ?? false)
  );
});

const rerun_prompt = async () => {
  try {
    if (!can_rerun.value) return;

    reruning_prompt.value = true;
    rerun_prompt_error.value = "";

    if (selected_ai_agent.value === null) {
      throw new Error("Please select an agent");
    }

    await queryCont.run_strategy(
      props.client_details?.client_uid!,
      selected_client_files.value,
      selected_ai_agent.value
    );

    rerun_prompt_success.value = true;
  } catch (error: any) {
    rerun_prompt_error.value = error.message || "An error occured";
  }

  reruning_prompt.value = false;
};

watchEffect(() => {
  if (rerun_prompt_success.value) {
    window.alert("Prompt initiated successfully");
    emits("close_modal");
  }
});

onBeforeMount(async () => {
  const res = await clientController.get_client_files(uid);
  files.value = res?.files ? res?.files : null;
});
</script>

<template>
  <div
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#00000033]"
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
              @click="$emit('close_modal')"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              Run A Strategy
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
                Client Details
              </span>
              <div class="flex flex-col w-full gap-[20px]">
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Company Name:
                  </span>
                  <span class="font-[400] text-[14px] text-[#E10600]">
                    {{ client_details?.client_company_name }}
                  </span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Contact Email:
                  </span>
                  <span class="font-[400] text-[14px] text-[#636D7E]">
                    {{ client_details?.client_contact_work_email }}
                  </span>
                </div>
                <div class="flex justify-between items-start">
                  <span class="font-[400] text-[14px] text-[#1A1A1D]">
                    Contact Name:
                  </span>
                  <span class="font-[400] text-[14px] text-[#636D7E]">
                    {{ client_details?.client_contact_fullname }}
                  </span>
                </div>
              </div>
            </div>

            <div class="w-full">
              <span class="font-[500] text-[16px] text-[#1A1A1D] mb-2 block">
                Choose Agent
              </span>

              <div class="w-full flex flex-col items-start gap-[16px]">
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
                      <span
                        class="font-[500] text-[16px]/[21px] text-[#111827]"
                      >
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
                      <span
                        class="font-[500] text-[16px]/[21px] text-[#111827]"
                      >
                        Gemini
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-4 pt-[10px] p-[20px] flex items-start">
            <div
              class="flex w-full flex-col p-[20px] gap-[32px] border border-[#F1F6FA] rounded-[8px]"
            >
              <div>
                <span class="font-[500] text-[16px] text-[#1A1A1D] mb-1">
                  vSuite Intelligence
                </span>
                <span class="font-[500] text-[14px] text-[#1A1A1D]">
                  Select files
                </span>
              </div>

              <AiStrategyFileUsed
                :client_files_used="files"
                v-model="selected_client_files"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
