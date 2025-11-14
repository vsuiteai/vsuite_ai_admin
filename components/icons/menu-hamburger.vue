<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "20px",
  },
  height: {
    type: String,
    default: "20px",
  },
  color: {
    type: String,
    default: "#1A1A1D",
  },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 5.83333H17.5"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M2.5 10H17.5"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M2.5 14.1667H17.5"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
