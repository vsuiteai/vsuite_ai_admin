<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="flex flex-col items-start gap-[4px]">
    <div class="flex items-center gap-[3px]">
      <div class="h-[4px] border-[2px] border-[#FB3B52]"></div>
      <span class="text-[12px]/[16px] text-[#696F8C]"> Failed </span>
    </div>
    <div class="w-full break-normal flex items-center gap-[4px]">
      <span class="font-[600] text-[16px]/[20px] text-[#080808]">
        {{ count }}
      </span>

      <span class="font-[500] text-[19px]/[12px] text-[#696F8C]">
        prompts
      </span>
    </div>
  </div>
</template>
