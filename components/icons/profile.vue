<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: "44px",
  },
  height: {
    type: String,
    default: "44px",
  },
});
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#F1F6FA" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M27.8932 15.7124C27.8932 18.9677 25.2538 21.6054 22.0002 21.6054C18.7449 21.6054 16.1055 18.9677 16.1055 15.7124C16.1055 12.4571 18.7449 9.81946 22.0002 9.81946C25.2538 9.81946 27.8932 12.4571 27.8932 15.7124Z"
      stroke="#696F8C"
      stroke-width="1.5"
      stroke-linecap="square"
    />
    <path
      d="M21.9999 25.6055C26.3417 25.5943 30.0334 27.5879 31.3904 31.8793C28.6552 33.5466 25.4357 34.1888 21.9999 34.1805C18.5641 34.1888 15.3445 33.5466 12.6094 31.8793C13.9679 27.5832 17.6534 25.5943 21.9999 25.6055Z"
      stroke="#696F8C"
      stroke-width="1.5"
      stroke-linecap="square"
    />
  </svg>
</template>
