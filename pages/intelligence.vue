<script setup lang="ts">
import { useChatStore } from "~/store/chat_store";
import { initModals } from "flowbite";

const route = useRoute("/intelligence");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Intelligence";

const clientController = useClientController();
const chatStore = useChatStore();

const showQueryModal = ref(false);
const selected_client = ref<ClientDetail | null>(null);
const selected_queries = ref([]);

const clients = ref<ClientDetail[]>([]);
const pagination = ref<Pagination | null>(null);
const client_loading_error = ref(false);
const loading_clients = ref(false);

const filter_status = ref(null);
const filter_status_opt = ref([
  {
    key: null,
    value: "All Status",
  },
  {
    key: true,
    value: "Active",
  },
  {
    key: false,
    value: "InActive",
  },
]);
const filter_consultant = ref(null);
const filter_date_from = ref(null);
const filter_date_to = ref(null);

const search_term = ref(null);

const currentPageNumber = ref<number>(1);
const total_client = ref<number | null>(null);

watch(selected_client, async (new_val) => {
  if (new_val) {
    chatStore.reset_data();
    selected_queries.value = [];
    chatStore.setcurrent_client(new_val);
  }
});

watch(selected_queries, async (new_val) => {
  if (new_val.length > 0) {
    chatStore.set_selected_queries(new_val);
  }
});

watch(currentPageNumber, async (new_val) => {
  await fetch_clients();
});

watch(search_term, async (new_val) => {
  if (new_val) {
    setTimeout(async () => {
      await fetch_clients();
    }, 1500);
  }
});

watch(filter_status, async (new_val) => {
  await fetch_clients();
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

const fetch_clients = async () => {
  try {
    if (loading_clients.value) return;
    if (typeof currentPageNumber.value !== "number") return;

    loading_clients.value = true;

    const res =
      (await clientController.get_clients(
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

    clients.value = res.clients;
    pagination.value = res.pagination;

    total_client.value = res.pagination.totalItems;
  } catch (error) {
    client_loading_error.value = true;
  }

  loading_clients.value = false;
};

onMounted(async () => {
  await fetch_clients();
  initModals();
});
</script>

<template>
  <div
    class="w-full min-h-[85vh] h-[85vh] bg-[#ffffff] grid grid-cols-5 items-start border border-[#E5E7EB] rounded-[16px] divide-x-1 divide-[#E5E7EB]"
  >
    <div
      class="col-span-2 flex flex-col items-start justify-between gap-[20px] h-full max-h-[85vh] py-[20px] px-[16px]"
    >
      <div
        class="w-full flex flex-col items-start gap-[10px] h-[90%] max-h-[90%]"
      >
        <div
          class="w-full flex flex-col items-center gap-[16px] h-[25%] max-h-[25%]"
        >
          <div class="w-full flex justify-between items-center">
            <span class="font-[500] text-[16px]/[24px] text-[#1A1A1D]">
              History
            </span>
            <div class="flex items-center gap-[8px]">
              <InputsDropdown
                v-model="filter_status"
                :options="filter_status_opt"
              />
            </div>
          </div>
          <div class="w-full">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only w-full"
              >Search</label
            >
            <div class="relative w-full">
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
                type="search"
                id="default-search"
                class="block w-full p-[16px] ps-[40px] text-gray-900 border border-[#E5E7EB] rounded-[8px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </div>
        </div>

        <div
          class="w-full flex flex-col items-start h-[75%] max-h-[75%] overflow-y-auto"
        >
          <template v-for="cl in clients">
            <div
              @click="selected_client = cl"
              :class="{
                'bg-[#F1F3F6]': selected_client?.client_id === cl.client_id,
              }"
              class="w-full flex gap-[12px] items-center hover:bg-[#FBFCFE] hover:cursor-pointer min-h-[60px] px-[10px]"
            >
              <div class="w-[40px] h-[40px] bg-[#4F46E5] rounded-full"></div>

              <div class="flex flex-col gap-[4px]">
                <span class="font-[500] text-[14px]/[18px] text-[#000000]">
                  {{ cl.client_company_name }}
                </span>
                <span class="font-[400] text-[12px]/[16px] text-[#667085]">
                  {{ cl.client_contact_work_email }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="w-full flex items-center justify-end h-[10%] py-4">
        <!-- {{ pagination }} -->
        <nav class="h-full flex items-center gap-[8px]">
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
    <div
      class="col-span-3 flex flex-col items-center justify-between h-full max-h-[85vh] relative"
    >
      <div
        class="flex items-center py-[25px] px-[16px] border-b border-[#E5E7EB] w-full min-h-[10vh]"
      >
        <div class="flex items-center gap-[16px]">
          <template v-if="selected_client">
            <div class="w-[40px] h-[40px] bg-[#4F46E5] rounded-full"></div>
            <div class="flex flex-col gap-[4px]">
              <span class="font-[500] text-[14px]/[18px] text-[#000000]">
                {{ selected_client.client_company_name }}
              </span>
              <span class="font-[400] text-[12px]/[16px] text-[#667085]">
                {{ selected_client.client_contact_work_email }}
              </span>
            </div>
          </template>
          <template v-else>
            <span class="font-[500] text-[14px]/[18px] text-[#000000]">
              Please select a client
            </span>
          </template>
        </div>
      </div>

      <template v-if="chatStore.get_selected_queries.length == 0">
        <div
          class="w-full overflow-y-auto max-h-[80px] h-[80px] mx-[24px] flex px-[10px] py-[15px] items-start"
        >
          <div
            id="alert-additional-content-1"
            class="px-4 py-2 mb-4 text-blue-800 rounded-lg bg-blue-50 w-full flex items-center justify-between"
            role="alert"
          >
            <div class="flex items-center">
              <svg
                class="shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Info</span>
              <h3 class="text-lg font-semibold text-sm">
                Please select the query items you would like to proceed with.
              </h3>
            </div>
            <div class="flex">
              <button
                v-if="selected_client"
                @click="showQueryModal = !showQueryModal"
                type="button"
                class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center"
              >
                Select queries
              </button>
              <p
                v-if="!selected_client"
                class="text-blue-800 bg-transparent font-medium rounded-lg text-xs py-1.5 text-center"
                data-dismiss-target="#alert-additional-content-1"
                aria-label="Close"
              >
                Select a client first!
              </p>
            </div>
          </div>
        </div>
      </template>

      <intelligence />
    </div>
  </div>

  <!-- Query Selector modal -->
  <div
    v-if="showQueryModal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#00000033]"
  >
    <div class="relative p-4 w-full max-w-4xl max-h-full h-full">
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
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="showQueryModal = !showQueryModal"
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
              Please select the relevant queries
            </span>
          </div>
        </div>
        <!-- {{ selected_queries }} -->
        <!-- Modal body -->
        <IntelligenceStrategySelector
          v-model="selected_queries"
          v-if="selected_client"
          :client="selected_client"
        />
      </div>
    </div>
  </div>
</template>
