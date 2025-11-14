<script setup lang="ts">
import Activity_log from "~/components/client/tabs/activity_log.vue";
import Ai_strategies from "~/components/client/tabs/ai_strategies.vue";
import Consultant from "~/components/client/tabs/consultant.vue";
import Data from "~/components/client/tabs/data.vue";
import Overview from "~/components/client/tabs/overview.vue";
import Questionaire from "~/components/client/tabs/questionaire.vue";

const { user } = useUserSession();

const route = useRoute();
const uid = route.params.uid as string;

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated"],
});

const client_tabs = {
  overview_view: { label: "OVERVIEW", component: Overview },
  ai_strategies_view: {
    label: "vSuite STRATEGIES",
    component: Ai_strategies,
  },
  data_view: { label: "DATA", component: Data },
  consultant_view: { label: "CONSULTANTS", component: Consultant },
  questionaire_view: { label: "QUESTIONAIRE", component: Questionaire },
  activity_log_view: {
    label: "ACTIVITY LOG",
    component: Activity_log,
  },
} as const; // makes keys literal types

type ClientTabKey = keyof typeof client_tabs;

const clientController = useClientController();

const client = ref<ClientDetail | null>(null);
const current_tab = ref<ClientTabKey>("overview_view");
const showRunStrategyModal = ref(false);

const computed_client_tabs = computed(() => {
  if (user.value && (user.value?.category ?? "") === "admin") {
    return client_tabs;
  } else {
    const { consultant_view, ...rest } = client_tabs;
    return rest;
  }
});

const get_current_tab = computed(() => {
  // return client_tabs[current_tab.value].component;
  return unref(client_tabs[current_tab.value].component);
});

watch(client, (new_val) => {
  if (new_val) {
    route.meta.breadcrumb_bottom = new_val.client_company_name.toUpperCase();
  }
});

onBeforeMount(async () => {
  const res = await clientController.get_client(uid);
  // console.log(res);
  client.value = res?.client ? res.client : null;
});
</script>

<template>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[22px] px-[40px]"
  >
    <div class="w-full flex justify-between items-center">
      <div>
        <h3 class="text-[#101840] text-[18px] font-[500]">Client Profile</h3>
      </div>
    </div>
  </div>

  <div
    class="w-full flex flex-col gap-[20px] bg-[#ffffff] border-[1px] border-t-0 rounded-b-[12px] border-[#E5E7EB] py-[32px] px-[40px]"
  >
    <div class="flex items-start justify-between w-full py-[32px]">
      <!-- head -->
      <div class="flex items-start gap-[10px]">
        <div class="w-[80px] h-[80px] bg-[#4F46E5] rounded-full"></div>
        <div class="flex flex-col items-start gap-[9px]">
          <div class="flex flex-col items-start gap-[2px]">
            <span class="font-[500] text-[16px]/[24px] text-[#1A1A1D]">
              {{ client?.client_company_name }}
            </span>
            <span class="font-[400] text-[15px]/[20px] text-[#696F8C]">
              {{ client?.client_contact_work_email }}
            </span>
          </div>

          <ClientStatus
            v-if="typeof client?.status === 'boolean'"
            :status="client?.status!"
          />
        </div>
      </div>
      <div class="flex gap-[12px]">
        <button
          disabled
          class="flex items-center justify-center h-[44px] w-[44px] bg-[#FFFFFF] rounded-full border-[1px] border-[#EDEFF5]"
        >
          <icons-horizontal-dot />
        </button>
        <button
          @click="showRunStrategyModal = !showRunStrategyModal"
          :disabled="!client"
          class="flex items-center gap-[8px] p-[16px] h-[44px] bg-[#E10600] rounded-[200px]"
        >
          <span class="font-[500] text-[15px] text-[#FFFFFF]">
            Run Strategy
          </span>
        </button>
      </div>
    </div>

    <div class="flex items-start w-full border-b-[1px] border-b-[#E5E7EB]">
      <template v-for="(value, key, index) in computed_client_tabs">
        <button
          :disabled="!client"
          @click="current_tab = key"
          class="z-[5] h-[45px] min-w-[150px] flex justify-center items-start p-[10px] relative hover:cursor-pointer"
        >
          <span
            :class="{
              'text-[#E10600]': key === current_tab,
              'text-[#808080]': key !== current_tab,
            }"
            class="font-[500] text-[14px]/[18px]"
          >
            {{ value.label }}
          </span>
          <span
            v-if="key === current_tab"
            class="absolute left-0 bottom-0 translate-y-[60%] h-[2px] w-full bg-red-600"
          ></span>
        </button>
      </template>
    </div>

    <section class="w-full mt-[12px]">
      <component :is="get_current_tab" :client_details="client"></component>
    </section>
  </div>

  <ClientGeneralRerun
    @close_modal="showRunStrategyModal = !showRunStrategyModal"
    v-if="client && showRunStrategyModal"
    :client_details="client"
  />
</template>
