<script setup lang="ts">
const route = useRoute("/clients");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Clients";

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

const filter_consultant = ref(null);
const filter_date_from = ref(null);
const filter_date_to = ref(null);

const currentPageNumber = ref<number>(1);

const total_client = ref<number | null>(null);

// const goto = async (client_uid: string) => {
//   if (!(client_uid ?? false)) return;
//   const router = useRouter();

//   await router.push(`/clients/${client_uid}`);
// };

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
});
</script>

<template>
  <div
    class="w-[500px] bg-[#ffffff] rounded-[12px] border-[1px] border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.02)] inset-shadow-[0_-6px_6px_6px_6px_rgba(255,255,255,0.08)] p-[20px] mb-[24px]"
  >
    <div class="flex flex-col w-full gap-[16px]">
      <div class="flex flex-col gap-[32px] w-full">
        <div class="flex justify-between items-center">
          <div class="flex gap-[8px]">
            <IconsDashboardNavUsers />

            <span class="font-[500] text-[16px] text-[#1A1A1D]"
              >Clients' Statistics
            </span>
          </div>
          <div class="flex items-center justify-center gap-[4px]">
            <!-- <span class="font-[500] text-[14px] text-[#E10600]">View more</span>
            <IconsChevronDown class="rotate-[-90deg]" /> -->
          </div>
        </div>
        <div class="flex items-end justify-between">
          <div v-show="total_client">
            <span class="font-[600] text-[22px] text-[#1A1A1D]">
              {{ total_client }}
            </span>
            <span class="font-[400] text-[20px] text-[#1A1A1D]">
              Client(s)
            </span>
          </div>

          <div v-show="false" class="flex items-center gap-[8px]">
            <span class="font-[500] text-[12px] text-[#AAAAAA]">
              From last year
            </span>
            <div
              class="flex justify-center items-center gap-[4px] py-[4px] px-[8px] bg-[#DCFCE7] rounded-[14px]"
            >
              <IconsFiTrendingUp />
              <span class="font-[500] text-[11px] text-[#15803D]">
                +4.75%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start gap-[12px]">
        <div
          class="flex flex-col items-start gap-[10px] bg-[#BE185D] rounded-[40px] w-full h-[8px]"
        >
          <div class="bg-[#16A34A] rounded-[40px] w-[60%] h-[8px]"></div>
        </div>
        <div class="flex items-center gap-[32px]">
          <div class="flex items-center gap-[8px]">
            <div class="w-[8px] h-[8px] rounded-full bg-[#15803D]"></div>
            <span class="text-[13px] text-[#15803D]"> Active Clients </span>
          </div>

          <div class="flex items-center gap-[8px]">
            <div class="w-[8px] h-[8px] rounded-full bg-[#BE185D]"></div>
            <span class="text-[13px] text-[#BE185D]"> Inactive Clients </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ClientList />
</template>

<style scoped>
.a_client_in_client_list:hover span {
  opacity: 50%;
}
</style>
