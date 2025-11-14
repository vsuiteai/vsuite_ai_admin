<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  query_result: {
    type: String,
    required: true,
  },
});

const is_visible = ref(false);
</script>

<template>
  <section
    :class="{
      'border-[#E1060066]': is_visible,
      'border-[#F1F6FA]': !is_visible,
    }"
    class="flex flex-col gap-[24px] p-[20px] w-full border rounded-[4px]"
  >
    <button
      :disabled="(query_result ?? '') === ''"
      @click="is_visible = !is_visible"
      class="flex justify-between items-center w-full min-h-[50px]"
    >
      <span
        :class="{
          'text-[#E10600]': is_visible,
          'text-[#1A1A1D]': !is_visible,
        }"
        class="font-[500] text-[14px]/[18px]"
      >
        {{ label }}
      </span>
      <IconsChevronDown
        :class="{
          'rotate-180': is_visible,
        }"
      />
    </button>
    <div v-if="is_visible" class="flex flex-col gap-[16px]">
      <span class="font-[500] text-[18px] text-[#1A1A1D]">
        vSuite Response
      </span>

      <section
        class="flex flex-col gap-[24px] w-full"
        v-html="query_result"
      ></section>
      <!-- <div class="flex flex-col gap-[24px]">
        <section class="flex flex-col gap-[16px] items-start">
          <p class="font-[500] text-[14px] text-[#1A1A1D]">
            {section_no} {capitalized_section_title}
          </p>

          <div class="w-full overflow-x-auto">
            <table class="w-full border border-b-0">
              <thead>
                <tr
                  class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600"
                >
                  <th
                    class="border border-[#EDEFF5] px-[16px] py-[12px] font-[500] text-[14px]"
                  >
                    {col_header}
                  </th>
                  <th
                    class="border border-[#EDEFF5] px-[16px] py-[12px] font-[500] text-[14px]"
                  >
                    {col_header}
                  </th>
                  <th
                    class="border border-[#EDEFF5] px-[16px] py-[12px] font-[500] text-[14px]"
                  >
                    {col_header}
                  </th>
                  <th
                    class="border border-[#EDEFF5] px-[16px] py-[12px] font-[500] text-[14px]"
                  >
                    {col_header}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                <tr class="text-gray-700">
                  <td class="px-4 py-3 border border-[#EDEFF5]">
                    <div class="flex items-center text-sm">
                      <p class="text-xs text-gray-600">{row_text}</p>
                    </div>
                  </td>
                  <td class="px-4 py-3 border border-[#EDEFF5]">
                    <div class="flex items-center text-sm">
                      <p class="text-xs text-gray-600">{row_text}</p>
                    </div>
                  </td>
                  <td class="px-4 py-3 border border-[#EDEFF5]">
                    <div class="flex items-center text-sm">
                      <p class="text-xs text-gray-600">{row_text}</p>
                    </div>
                  </td>
                  <td class="px-4 py-3 border border-[#EDEFF5]">
                    <div class="flex items-center text-sm">
                      <p class="text-xs text-gray-600">{row_text}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-full">
            <ul class="list-disc list-inside">
              <li class="my-[8px] font-[400] text-[14px] text-[#1A1A1D]">
                BSA IP Composite Score (80% MC + 20% FF): 4.20
              </li>
              <li class="my-[8px] font-[400] text-[14px] text-[#1A1A1D]">
                BSA IP Composite Score (80% MC + 20% FF): 4.20
              </li>
            </ul>
          </div>
          <p class="font-[400] text-[14px] text-[#1A1A1D]">
            No Direct Contradiction detected between the multiple-choice answers
            and the free-form comments.
          </p>
        </section>
      </div> -->
    </div>
  </section>
</template>
