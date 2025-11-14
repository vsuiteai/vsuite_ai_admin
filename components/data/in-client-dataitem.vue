<script setup lang="ts">
const filesController = useFilesController();

defineProps<{
  file: ClientUploadedFile;
}>();
</script>

<template>
  <div
    class="w-full border-[1px] border-[#EDEFF5] rounded-[6px] bg-[#FFFFFF] min-h-[70px] flex items-center justify-between px-[25px]"
  >
    <div class="flex items-center gap-[8px]">
      <component
        :is="filesController.getIcon(file.file_type)"
        class="w-[32px]"
      ></component>

      <div class="flex flex-col">
        <span class="font-[500] text-[14px]/[20px] text-[#474D66]">
          {{ file.file_original_name }}
        </span>
        <div class="flex gap-[16px] items-end">
          <span class="font-[400] text-[14px]/[20px] text-[#696F8C]">
            Uploaded on: {{ formatDate(file.created_at!) }}
          </span>
          <span class="font-[600] text-[14px]/[20px] text-[#15803D]">
            VALID
          </span>
        </div>
      </div>
    </div>

    <button disabled>
      <span class="font-[500] text-[14px]/[20px] underline text-[#014BAE]">
        View
      </span>
    </button>
  </div>
</template>
