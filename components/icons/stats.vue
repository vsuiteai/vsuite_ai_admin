<script setup lang="ts">
const props = defineProps({
  width: {
    required: false,
    type: String,
    default: "14px",
  },
  height: {
    required: false,
    type: String,
    default: "14px",
  },
  trend_is_positive: {
    required: false,
    type: Boolean,
  },
});

const color = computed(() => {
  if (props.trend_is_positive) {
    return "#1DBF73";
  } else if (props.trend_is_positive === false) {
    return "#EF4444";
  }
  return "#9CA3AF";
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.0013 12.8333C10.2213 12.8333 12.8346 10.22 12.8346 6.99998C12.8346 3.77998 10.2213 1.16665 7.0013 1.16665C3.7813 1.16665 1.16797 3.77998 1.16797 6.99998C1.16797 10.22 3.7813 12.8333 7.0013 12.8333ZM7.0013 2.33331C9.57964 2.33331 11.668 4.42165 11.668 6.99998C11.668 9.57831 9.57964 11.6666 7.0013 11.6666C4.42297 11.6666 2.33464 9.57831 2.33464 6.99998C2.33464 4.42165 4.42297 2.33331 7.0013 2.33331ZM7.58464 6.99998H9.33463L7.0013 4.66665L4.66797 6.99998H6.41797V9.33331H7.58464V6.99998Z"
      :fill="color"
    />
  </svg>
</template>
