<script setup lang="ts">
defineProps<{
  questionaire_entry: QuestionaireEntry;
}>();
</script>
<template>
  <div class="w-full flex items-start justify-between h-[40px]">
    <span class="font-[400] text-[14px]/[24px] font-[#000000]">
      Initial form to gather perspective and practice of new clients.
    </span>

    <span class="font-[400] text-[14px]/[24px] font-[#000000]">
      Approximate Completion Time: 30 minutes
    </span>
  </div>

  <div
    class="flex items-center gap-[24px] w-full grid grid-cols-4 gap-4 w-full"
  >
    <div
      class="p-[24px] border-[1px] border-[#EDEFF5] rounded-[8px] bg-[#F9FAFB] flex items-center"
    >
      <div class="flex flex-col items-start gap-[66px]">
        <div class="w-[40px] h-[40px] bg-[#F9CDCC3D]"></div>

        <span class="font-[500] font-[14px]/[18px] text-[#000000]">
          Introduction
        </span>
      </div>
    </div>
    <div
      class="p-[24px] border-[1px] border-[#EDEFF5] rounded-[8px] bg-[#F9FAFB] flex items-center"
    >
      <div class="flex flex-col items-start gap-[66px]">
        <div class="w-[40px] h-[40px] bg-[#F9CDCC3D]"></div>

        <span class="font-[500] font-[14px]/[18px] text-[#000000]">
          Executive Intelligence
        </span>
      </div>
    </div>

    <div
      class="p-[24px] border-[1px] border-[#EDEFF5] rounded-[8px] bg-[#F9FAFB] flex items-center"
    >
      <div class="flex flex-col items-start gap-[66px]">
        <div class="w-[40px] h-[40px] bg-[#F9CDCC3D]"></div>

        <span class="font-[500] font-[14px]/[18px] text-[#000000]">
          Financial Intelligence
        </span>
      </div>
    </div>
    <div
      class="p-[24px] border-[1px] border-[#EDEFF5] rounded-[8px] bg-[#F9FAFB] flex items-center"
    >
      <div class="flex flex-col items-start gap-[66px]">
        <div class="w-[40px] h-[40px] bg-[#F9CDCC3D]"></div>

        <span class="font-[500] font-[14px]/[18px] text-[#000000]">
          Relational Intelligence
        </span>
      </div>
    </div>
  </div>
</template>
