<script setup lang="ts">
import {
  IconsDashboardNavConsultants,
  IconsDashboardNavUsers,
  IconsInsights,
} from "#components";

const route = useRoute("/");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Dashboard";

const analytics = useAnalyticsController();
const dashboard_insight = reactive({
  client: {
    label: "Clients",
    value: 0,
    icon: IconsDashboardNavUsers,
    icon_color: "#4F46E5",
  },
  consultant: {
    label: "Consultants",
    value: 0,
    icon: IconsDashboardNavConsultants,
    icon_color: "#E10600",
  },
  insight_generated: {
    label: "AI Insights Generated ",
    value: 0,
    icon: IconsInsights,
    icon_color: "#FACC15",
  },
});

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

const analytics_data = reactive({
  clients_by_industry: [] as { label: string | null; count: number }[],
});

onMounted(async () => {
  const client_data = await analytics.get_dashboard_startup_analytics();

  dashboard_insight.client.value = client_data?.data.total_clients ?? 0;
  dashboard_insight.consultant.value = client_data?.data.total_consultants ?? 0;
  analytics_data.clients_by_industry =
    client_data?.data.clients_by_industry ?? [];

  dashboard_insight.insight_generated.value =
    client_data?.data.ai_query_count ?? 0;
});
</script>

<template>
  <div class="w-full h-full flex flex-col items-start gap-[24px]">
    <div class="flex gap-[24px] w-full overflow-x-auto">
      <template v-for="insight in dashboard_insight">
        <div
          class="flex flex-col items-start justify-center gap-[12px] p-[20px] border border-[#E5E7EB] rounded-[12px] shadow-[0px_1px_3px_rgba(0,0,0,0.02),_inset_0px_-6px_6px_6px_rgba(255,255,255,0.08)] min-w-[250px]"
        >
          <div class="flex gap-[12px] flex-col">
            <component :is="insight.icon" :color="insight.icon_color" />
            <span class="font-[500] text-[16px]/[20px] text-[#1A1A1D]">
              {{ insight.label }}
            </span>
          </div>
          <div class="flex flex-col gap-[8px]">
            <span class="font-[600] text-[22px]/[29px] text-[#1A1A1D]">
              {{ insight.value }}
            </span>
          </div>
        </div>
      </template>
    </div>
    <div class="w-full flex flex-col gap-[24px]">
      <div class="w-full">
        <div
          class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
        >
          <div class="w-full flex justify-between items-center">
            <div class="flex items-center justify-center gap-[8px]">
              <img
                src="/assets/images/industry_coverage.png"
                class="w-[24px] h-[24px]"
                alt=""
              />
              <span class="font-[500] text-[18px]/[24px] text-[#101840]">
                Industry Coverage
              </span>
            </div>
            <div class="flex items-center gap-[8px]">
              <InputsDropdown
                v-model="filter_status"
                :options="filter_status_opt"
              />
              <InputsDropdown
                v-model="filter_status"
                :options="filter_status_opt"
              />
            </div>
          </div>
        </div>
        <div
          class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[16px] px-[20px]"
        >
          <div class="flex items-end gap-[16px] w-full">
            <div
              class="w-full flex flex-col relative overflow-x-auto border border-[#E5E7EB] rounded-[12px] h-[400px] py-[10px] px-[16px] gap-[30px]"
            >
              <div class="w-full flex justify-between items-center h-[50px]">
                <span class="font-[500] text-[18px]/[24px] text-[#101840]">
                  Industries
                </span>
              </div>

              <ChartsBarchart
                class="h-[350px]"
                :chart_data="analytics_data.clients_by_industry"
              />
            </div>
            <div
              class="w-full flex flex-col relative overflow-x-auto border border-[#E5E7EB] rounded-[12px] h-[400px] py-[10px] px-[16px] gap-[30px]"
            >
              <div class="w-full flex items-center gap-[10px] h-[50px]">
                <IconsMoneyGrow />
                <span class="font-[500] text-[18px]/[24px] text-[#101840]">
                  Activity
                </span>
              </div>

              <ChartsLinechart class="h-[350px]" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <ClientList />
      </div>
    </div>
  </div>
</template>
