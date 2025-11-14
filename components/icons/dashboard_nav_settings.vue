<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "22px",
  },
  height: {
    type: String,
    default: "22px",
  },
  color: {
    type: String,
  },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.0417 2.26752L21.0834 10.9999L16.0417 19.7324H5.95841L0.916748 10.9999L5.95841 2.26752H16.0417ZM14.9833 4.10085H7.01689L3.0337 10.9999L7.01689 17.899H14.9833L18.9665 10.9999L14.9833 4.10085ZM7.91456 7.489L9.50225 6.57233L14.0856 14.5109L12.4979 15.4275L7.91456 7.489Z"
      :fill="color"
    />
  </svg>
</template>
