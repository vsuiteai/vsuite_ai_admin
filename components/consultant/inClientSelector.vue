<script setup lang="ts">
const props = defineProps<{
  client_details: ClientDetail | null;
}>();

const emits = defineEmits(["close_modal"]);

const consultantController = useConsultantController();
const clientController = useClientController();

const consultants = ref<ConsultantDetail[]>([]);
const pagination = ref<Pagination | null>(null);
const loading_consultants = ref(false);
const consultant_loading_error = ref(false);

const attach_consultant_error = ref("");
const attach_consultant_success = ref(false);

const search_term = ref(null);
const currentPageNumber = ref<number>(1);
const filter_consultant = ref(null);
const filter_date_from = ref(null);
const filter_date_to = ref(null);
const filter_status = ref(null);

const selected_consultants = ref<string[]>([]);

watch(currentPageNumber, async (new_val) => {
  await fetch_consultants();
});

const next_page = async (last: boolean) => {
  if (last) {
    const lastPage = pagination.value?.totalPages ?? false;

    if (!lastPage) return;

    currentPageNumber.value = lastPage;
  } else {
    const hasNext = pagination.value?.hasNext ?? false;
    const currentPage = pagination.value?.currentPage ?? false;

    if (!hasNext || !currentPage) return;

    currentPageNumber.value = currentPage + 1;
  }
};

const prev_page = async (first: boolean) => {
  if (first) {
    currentPageNumber.value = 1;
  } else {
    const hasPrev = pagination.value?.hasPrev ?? false;
    const currentPage = pagination.value?.currentPage ?? false;

    if (!hasPrev || !currentPage || (currentPage && currentPage === 1)) return;

    currentPageNumber.value = currentPage - 1;
  }
};

const fetch_consultants = async () => {
  try {
    if (loading_consultants.value) return;
    if (typeof currentPageNumber.value !== "number") return;

    loading_consultants.value = true;
    consultant_loading_error.value = false;

    const res =
      (await consultantController.get_consultants(
        currentPageNumber.value,
        search_term.value,
        filter_status.value,
        filter_consultant.value,
        filter_date_from.value,
        filter_date_to.value
      )) ?? false;

    if (!res) {
      throw new Error("Error fetching client data");
    }

    console.log(res);

    consultants.value = res.consultants;
    pagination.value = res.pagination;
  } catch (error) {
    consultant_loading_error.value = true;
  }

  loading_consultants.value = false;
};

const submit_consultants = async () => {
  try {
    const client_id = props?.client_details?.client_id ?? "";

    if (client_id === "") throw new Error("No client selected");

    if (selected_consultants.value.length === 0) {
      throw new Error("No consultants selected");
    }

    const res = await clientController.attach_consultants(
      client_id,
      selected_consultants.value
    );

    if (res.error) {
      throw new Error(res.message || "Error attaching consultants");
    }

    console.log("Consultants attached:", res);

    // optionally refresh client details or show success notification
    // alert("Consultants successfully attached");
    attach_consultant_success.value = true;

    emits("close_modal");
  } catch (err: any) {
    console.error("Submit error:", err.message);
    // alert(err.message);
    attach_consultant_error.value = err.message;
  }
};

onBeforeMount(async () => {
  const res = await fetch_consultants();
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
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 h-[15%]"
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
              Select a Consultant
            </span>
          </div>

          <button
            :disabled="selected_consultants.length === 0"
            @click="submit_consultants"
            type="button"
            class="flex items-center p-[16px] gap-[8px] rounded-[200px] bg-[#E10600] hover:opacity-50 focus:opacity-[50] focus:ring-3 focus:ring-red-300"
          >
            <span class="font-[500] text-[15px]/[20px] text-[#ffffff]">
              Attach selected consultant
            </span>
          </button>
        </div>
        <!-- Modal body -->
        <div
          class="grid grid-cols-12 gap-4 items-start p-4 md:p-5 h-[70%] max-h-[70%] overflow-y-scroll"
        >
          <template v-if="(consultants ?? []).length > 0">
            <template v-for="(cl, index) in consultants">
              <div
                class="w-full p-[32px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[8px] col-span-3"
                :class="{
                    'border-red-600': selected_consultants.includes(cl.consultant_id!)
                }"
              >
                <input
                  v-model="selected_consultants"
                  type="checkbox"
                  :id="`consultant_${index}`"
                  :value="cl.consultant_id"
                  class="hidden peer"
                />
                <label :for="`consultant_${index}`">
                  <ConsultantAConsultantCardForSelection :consultant="cl" />
                </label>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="col-span-3">
              <p>No consultant found</p>
            </div>
          </template>
        </div>

        <div
          class="flex items-center justify-between p-4 md:p-5 border-t rounded-t dark:border-gray-600 border-gray-200 h-[15%]"
        >
          <div class="w-full flex justify-end">
            <!-- {{ pagination }} -->
            <nav class="flex gap-[8px]">
              <button
                @click="prev_page(true)"
                class="flex items-center justify-center py-[8px] px-[16px] gap-[10px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[4px] h-[32px]"
              >
                <span class="font-[500] text-[12px] text-[#000000]">
                  First
                </span>
              </button>
              <div class="flex gap-[2px] items-center justify-center">
                <button
                  @click="prev_page(false)"
                  :disabled="!pagination?.hasPrev"
                  class="flex justify-center items-center p-[6px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-[4px] h-[32px] w-[32px]"
                >
                  <IconsChevronDown class="rotate-[90deg]" />
                </button>

                <template v-for="i in pagination?.pages">
                  <button
                    @click="
                      () => {
                        if (typeof i === 'number') currentPageNumber = i;
                      }
                    "
                    :class="{
                      'border-[#E5E7EB] bg-[#E10600] text-[#FFFFFF]':
                        i === pagination?.currentPage,
                      'border-[#E5E7EB] bg-[#ffffff] text-[#000000]':
                        i !== pagination?.currentPage,
                    }"
                    class="flex justify-center items-center p-[6px] bg- border-[1px] rounded-[4px] h-[32px] w-[32px]"
                  >
                    <span class="font-[500] text-[12px]">
                      {{ i }}
                    </span>
                  </button>
                </template>

                <button
                  @click="next_page(false)"
                  :disabled="!pagination?.hasNext"
                  class="flex justify-center items-center p-[6px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-[4px] h-[32px] w-[32px]"
                >
                  <IconsChevronDown class="rotate-[-90deg]" />
                </button>
              </div>

              <button
                @click="next_page(true)"
                class="flex items-center justify-center py-[8px] px-[16px] gap-[10px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[4px] h-[32px]"
              >
                <span class="font-[500] text-[12px] text-[#000000]">
                  Last
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
