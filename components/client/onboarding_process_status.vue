<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    status: onboarding_process_status;
  }>(),
  {
    status: "not_started",
  }
);
</script>

<template>
  <div
    :class="{
      'bg-[#DCFCE7]': status === 'completed',
      'bg-[#FCE7F3]': status === 'not_started',
      'bg-[#FEF9C3]': status === 'started',
    }"
    class="flex items-center justify-center gap-[4px] py-[4px] px-[8px] h-[25px] min-w-[75px] max-w-[140px] rounded-[16px]"
  >
    <div
      :class="{
        'bg-[#15803D]': status === 'completed',
        'bg-[#BE185D]': status === 'not_started',
        'bg-[#CA8A04]': status === 'started',
      }"
      class="h-[8px] w-[8px] rounded-full"
    ></div>

    <span
      v-if="status === 'completed'"
      class="font-[400] text-[13px] text-[#15803D]"
    >
      Completed
    </span>

    <span
      v-else-if="status === 'not_started'"
      class="font-[400] text-[13px] text-[#BE185D]"
    >
      Not Started
    </span>

    <span
      v-else-if="status === 'started'"
      class="font-[400] text-[13px] text-[#CA8A04]"
    >
      In Progress
    </span>
  </div>
</template>
