<script setup lang="ts">
import fileGeneral from "~/assets/images/files_general.png";
import fileSales from "~/assets/images/files_sales.png";
import fileOps from "~/assets/images/files_operation.png";
import fileFinancial from "~/assets/images/files_financial.png";

const clientController = useClientController();

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

const file_loading_error = ref(false);
const loading_files_analytics = ref(false);

const filter_date_from = ref(null);
const filter_date_to = ref(null);

const data_points = reactive({
  all_files: {
    label: "ALL FILES",
    count: 0,
    increased: true,
    decreased: false,
    remained_same: false,
    percentage: 30,
    image: fileGeneral,
  },

  sales: {
    label: "SALES",
    count: 0,
    increased: false,
    decreased: true,
    remained_same: false,
    percentage: 30,
    image: fileSales,
  },

  operation: {
    label: "OPERATIONS",
    count: 0,
    increased: false,
    decreased: true,
    remained_same: false,
    percentage: 30,
    image: fileOps,
  },

  financial: {
    label: "FINANCIAL",
    count: 0,
    increased: true,
    decreased: false,
    remained_same: false,
    percentage: 30,
    image: fileFinancial,
  },
});

const get_trend_is_positive = (increased: boolean, decreased: boolean) => {
  if (increased) {
    return true;
  } else if (decreased) {
    return false;
  } else {
    return undefined;
  }
};

const fetch_clients_files_analytics = async () => {
  try {
    if (loading_files_analytics.value) return;

    loading_files_analytics.value = true;

    const res =
      (await clientController.get_clients_files_analytics(
        filter_date_from.value,
        filter_date_to.value
      )) ?? false;

    if (!res) {
      throw new Error("Error fetching client data");
    }

    // console.log(res);

    data_points.all_files.count = res.total_files;
    data_points.financial.count = res.financial_files;
    data_points.operation.count = res.operations_files;
    data_points.sales.count = res.sales_files;
  } catch (error) {
    file_loading_error.value = true;
  }

  loading_files_analytics.value = false;
};

onMounted(async () => {
  await fetch_clients_files_analytics();
});
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <span class="font-[500] text-[18px]/[24px] text-[#101840]">
      Files Uploaded
    </span>
    <div class="flex items-center gap-[8px]">
      <InputsDropdown v-model="filter_status" :options="filter_status_opt" />
    </div>
  </div>
  <div class="w-full grid grid-cols-4 gap-[16px]">
    <template v-for="(value, key, index) in data_points" :key="index">
      <div
        class="flex p-[20px] border-[1px] border-[#E5E7EB] rounded-[8px] hadow-[0px_1px_3px_rgba(0,0,0,0.02),_inset_0px_-6px_6px_6px_rgba(255,255,255,0.08)]"
      >
        <div class="w-full flex flex-col gap-[8px]">
          <div class="w-full flex items-center justify-between gap-[10px]">
            <div class="flex flex-col items-start flex-col gap-[8px]">
              <span class="text-[14px]/[18px] text-[#696F8C]">
                {{ value.label }}
              </span>

              <span class="text-[28px] text-[#1A1A1D]"> {{ value.count }}</span>
            </div>
            <div
              class="flex items-center justify-center gap-[10px] rounded-[4px] bg-[#F9CDCC3D] p-[4px] w-[32px] h-[32px]"
            >
              <img :src="value.image" class="w-[24px] h-[24px]" alt="" />
            </div>
          </div>
          <div v-if="false" class="flex items-start gap-[4px]">
            <template v-if="value.increased">
              <span class="text-[12px] text-[#8F95B2]">
                Increased this week by
              </span>
              <div class="flex items-center">
                <IconsStats
                  :trend_is_positive="
                    get_trend_is_positive(value.increased, value.decreased)
                  "
                />
                <span class="font-[400] text-[12px] text-[#1DBF73]">
                  {{ value.percentage }} %
                </span>
              </div>
            </template>
            <template v-else-if="value.decreased">
              <span class="text-[12px] text-[#8F95B2]">
                decreased this week by
              </span>
              <div class="flex items-center">
                <IconsStats
                  :trend_is_positive="
                    get_trend_is_positive(value.increased, value.decreased)
                  "
                />
                <span class="font-[400] text-[12px] text-[#EF4444]">
                  {{ value.percentage }} %
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
