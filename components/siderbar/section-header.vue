<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="hidden lg:flex items-center gap-[10px] px-[32px] pt-[12px] pb-[12px] w-full"
  >
    <span class="tracking-[0.02em] uppercase neutral text-[11px] font-[500]">{{
      title
    }}</span>
  </div>
</template>
