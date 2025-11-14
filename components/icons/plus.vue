<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "25px",
  },
  height: {
    type: String,
    default: "25px",
  },
  color: {
    type: String,
    default: "black",
  },
});
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 5V19"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.5 12H19.5"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
