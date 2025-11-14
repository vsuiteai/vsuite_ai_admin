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
  error_color_class: {
    type: String,
    default: "text-[#EAEAEA]",
  },
});

const { value, errorMessage } = useField(() => props.name);

const is_visible = ref(false);

const input_type = computed(() => {
  if (is_visible.value) {
    return "text";
  } else {
    return "password";
  }
});
</script>

<template>
  <div class="flex flex-col gap-[8px] w-full">
    <label class="font-[400] text-[14px] text-[#EAEAEA]">
      {{ props.label }}
    </label>

    <div class="flex flex-col gap-[4px] w-full">
      <div class="w-full relative min-h-[40px]">
        <input
          v-model="value"
          :type="input_type"
          class="w-full absolute top-0 left-0 bg-[#1C1C1E] border-[1px] border-[#4A1C1C] rounded-[8px] py-[8px] px-[16px] text-[#999999] text-[14px] outline-none"
        />

        <div class="visor" @click="is_visible = !is_visible">
          <template v-if="is_visible"><IconsEyeOpen /></template>
          <template v-else><IconsEyeClose /></template>
        </div>
      </div>
      <span :class="error_color_class" class="font-[400] text-[12px] self-end">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<style>
.visor {
  position: absolute;
  top: 50%;
  right: 16px;

  translate: 0 -50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
