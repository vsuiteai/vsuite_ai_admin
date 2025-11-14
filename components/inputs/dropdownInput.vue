<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  options: {
    type: Array as () => { value: string; label: string }[],
    required: true,
  },
  error_color_class: {
    type: String,
    default: "text-[#EAEAEA]",
  },
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="flex flex-col gap-[8px] w-full">
    <label class="font-[400] text-[14px] text-[#EAEAEA]">
      {{ props.label }}
    </label>

    <div class="flex flex-col gap-[4px] w-full">
      <select
        v-model="value"
        class="w-full bg-[#1C1C1E] border-[1px] border-[#4A1C1C] rounded-[8px] py-[8px] px-[16px] text-[#999999] text-[14px] outline-none"
      >
        <option value="" disabled>Select {{ props.label }}</option>
        <option
          v-for="option in props.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <span :class="error_color_class" class="font-[400] text-[12px] self-end">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
