<script setup lang="ts">
import { parent_routes } from "~/config/parent_routes";

const emits = defineEmits(["edit_consultant"]);
const props = defineProps({
  consultant_id: {
    type: String,
    required: true,
  },
});
const consultantController = useConsultantController();

const consultant = ref<ConsultantDetail | null>(null);

onBeforeMount(async () => {
  const res = await consultantController.get_consultant(props.consultant_id);
  // console.log(res);
  consultant.value = res?.consultant ? res.consultant : null;
});
</script>

<template>
  <div class="w-full flex flex-col gap-[24px]">
    <div class="w-full">
      <div
        class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[30px]"
      >
        <div class="w-full flex justify-between items-center">
          <NuxtLink :to="parent_routes.web_app.consultants.path">
            <div class="flex items-center justify-center gap-[8px]">
              <div class="w-[24px] h-[24px] flex items-center justify-center">
                <IconsChevronDown class="rotate-[90deg]" />
              </div>
              <div
                class="font-[500] text-[18px] text-[#101840] h-full flex items-center justify-center"
              >
                <span> Consultant's Profile </span>
              </div>
            </div>
          </NuxtLink>
          <div class="flex items-center gap-[8px]"></div>
        </div>
      </div>
      <div
        class="w-full flex flex-col gap-[40px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[30px] px-[30px]"
      >
        <!-- {{ consultant }} -->
        <div class="w-full flex justify-between items-start">
          <div class="flex gap-[36px] items-start">
            <div class="flex gap-[10px] items-start">
              <div
                class="w-[72px] h-[72px] rounded-full bg-[#4F46E5] flex items-center justify-center"
              >
                <span class="uppercase font-[600] text-[30px] text-[#ffffff]">
                  {{
                    getInitials(
                      consultant?.consultant_first_name,
                      consultant?.consultant_last_name
                    )
                  }}
                </span>
              </div>
              <div class="flex flex-col items-start gap-[8px]">
                <div class="flex flex-col items-start gap-[2px]">
                  <span class="font-[500] text-[16px]/[24px] text-[#1A1A1D]">
                    {{ consultant?.consultant_first_name }}
                    {{ consultant?.consultant_last_name }}
                  </span>
                  <span class="font-[400] text-[15px]/[20px] text-[#696F8C]">
                    {{ consultant?.consultant_email }}
                  </span>
                </div>

                <ClientStatus
                  v-if="typeof consultant?.is_active === 'boolean'"
                  :status="consultant?.is_active"
                />
              </div>
            </div>
            <div class="flex flex-col gap-[16px]">
              <div
                class="grid grid-cols-[110px_minmax(100px,_1fr)] gap-y-[10px]"
              >
                <div class="text-[14px] text-[#696F8C]">Join Date</div>
                <div class="text-[14px] font-[500] text-[#474D66]">
                  {{ consultant?.consultant_created_at }}
                </div>
                <div class="text-[14px] text-[#696F8C]">Permission</div>
                <div class="text-[14px] font-[500] text-[#474D66]">---</div>
                <div class="text-[14px] text-[#696F8C]">Work Email</div>
                <div class="text-[14px] font-[500] text-[#474D66]">
                  {{ consultant?.consultant_email }}
                </div>
                <div class="text-[14px] text-[#696F8C]">Location</div>
                <div class="text-[14px] font-[500] text-[#474D66]">
                  {{ consultant?.consultant_home_address }}
                </div>
              </div>
            </div>
          </div>
          <button
            @click="$emit('edit_consultant')"
            class="flex items-center gap-[8px] p-[16px] h-[44px] bg-[#1A1A1D] rounded-[200px]"
          >
            <IconsUserEdit />
            <span class="font-[500] text-[15px] text-[#FFFFFF]">
              Edit Profile
            </span>
          </button>
        </div>
        <div class="w-full flex flex-col gap-[16px]">
          <h4 class="font-[600] text-[16px] text-[#474D66]">
            Assigned Clients
          </h4>

          <div class="w-full flex flex-col gap-[16px]">
            <template v-for="client in consultant?.Clients">
              <div
                class="w-full p-[16px] border-[1px] border-[#EDEFF5] rounded-[6px] flex items-center justify-between min-h-[40px]"
              >
                <div class="flex gap-[10px] items-start">
                  <div
                    class="w-[35px] h-[35px] rounded-full bg-[#4F46E5] flex items-center justify-center"
                  >
                    <span
                      class="uppercase font-[600] text-[15px] text-[#ffffff]"
                    >
                      {{ getInitials(client?.client_company_name) }}
                    </span>
                  </div>
                  <div class="flex flex-col items-start gap-[8px]">
                    <div class="flex flex-col items-start gap-[2px]">
                      <span
                        class="font-[500] text-[14px]/[20px] text-[#101840]"
                      >
                        {{ client.client_company_name }}
                      </span>
                      <span
                        class="font-[400] text-[12px]/[16px] text-[#696F8C]"
                      >
                        Last Activity:
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex gap-[16px]">
                  <NuxtLink
                    :to="`${parent_routes.web_app.clients.path}/${client.client_uid}`"
                    class="text-[#014BAE] underline font-[500] text-[14px]"
                  >
                    View
                  </NuxtLink>
                  <button
                    disabled
                    class="text-[#15803D] underline font-[500] text-[14px]"
                  >
                    Reassign
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="w-full flex justify-end">
          <button
            disabled
            class="flex items-center gap-[8px] p-[16px] h-[44px] bg-[#E10600] rounded-[200px]"
          >
            <IconsUserRemove />
            <span class="font-[500] text-[15px] text-[#FFFFFF]">
              Deactivate Consultant
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
