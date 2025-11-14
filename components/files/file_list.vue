<script setup lang="ts">
const clientController = useClientController();
const filesController = useFilesController();

const files = ref<ClientUploadedFile[]>([]);
const pagination = ref<Pagination | null>(null);
const file_loading_error = ref(false);
const loading_files = ref(false);

const search_term = ref(null);

const filter_metric = ref(null);
const filter_metric_opt = ref([
  {
    key: null,
    value: "All Metrics",
  },
  {
    key: true,
    value: "Financial Metrics",
  },
  {
    key: false,
    value: "Sales Metrics",
  },
  {
    key: false,
    value: "Operational Metrics",
  },
]);

const filter_date_from = ref(null);
const filter_date_to = ref(null);

const currentPageNumber = ref<number>(1);

const total_files = ref<number | null>(null);

watch(currentPageNumber, async (new_val) => {
  await fetch_clients_files();
});

watch(search_term, async (new_val) => {
  if (new_val) {
    setTimeout(async () => {
      await fetch_clients_files();
    }, 1500);
  }
});

watch(filter_metric, async (new_val) => {
  await fetch_clients_files();
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

const fetch_clients_files = async () => {
  try {
    if (loading_files.value) return;
    if (typeof currentPageNumber.value !== "number") return;

    loading_files.value = true;

    /**
    filter_metric: string | null = null,
    filter_date_from: string | null = null,
    filter_date_to: string | null = null
     */

    const res =
      (await clientController.get_clients_files(
        currentPageNumber.value,
        search_term.value,
        filter_metric.value,
        filter_date_from.value,
        filter_date_to.value
      )) ?? false;

    if (!res) {
      throw new Error("Error fetching client data");
    }

    // console.log(res);

    files.value = res.files;
    pagination.value = res.pagination;

    total_files.value = res.pagination.totalItems;
  } catch (error) {
    file_loading_error.value = true;
  }

  loading_files.value = false;
};

onMounted(async () => {
  await fetch_clients_files();
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-[4px] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
  >
    <div class="w-full flex justify-between items-center">
      <span class="font-[500] text-[18px]/[24px] text-[#1A1A1D]"> Files </span>

      <div class="flex items-center gap-[8px]">
        <!-- <button
          class="flex items-center gap-[8px] p-[16px] h-[44px] bg-[#E10600] rounded-[200px]"
        >
          <span class="font-[500] text-[15px] text-[#FFFFFF]">
            Request Data
          </span>
        </button> -->
      </div>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#E5E7EB] border-[1px] border-[#E5E7EB] py-[16px] px-[20px]"
  >
    <div class="w-full flex justify-between items-center">
      <form class="">
        <label
          for="clients_search_term"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="search_term"
            type="search"
            id="clients_search_term"
            class="block min-w-[330px] w-full h-[42px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 outline-gray-500"
            placeholder="Search Client Name or Contact Email"
            required
          />
        </div>
      </form>

      <div class="flex items-center gap-[8px]">
        <InputsDropdown v-model="filter_metric" :options="filter_metric_opt" />
      </div>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[16px]"
  >
    <div class="flex flex-col items-end gap-[16px] w-full">
      <div class="w-full relative overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB]"
          >
            <tr>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                FILE NAME
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                OWNER
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                UPLOADED DATE
              </th>
            </tr>
          </thead>
          <template v-if="(files ?? []).length > 0">
            <tbody>
              <tr
                v-for="(file, index) in files"
                class="bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB]"
              >
                <td class="px-[20px] py-[23px]">
                  <div
                    class="grid grid-cols-[40px_minmax(150px,_1fr)] items-center"
                  >
                    <component
                      :is="filesController.getIcon(file.file_type)"
                      class="w-[32px]"
                    ></component>
                    <span
                      class="font-[500] text-[14px] text-[#000000] break-all"
                    >
                      {{ file.file_original_name }}
                    </span>
                  </div>
                </td>
                <td class="px-[20px] py-[23px]">
                  <NuxtLink
                    :to="`/clients/${file.owner?.client_uid}`"
                    class="a_client_in_client_list"
                  >
                    <div
                      class="grid grid-cols-[40px_minmax(150px,_1fr)] items-center"
                    >
                      <div
                        class="h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                      ></div>
                      <span class="font-[500] text-[14px] text-[#000000]">
                        {{ file.owner?.client_company_name }}
                      </span>
                    </div>
                  </NuxtLink>
                </td>

                <td class="px-[20px] py-[23px]">
                  <span
                    class="font-[400] text-[13px] text-[#667085] text-center"
                  >
                    {{ formatDate(file.created_at!) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
      <div class="w-full flex justify-end px-[5px]">
        <!-- pagination -->

        <!-- {{ pagination }} -->
        <nav class="flex gap-[8px]">
          <button
            @click="prev_page(true)"
            class="flex items-center justify-center py-[8px] px-[16px] gap-[10px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[4px] h-[32px]"
          >
            <span class="font-[500] text-[12px] text-[#000000]"> First </span>
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
            <span class="font-[500] text-[12px] text-[#000000]"> Last </span>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.a_client_in_client_list:hover span {
  opacity: 50%;
}
</style>
