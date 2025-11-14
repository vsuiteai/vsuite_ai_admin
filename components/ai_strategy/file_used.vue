<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";

withDefaults(
  defineProps<{
    client_files_used: ClientUploadedFile[] | null;
  }>(),
  {
    client_files_used: null,
  }
);
const filesController = useFilesController();

const selected_client_files = defineModel();

const local_id = uuidv4();
</script>

<template>
  <div
    v-if="client_files_used"
    class="flex gap-[20px] w-full max-w-full overflow-x-auto"
  >
    <template v-for="item in client_files_used" :key="item.file_id">
      <div class="flex flex-col gap-[8px]">
        <input
          v-model="selected_client_files"
          type="checkbox"
          :id="`${item.file_id}_${local_id}`"
          :value="item"
          class="hidden peer"
        />

        <label
          :for="`${item.file_id}_${local_id}`"
          class="w-[170px] h-[150px] bg-[#D9D9D9] rounded-[8px] flex items-center justify-center peer-checked:border peer-checked:border-red-600 hover:bg-gray-50 hover:cursor-pointer"
        >
          <component
            :is="filesController.getIcon(item.file_type)"
            width="30%"
            height="30%"
          ></component>
        </label>
        <div class="flex flex-col items-start gap-[4px]">
          <span class="font-[500] text-[12px]/[20px] text-[#474D66]">
            {{ parse_name(item.file_original_name) }}
          </span>

          <span class="font-[400] text-[12px]/[20px] text-[#696F8C]">
            Uploaded on: <br />
            {{ item.created_at ? formatDate(item.created_at) : "" }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
