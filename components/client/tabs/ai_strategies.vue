<script setup lang="ts">
const props = defineProps<{
  client_details: ClientDetail | null;
}>();

const queryController = useQueryController();

const queries = ref<any[]>([]);
const loading_queries = ref(false);
const queries_loading_error = ref(false);

const fetch_queries = async () => {
  try {
    // console.log("here");
    if (loading_queries.value) return;

    const uid = props?.client_details?.client_uid ?? false;
    if (!uid) return;

    loading_queries.value = true;

    let res = await queryController.get_queries(uid);

    if (!res) {
      throw new Error("Error fetching client data");
    }
    // console.log(res);

    queries.value = res?.queries ? res.queries : [];
  } catch (error) {
    queries_loading_error.value = true;
  }

  loading_queries.value = false;
};

const filter_status = ref(null);
const filter_status_opt = ref([
  {
    key: null,
    value: "All Status",
  },
  {
    key: true,
    value: "Completed",
  },
  {
    key: false,
    value: "Failed",
  },
  {
    key: false,
    value: "In progress",
  },
]);

const filter_consultant = ref(null);
const filter_date_from = ref(null);
const filter_date_to = ref(null);

onBeforeMount(async () => {
  await fetch_queries();
});
</script>

<template>
  <!-- {{ client_details }} -->
  <div class="w-full mb-[24px]">
    <span class="font-[600] text-[16px]/[24px] text-[#474D66]">
      STRATEGIES
    </span>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#F9FAFC] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
  >
    <div class="w-full flex justify-between items-center">
      <div></div>

      <div class="flex items-center gap-[8px]">
        <InputsDropdown v-model="filter_status" :options="filter_status_opt" />
      </div>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#F1F6FA] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] pb-[16px]"
  >
    <div class="flex flex-col items-end gap-[16px] w-full">
      <div class="w-full relative overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#E5E7EB8A] border-b-[1px] border-b-[#E5E7EB] dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                STRATEGY ID
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                DATE - TIME STARTED
              </th>
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
                INITIATOR
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                ACTION
              </th>
            </tr>
          </thead>
          <template v-if="(queries ?? []).length > 0">
            <tbody class="bg-[#F1F6FA]">
              <AiStrategyAiStraListInClient
                v-for="q in queries"
                :key="q.query_id"
                :query="q"
              />
            </tbody>
          </template>
        </table>
      </div>
      <div class="w-full flex justify-end">
        <!-- pagination -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.a_client_in_client_list:hover span {
  opacity: 50%;
}
</style>
