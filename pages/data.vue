<script setup lang="ts">
const analytics = useAnalyticsController();

const route = useRoute("/data");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Data";

const prompt = reactive({
  failed: 0,
  ongoing: 0,
  successful: 0,
});

const prompt_as_chart_data = computed(() => {
  return [
    {
      label: "Failed",
      count: prompt.failed,
    },
    {
      label: "Successful",
      count: prompt.successful,
    },
    {
      label: "Ongoing",
      count: prompt.ongoing,
    },
  ];
});

onMounted(async () => {
  const prompt_st = await analytics.get_prompt_stats();

  // console.log(prompt_st);

  prompt_st?.forEach((pt) => {
    if (pt.prompt_stats_status == "Failed") {
      prompt.failed = pt.prompt_stats_count;
    } else if (pt.prompt_stats_status == "Ongoing") {
      prompt.ongoing = pt.prompt_stats_count;
    } else if (pt.prompt_stats_status == "Successful") {
      prompt.successful = pt.prompt_stats_count;
    }
  });
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
  >
    <div class="w-full flex justify-between items-center">
      <span class="font-[500] text-[18px]/[24px] text-[#101840]"> Data </span>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[24px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[16px] px-[20px]"
  >
    <div
      class="flex flex-col items-center gap-[10px] border-[1px] border-[#E5E7EB] rounded-[16px] px-[25px] py-[20px]"
    >
      <DataAdminHeader />
    </div>

    <div
      class="w-full grid grid-cols-5 gap-[24px] border-[1px] border-[#E5E7EB] rounded-[16px] px-[25px] py-[20px]"
    >
      <div class="col-span-3 flex flex-col items-start gap-[24px]">
        <div class="flex items-start w-full gap-[24px]">
          <div
            class="w-[300px] h-[220px] bg-[#ffffff] border-[0.5px] border-[#EFEFEF] rounded-[16px] py-[16px] px-[20px] flex flex-col gap-[20px] justify-between"
          >
            <span class="font-[500] text-[16px]/[20px] text-[#080808]">
              Prompt Processed
            </span>
            <div
              class="w-full h-[200px] flex items-start justify-between gap-[10px]"
            >
              <div class="h-[120px] flex items-start justify-between">
                <ChartsDoughnutChart :chart_data="prompt_as_chart_data" />
              </div>

              <div class="flex flex-col items-start gap-[10px] min-w-[90px]">
                <ChartsDoughnutLabelsPromptsFailed :count="prompt.failed" />
                <ChartsDoughnutLabelsPromptsOngoing :count="prompt.ongoing" />
                <ChartsDoughnutLabelsPromptsSuccessful
                  :count="prompt.successful"
                />
              </div>
            </div>
          </div>
          <div
            class="w-[300px] h-[220px] bg-[#ffffff] border-[0.5px] border-[#EFEFEF] rounded-[16px] pt-[16px] px-[20px] flex flex-col gap-[20px] justify-between"
          >
            <span class="font-[500] text-[16px]/[20px] text-[#080808]">
              Pending Requests
            </span>
            <div class="w-full flex items-center justify-center">
              <div
                class="w-[240px] h-[120px] bg-white border-t-[10px] border-l-[10px] border-r-[10px] border-[#FB3B52] rounded-tl-[140px] rounded-tr-[140px] border-t-[#EFEFEF] border-r-[#EFEFEF] border-b-0"
              ></div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <FilesFileList />
        </div>
      </div>
      <div class="col-span-2">
        <ActivitiesInDataPage />
      </div>
    </div>
  </div>
</template>
