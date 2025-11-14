<script setup lang="ts">
import { parent_routes } from "~/config/parent_routes";

const route = useRoute();
const consultant_id = route.params.uid as string;

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});

route.meta.breadcrumb_bottom = "Consultants";

const current_view = ref<"view_consultant" | "edit_consultant">(
  "view_consultant"
);
</script>

<template>
  <template v-if="current_view === 'view_consultant'">
    <ConsultantConsultantPagePartsViewConsultant
      :consultant_id="consultant_id"
      @edit_consultant="current_view = 'edit_consultant'"
    />
  </template>

  <template v-if="current_view === 'edit_consultant'">
    <ConsultantConsultantPagePartsEditConsultant
      :consultant_id="consultant_id"
      @view_consultant="current_view = 'view_consultant'"
    />
  </template>
</template>
