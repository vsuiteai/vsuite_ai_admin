<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "17px",
  },
  height: {
    type: String,
    default: "17px",
  },
  color: {
    type: String,
    default: "#696F8C",
  },
});
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.81641 6L8.81641 10L12.8164 6"
      :stroke="color"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
