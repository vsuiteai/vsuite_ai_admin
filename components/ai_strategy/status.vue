<script setup lang="ts">
withDefaults(
  defineProps<{
    status: QueryProcessStatus | null;
  }>(),
  {
    status: null,
  }
);
</script>

<template>
  <div
    :class="{
      'bg-[#DCFCE7]': status === 'completed',
      'bg-[#FCE7F3]': status === 'failed',
      'bg-[#FDE68A]': status === 'processing',
    }"
    class="flex items-center justify-center gap-[4px] py-[4px] px-[8px] h-[25px] min-w-[75px] rounded-[16px]"
  >
    <span
      :class="{
        'text-[#15803D]': status === 'completed',
        'text-[#BE185D]': status === 'failed',
        'text-[#92400E]': status === 'processing',
      }"
      class="font-[400] text-[13px] uppercase"
    >
      {{ status }}
    </span>
  </div>
</template>
