<script setup lang="ts">
defineProps<{
  questionaire_entry: QuestionaireEntry;
}>();

const format_answer = (answer: string | string[] | null) => {
  if (!answer) return "";

  if (typeof answer === "string") return answer;

  if (typeof answer === "object") return answer.join(", ");
};
</script>
<template>
  <div class="w-full flex items-start justify-between h-[70px]">
    <span class="font-[500] text-[16px]/[21px] font-[#000000]">
      Advisor Onboarding
    </span>
  </div>

  <div class="w-full relative max-h-[600px] overflow-y-auto">
    <!-- <div class="border-l-2 border-black h-full absolute left-[50px]"></div> -->

    <template
      v-for="(answers, index) in questionaire_entry.answers"
      :key="index"
    >
      <div class="flex items-start gap-[24px] w-full gap-4 w-full mb-[20px]">
        <div class="flex flex-col items-center w-[120px] min-h-[120px]">
          <div
            class="w-[48px] h-[48px] bg-[#F9CDCC3D] rounded-[50px] flex items-center justify-center bg-[#F9CDCC3D]"
          >
            <span class="font-[500] text-[16px]/[26px] text-[#000000]">
              {{ index + 1 }}
            </span>
          </div>
        </div>
        <div
          class="p-[20px] border-[1px] border-[#EDEFF5] rounded-[8px] bg-[#F9CDCC3D] flex items-center w-full"
        >
          <div class="w-full flex flex-col items-start gap-[16px]">
            <span class="font-[400] text-[14px]/[20px] text-[#000000]">
              {{ answers.question }}
            </span>
            <div
              class="flex items-center justify-center py-[8px] w-full border-b-[1px] border-[#E10600]"
            >
              <span class="font-[500] text-[24px]/[32px] text-[#1A1A1D]">
                {{ format_answer(answers.answer) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
