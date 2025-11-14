<script setup lang="ts">
defineProps({
  status: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    :class="{
      'bg-[#DCFCE7]': status,
      'bg-[#FCE7F3]': !status,
    }"
    class="flex items-center gap-[4px] py-[4px] px-[8px] h-[25px] min-w-[75px] rounded-[16px]"
  >
    <div
      :class="{
        'bg-[#15803D]': status,
        'bg-[#BE185D]': !status,
      }"
      class="h-[8px] w-[8px] rounded-full"
    ></div>
    <span v-if="status" class="font-[400] text-[13px] text-[#15803D]">
      ACTIVE
    </span>
    <span v-else class="font-[400] text-[13px] text-[#BE185D]"> INACTIVE </span>
  </div>
</template>
