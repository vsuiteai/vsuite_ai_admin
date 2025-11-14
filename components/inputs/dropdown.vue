<script setup lang="ts">
import { initDropdowns } from "flowbite";
import { v4 as uuidv4 } from "uuid";

const dropdown_id = uuidv4();

type option = {
  key: null | boolean;
  value: string;
};

const props = withDefaults(
  defineProps<{
    options: option[];
    is_disabled?: boolean;
  }>(),
  {
    is_disabled: false,
  }
);

const model_value = defineModel();

const dropdwon_button = ref<HTMLElement | null>(null);

onMounted(() => {
  initDropdowns();
});

const selected_option = computed(() => {
  const selected_opt = props.options.find((el) => el.key === model_value.value);

  return selected_opt?.value;
});
</script>

<template>
  <button
    :disabled="is_disabled"
    ref="dropdwon_button"
    :data-dropdown-toggle="dropdown_id"
    class="h-[40px] flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#ffffff] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)] hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300"
    type="button"
  >
    <span class="font-[500] text-[14px] text-[#474D66]">
      {{ selected_option }}</span
    >
    <svg
      class="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    :id="dropdown_id"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
      <template v-for="(value, name, index) in options">
        <li>
          <button
            :class="{
              'bg-gray-100': selected_option === value.value,
              'bg-white': selected_option !== value.value,
            }"
            @click="
              () => {
                model_value = value.key;
                dropdwon_button?.click();
              }
            "
            class="flex items-center justify-start px-[12px] py-[12px] w-full hover:bg-gray-100"
          >
            <span class="text-[#474D66] font-[500] text-[14px]/[20px]">
              {{ value.value }}
            </span>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>
