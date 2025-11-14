<script setup lang="ts">
defineProps<{
  client_details: ClientDetail | null;
}>();

const showSelectConsultantModal = ref(false);
</script>

<template>
  <!-- {{ client_details?.consultants }} -->
  <div class="w-full grid grid-cols-3 gap-4">
    <template v-if="(client_details?.consultants ?? []).length > 0">
      <template v-for="consultant in client_details?.consultants">
        <div
          class="w-full p-[32px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[8px]"
        >
          <div class="flex w-full flex-col items-center gap-[24px]">
            <div class="flex w-full flex-col gap-[8px] items-center">
              <div class="w-[80px] h-[80px] bg-[#C4C4C4] rounded-full"></div>
              <div class="flex flex-col items-center gap-[4px]">
                <span class="font-[400] text-[20px]/[26px] text-[#000000]">
                  {{ consultant.consultant_first_name }}
                  {{ consultant.consultant_last_name }}
                </span>
                <span class="font-[400] text-[12px]/[16px] text-[#808080]">
                  {{ consultant.consultant_role }}
                </span>
              </div>
            </div>
            <div
              class="grid w-full grid-cols-2 divide-x-[1px] divide-[#EFEFEF]"
            >
              <div class="flex flex-col gap-[8px] items-center">
                <span
                  class="font-[400] text-[20px]/[26px] items-center text-[#000000]"
                >
                  7
                </span>
                <span
                  class="font-[400] text-[13px]/[17px] items-center text-[#808080]"
                >
                  Active Clients
                </span>
              </div>
              <div class="flex flex-col gap-[8px] items-center">
                <span
                  class="font-[400] text-[20px]/[26px] items-center text-[#000000]"
                >
                  40
                </span>
                <span
                  class="font-[400] text-[13px]/[17px] items-center text-[#808080]"
                >
                  Total Clients
                </span>
              </div>
            </div>

            <div class="flex w-full flex-col items-center gap-[16px]">
              <button
                class="flex items-center justify-center bg-[#000000] rounded-[200px] w-full py-[12px]"
              >
                <span class="font-[400] text-[15px]/[20px] text-[#ffffff]">
                  View
                </span>
              </button>

              <span class="font-[400] text-[10px]/[12px] text-[#808080]">
                ADDED BY <span class="text-[#354492]"> HARRY </span> ON July
                26th, 2025.
              </span>
            </div>
          </div>
        </div>
      </template>
    </template>

    <button
      @click="showSelectConsultantModal = !showSelectConsultantModal"
      class="w-full h-full p-[32px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[8px]"
    >
      <div
        class="flex w-full h-full flex-col items-center justify-center gap-[18px]"
      >
        <div
          class="flex w-full h-full flex-col items-center justify-center gap-[18px]"
        >
          <div
            class="w-[50px] h-[50px] bg-[#AAAAAA] rounded-full flex items-center justify-center"
          >
            <IconsPlus />
          </div>

          <span class="font-[400] text-[14px]/[18px] text-[#000000]">
            Add Consultant
          </span>
        </div>
      </div>
    </button>
  </div>

  <ConsultantInClientSelector
    @close_modal="showSelectConsultantModal = !showSelectConsultantModal"
    v-if="client_details && showSelectConsultantModal"
    :client_details="client_details"
  />
</template>
