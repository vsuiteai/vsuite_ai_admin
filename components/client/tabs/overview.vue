<script setup lang="ts">
defineProps<{
  client_details: ClientDetail | null;
}>();
</script>

<template>
  <div v-if="client_details" class="w-full grid grid-cols-3 gap-4">
    <div class="flex w-full flex-col items-start gap-[24px]">
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Client's Name:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]">
          {{ client_details?.client_company_name }}
        </span>
      </div>
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Phone Number:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]">
          {{ client_details.client_contact_phone }}
        </span>
      </div>
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Location:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]"> </span>
      </div>
    </div>
    <div class="flex w-full flex-col items-start gap-[24px]">
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Email Address:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]">
          {{ client_details.client_contact_work_email }}
        </span>
      </div>
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Date Applied:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]"> </span>
      </div>
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Website:
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]"> </span>
      </div>
    </div>
    <div class="flex w-full flex-col items-start gap-[24px]">
      <div class="flex w-full gap-[4px] flex-col">
        <span class="font-[400] text-[14px]/[20px] text-[#667085]">
          Primary Contact
        </span>
        <span class="font-[500] text-[14px]/[20px] text-[#1A1A1D]">
          {{ client_details.client_contact_fullname }}({{
            client_details.client_contact_role
          }})
        </span>
      </div>
    </div>
  </div>
</template>
