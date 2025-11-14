<script setup lang="ts">
const route = useRoute("/help-and-support");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Help and Support";
</script>

<template>
  <div class="w-full bg-[#ffffff] py-[20px] mb-[24px]">
    <MicsUnderMaintenanceInpage />
  </div>
</template>
