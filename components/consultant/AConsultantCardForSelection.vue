<script setup lang="ts">
const props = defineProps<{
  consultant: ConsultantDetail;
}>();
</script>

<template>
  <div class="flex w-full flex-col items-center gap-[24px]">
    <div class="flex w-full flex-col gap-[8px] items-center">
      <div class="flex flex-col items-center gap-[4px]">
        <!-- {{ consultant }} -->
        <span class="font-[400] text-[20px]/[26px] text-[#000000] text-center">
          {{ consultant.consultant_first_name }} <br />
          {{ consultant.consultant_last_name }}
        </span>
        <span class="font-[400] text-[12px]/[16px] text-[#808080]">
          {{ consultant.consultant_role }}
        </span>
      </div>
    </div>
    <div class="grid w-full grid-cols-2 divide-x-[1px] divide-[#EFEFEF]">
      <div class="flex flex-col gap-[8px] items-center justify-center">
        <span class="font-[400] text-[20px]/[26px] items-center text-[#000000]">
          7
        </span>
        <span class="font-[400] text-[13px]/[17px] items-center text-[#808080]">
          Active Clients
        </span>
      </div>
      <div class="flex flex-col gap-[8px] items-center justify-center">
        <span class="font-[400] text-[20px]/[26px] items-center text-[#000000]">
          40
        </span>
        <span class="font-[400] text-[13px]/[17px] items-center text-[#808080]">
          Total Clients
        </span>
      </div>
    </div>
  </div>
</template>
