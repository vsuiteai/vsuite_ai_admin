<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    :class="{
      'bg-[#1E1E23] rounded-[200px]': is_active,
      'bg-[unset]': !is_active,
    }"
    class="flex items-center gap-[12px] px-[18px] py-[14px] w-[240px] h-[50px]"
  >
    <div>
      <slot name="icon" />
    </div>
    <span class="tracking-[0.02em] uppercase text-[11px] font-[500]">
      {{ title }}
    </span>
  </div>
</template>
