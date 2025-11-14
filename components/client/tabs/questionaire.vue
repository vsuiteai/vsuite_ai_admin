<script setup lang="ts">
import Advisor_onboarding from "./questionaire/advisor_onboarding.vue";
import Ceo_onboarding from "./questionaire/ceo_onboarding.vue";
import type { Component } from "vue";

defineProps<{
  client_details: ClientDetail | null;
}>();

const clientController = useClientController();
const route = useRoute();

const uid = route.params.uid as string;

type form_types_generics = {
  component: Component;
  label: string;
  questionaire_entry: QuestionaireEntry | null;
};

const form_types = reactive<{
  client_onboarding_form: form_types_generics;
  advisior_onboarding_form: form_types_generics;
}>({
  client_onboarding_form: {
    component: Ceo_onboarding,
    label: "CEO Onboarding",
    questionaire_entry: null,
  },
  advisior_onboarding_form: {
    component: Advisor_onboarding,
    label: "Advisors Onboarding",
    questionaire_entry: null,
  },
});

type FormTypeTabKey = keyof typeof form_types;

const current_tab = ref<FormTypeTabKey>("client_onboarding_form");

const submissions = ref([]);

const get_current_tab = computed(() => {
  return unref(form_types[current_tab.value].component);
});

onBeforeMount(async () => {
  const res = await clientController.get_client_submissions(uid);
  // console.log(res);
  submissions.value = res?.submissions ? res?.submissions : [];

  if (submissions.value.length > 0) {
    (submissions.value ?? []).forEach((el: QuestionaireEntry) => {
      if ((el?.form_type ?? "") === "advisior_onboarding_form") {
        form_types.advisior_onboarding_form.questionaire_entry = el;
      }
      if ((el?.form_type ?? "") === "client_onboarding_form") {
        form_types.client_onboarding_form.questionaire_entry = el;
      }
    });
  }
});
</script>

<template>
  <!-- {{ submissions[0] }} -->
  <div class="flex flex-col item-start">
    <div class="flex item-start gap-[4px]">
      <template v-for="(value, key, index) of form_types" :key="key">
        <button
          @click="current_tab = key"
          :class="{
            'font-[500] text-[14px]/[20px] text-[#E10600] rounded-t-[8px] border-[1px] border-b-[1px] border-[#EDEFF5] bg-[#F9CDCC3D]':
              current_tab === key,
            'font-[300] text-[14px]/[20px] text-[#808080]': current_tab !== key,
          }"
          class="flex items-center py-[12px] px-[20px] gap-[8px]"
        >
          {{ value.label }}
        </button>
      </template>
    </div>
    <div
      class="flex flex-col items-start py-[24px] px-[32px] border-[1px] border-[#E5E7EB] rounded-b-[16px] rounded-tr-[16px]"
    >
      <component
        :is="get_current_tab"
        :questionaire_entry="form_types[current_tab].questionaire_entry"
      ></component>
    </div>
  </div>
</template>
