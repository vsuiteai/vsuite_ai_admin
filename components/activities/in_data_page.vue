<script setup lang="ts">
import type { activity, resources } from "~/types/activities";

import admin from "./resource_icons/admin.vue";
import client from "./resource_icons/admin.vue";
import consultant from "./resource_icons/consultant.vue";
import file_upload from "./resource_icons/file_upload.vue";
import questionaire from "./resource_icons/questionaire.vue";
import strategy from "./resource_icons/strategy.vue";
import system from "./resource_icons/system.vue";

const activityLogController = useActivityLogController();

const activities = ref<activity[]>([]);

const get_activities = async () => {
  const activities_res = (await activityLogController.get_activities()) ?? null;

  if (activities_res) {
    activities.value = activities_res.activities;
  }
};

const images = {
  admin: admin,
  client: client,
  consultant: consultant,
  file_upload: file_upload,
  questionaire: questionaire,
  strategy: strategy,
  system: system,
} as const;

const getImage = (resource: resources) => {
  if (resource == "admin") {
    return images.admin;
  } else if (resource == "client") {
    return images.client;
  } else if (resource == "consultant") {
    return images.consultant;
  } else if (resource == "file") {
    return images.file_upload;
  } else if (resource == "questionaire") {
    return images.questionaire;
  } else if (resource == "strategy") {
    return images.strategy;
  } else if (resource == "system") {
    return images.consultant;
  }
};

onBeforeMount(async () => {
  await get_activities();
});
</script>

<template>
  <div
    class="w-full h-full bg-[#ffffff] border-[0.5px] border-[#E5E7EB] rounded-[16px] flex flex-col items-center"
  >
    <div class="w-full flex flex-col divide-y-[1px] divide-[#E5E7EB]">
      <div
        class="w-full flex flex-col items-start py-[16px] px-[20px] border-b border-b-[#E5E7EB]"
      >
        <span class="font-[500] text-[18px]/[24px] text-[#101840]">
          Recent Activity
        </span>
      </div>
      <div
        class="w-full flex flex-col items-center justify-center py-[8px] px-[16px] bg-[#FAFAFA] border-b border-b-[#E5E7EB]"
      >
        <form class="w-[90%]">
          <label for="default-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <div
              class="absolute inset-y-0 start-1 flex items-center ps-4 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-12 text-[14px]/[18px] h-[45px] text-[#AAAAAA] border border-[#E5E7EB] rounded-[8px] bg-gray-50 focus:ring-gray-500 focus:border-gray-500 outline-gray-400"
              placeholder="Search Client Name"
            />
          </div>
        </form>
      </div>
    </div>

    <div
      class="w-full h-full flex flex-col items-start py-[16px] px-[20px] border-b"
    >
      <ol class="relative border-s border-gray-200">
        <template v-for="(activity, index) in activities">
          <li
            :class="{
              'mb-10': index + 1 < activities.length,
            }"
            class="ms-6"
          >
            <span
              class="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8 ring-white"
            >
              <div class="rounded-full shadow-lg p-2">
                <component
                  :is="getImage(activity.target.resouce_type)"
                ></component>
              </div>
            </span>
            <div
              class="items-start justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-xs flex flex-col gap-[8px]"
            >
              <div class=" ">
                <div
                  v-html="
                    activityLogController.formatActivity(activity).message
                  "
                ></div>
              </div>
              <time class="mb-1 text-xs font-normal text-gray-400 sm:mb-0"
                >{{ activity?.formattedDate }} |
                {{ activity?.formattedTime }}</time
              >
            </div>
          </li>
        </template>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
