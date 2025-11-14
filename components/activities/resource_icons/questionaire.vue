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
    default: "#000000",
  },
});
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19.002 21V15M21.0303 17L19.0303 15L17.0303 17M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>

  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    mirror-in-rtl="true"
    :fill="color"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        :fill="color"
        d="M19 0H5C3.9 0 3 .9 3 2v20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 21.5c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-19c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v19z"
      ></path>
      <path
        :fill="color"
        d="M10 10H8c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1zM16 16H8c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1zM16 6h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1zM16 10h-2c-.55 0-1-.45-1-1s.45-1 1-1h2c.55 0 1 .45 1 1s-.45 1-1 1zM16 20H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z"
      ></path>
    </g>
  </svg>
</template>
