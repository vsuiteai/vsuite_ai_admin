<script setup lang="ts">
const clientController = useClientController();
const activityLogController = useActivityLogController();

const clients = ref<ClientDetail[]>([]);
const pagination = ref<Pagination | null>(null);
const client_loading_error = ref(false);
const loading_clients = ref(false);

const search_term = ref(null);

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

const filter_consultant = ref([]);
const filter_date_from = ref(null);
const filter_date_to = ref(null);

const currentPageNumber = ref<number>(1);

const total_client = ref<number | null>(null);

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

watch(filter_consultant, async (new_val) => {
  // console.log(new_val);
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
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
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
        <InputsDropdown v-model="filter_status" :options="filter_status_opt" />
        <InputsConsultantsSelector v-model="filter_consultant" />
      </div>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[16px] px-[20px]"
  >
    <div class="flex flex-col items-end gap-[16px] w-full">
      <div class="w-full relative overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB] dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                STATUS
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                CLIENT'S NAME
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                PRIMARY CONTACT
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                ASSIGNED CONSULTANTS
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                LAST ACTIVITY
              </th>
            </tr>
          </thead>
          <template v-if="(clients ?? []).length > 0">
            <tbody>
              <tr
                v-for="(cl, index) in clients"
                class="bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB]"
              >
                <td class="px-[20px] py-[23px]">
                  <ClientOnboardingProcessStatus
                    :status="cl.onboarding_process_status"
                  />
                </td>
                <td class="px-[20px] py-[23px]">
                  <NuxtLink
                    :to="`/clients/${cl.client_uid}`"
                    class="a_client_in_client_list"
                  >
                    <div
                      class="grid grid-cols-[40px_minmax(150px,_1fr)] items-center"
                    >
                      <div
                        class="h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                      >
                        <span
                          class="uppercase font-[600] text-[12px] text-[#ffffff]"
                        >
                          <!-- NT -->
                        </span>
                      </div>
                      <span class="font-[500] text-[14px] text-[#000000]">
                        {{ cl.client_company_name }}
                      </span>
                    </div>
                  </NuxtLink>
                </td>
                <td class="px-[20px] py-[23px]">
                  <span
                    class="font-[400] text-[13px] text-[#667085] text-center"
                  >
                    {{ cl.client_contact_work_email }}
                  </span>
                </td>
                <td class="px-[20px] py-[23px]">
                  <div class="flex items-center">
                    <div
                      class="h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                    >
                      <span
                        class="uppercase font-[600] text-[12px] text-[#ffffff]"
                      >
                        NT
                      </span>
                    </div>
                    <div
                      class="translate-x-[-7px] h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                    >
                      <span
                        class="uppercase font-[600] text-[12px] text-[#ffffff]"
                      >
                        NT
                      </span>
                    </div>
                    <div
                      class="translate-x-[-14px] h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                    >
                      <span
                        class="uppercase font-[600] text-[12px] text-[#ffffff]"
                      >
                        NT
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-[20px] py-[23px]">
                  <span
                    class="font-[400] text-[13px] text-[#667085] text-center"
                  >
                    {{ activityLogController.parse_date(cl.last_activity!) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
        </table>
      </div>
      <div class="w-full flex justify-end">
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
