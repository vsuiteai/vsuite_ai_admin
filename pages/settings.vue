<script setup lang="ts">
const route = useRoute("/settings");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});
route.meta.breadcrumb_bottom = "Settings";
</script>

<template>
  <div class="w-full bg-[#ffffff] py-[20px] mb-[24px]">
    <MicsUnderMaintenanceInpage />
  </div>
</template>
