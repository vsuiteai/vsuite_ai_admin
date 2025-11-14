<script setup lang="ts">
import { initModals } from "flowbite";
import { parent_routes } from "~/config/parent_routes";

const route = useRoute("/consultants");

definePageMeta({
  layout: "authenticated",
  breadcrumb_top: "",
  breadcrumb_bottom: "",
  middleware: ["authenticated", "consultant-block"],
});
route.meta.breadcrumb_bottom = "Consultants";

const consultantController = useConsultantController();
const activityLogController = useActivityLogController();

const consultants = ref<ConsultantDetail[]>([]);
const pagination = ref<Pagination | null>(null);
const client_loading_error = ref(false);
const loading_consultants = ref(false);

const search_term = ref(null);

const filter_status = ref(null);
const filter_status_opt = ref([
  {
    key: null,
    value: "All Status",
  },
  {
    key: true,
    value: "Active",
  },
  {
    key: false,
    value: "InActive",
  },
]);

const filter_date_from = ref(null);
const filter_date_to = ref(null);

const currentPageNumber = ref<number>(1);

const adding_new_consultant = ref(false);
const adding_new_consultant_error = ref("");
const adding_new_consultant_success = ref(false);
const new_consultant_data = reactive({
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  home_address: "",
  password: "",
  confirm_password: "",
});

watch(adding_new_consultant_success, async (new_val) => {
  setTimeout(async () => {
    const btn = document.querySelector(
      '[data-modal-hide="new_consultant_modal"]'
    ) as HTMLButtonElement;
    if (btn) {
      btn.click();

      await fetch_consultants();
    }
  }, 2000);
});

watch(currentPageNumber, async (new_val) => {
  await fetch_consultants();
});

watch(search_term, async (new_val) => {
  if (new_val) {
    setTimeout(async () => {
      await fetch_consultants();
    }, 1500);
  }
});

watch(filter_status, async (new_val) => {
  await fetch_consultants();
});

const next_page = async (last: boolean) => {
  if (last) {
    const lastPage = pagination.value?.totalPages ?? false;

    if (!lastPage) return;

    currentPageNumber.value = lastPage;
  } else {
    const hasNext = pagination.value?.hasNext ?? false;
    const currentPage = pagination.value?.currentPage ?? false;

    if (!hasNext || !currentPage) return;

    currentPageNumber.value = currentPage + 1;
  }
};

const prev_page = async (first: boolean) => {
  if (first) {
    currentPageNumber.value = 1;
  } else {
    const hasPrev = pagination.value?.hasPrev ?? false;
    const currentPage = pagination.value?.currentPage ?? false;

    if (!hasPrev || !currentPage || (currentPage && currentPage === 1)) return;

    currentPageNumber.value = currentPage - 1;
  }
};

const fetch_consultants = async () => {
  try {
    if (loading_consultants.value) return;
    if (typeof currentPageNumber.value !== "number") return;

    loading_consultants.value = true;

    const res =
      (await consultantController.get_consultants(
        currentPageNumber.value,
        search_term.value,
        filter_status.value,
        filter_date_from.value,
        filter_date_to.value
      )) ?? false;

    if (!res) {
      throw new Error("Error fetching client data");
    }

    console.log(res);

    consultants.value = res.consultants;
    pagination.value = res.pagination;
  } catch (error) {
    client_loading_error.value = true;
  }

  loading_consultants.value = false;
};

const add_new_consultant = async () => {
  try {
    if (adding_new_consultant.value) return;

    adding_new_consultant_success.value = false;
    adding_new_consultant_error.value = "";

    if (new_consultant_data.password !== new_consultant_data.confirm_password) {
      throw new Error("Password Must Match");
    }

    const consultant_data = {
      consultant_first_name: new_consultant_data.first_name,
      consultant_last_name: new_consultant_data.last_name,

      consultant_role: new_consultant_data.role,

      consultant_home_address: new_consultant_data.home_address,
      consultant_email: new_consultant_data.email,
      consultant_password: new_consultant_data.password,
      is_active: true,
    };

    await consultantController.create_consultant(consultant_data);

    adding_new_consultant_success.value = true;
  } catch (error: any) {
    const message = error?.message || "An unknown error occurred";

    adding_new_consultant_error.value = error.message;
  }
  adding_new_consultant.value = false;
};

onMounted(async () => {
  await fetch_consultants();
  initModals();
});
</script>

<template>
  <div class="w-full bg-[#ffffff] py-[20px] mb-[24px]">
    <div class="flex justify-between items-center">
      <div class="flex gap-[8px]">
        <span class="font-[500] text-[16px] text-[#1A1A1D]">Consultants </span>
      </div>

      <div
        class="flex items-center gap-[8px] bg-[#F9FAFC] border-[1px] border-[#EDEFF5] rounded-[6px] px-[12px] py-[6px]"
      >
        <span
          class="font-[400] text-[16px]/[24px] flex items-center text-[#1A1A1D]"
        >
          Filters:
        </span>
        <div class="flex items-center gap-[8px]">
          <InputsDropdown
            :is_disabled="true"
            v-model="filter_status"
            :options="filter_status_opt"
          />

          <button
            disabled
            class="flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#ffffff] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)]"
          >
            <span class="font-[500] text-[14px] text-[#474D66]">
              By No of Assigned Clients
            </span>
            <IconsChevronDown />
          </button>
          <button
            disabled
            class="flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#ffffff] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)]"
          >
            <span class="font-[500] text-[14px] text-[#474D66]">
              By Last Activity
            </span>
            <IconsChevronDown />
          </button>
          <button
            disabled
            class="flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#808080] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)]"
          >
            <span class="font-[500] text-[14px]/[20px] text-[#FFFFFF]">
              Reset Filter
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[20px]"
  >
    <div class="w-full flex justify-between items-center">
      <form class="">
        <label
          for="clients_search_term"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >Search</label
        >
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
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
            v-model="search_term"
            type="search"
            id="clients_search_term"
            class="block min-w-[330px] w-full h-[42px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 outline-gray-500"
            placeholder="Search Consultant Name or Email"
            required
          />
        </div>
      </form>

      <div class="flex items-center gap-[8px]">
        <button
          data-modal-target="new_consultant_modal"
          data-modal-toggle="new_consultant_modal"
          class="flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#E10600] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)]"
        >
          <IconsPlus color="white" />
          <span class="font-[500] text-[14px]/[20px] text-[#FFFFFF]">
            Add New Consultant
          </span>
        </button>
      </div>
    </div>
  </div>
  <div
    class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[16px] px-[20px]"
  >
    <div class="flex flex-col items-end gap-[16px] w-full">
      <div class="w-full relative overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-700 uppercase bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB] dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                CONSULTANT'S NAME
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                EMAIL ADDRESS
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                STATUS
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                NO. OF ASSIGNED CLIENTS
              </th>
              <th
                scope="col"
                class="px-[20px] py-[16px] font-[500] text-[13px] text-[#1A1A1D] uppercase"
              >
                LAST ACTIVITY
              </th>
            </tr>
          </thead>
          <template v-if="(consultants ?? []).length > 0">
            <tbody>
              <tr
                v-for="(cl, index) in consultants"
                class="bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB]"
              >
                <td class="px-[20px] py-[23px]">
                  <NuxtLink
                    :to="`${parent_routes.web_app.consultants.path}/${cl.consultant_id}`"
                  >
                    <div
                      class="grid grid-cols-[40px_minmax(150px,_1fr)] items-center"
                    >
                      <div
                        class="h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                      >
                        <span
                          class="uppercase font-[600] text-[12px] text-[#ffffff]"
                        >
                          NT
                        </span>
                      </div>
                      <span class="font-[500] text-[14px] text-[#000000]">
                        {{ cl.consultant_first_name }}
                      </span>
                    </div>
                  </NuxtLink>
                </td>
                <td class="px-[20px] py-[23px]">
                  <span
                    class="font-[400] text-[13px] text-[#667085] text-center"
                  >
                    {{ cl.consultant_email }}
                  </span>
                </td>
                <td class="px-[20px] py-[23px]">
                  <ClientStatus :status="cl.is_active!" />
                </td>
                <td class="px-[20px] py-[23px]">
                  <div class="flex items-center">
                    <template v-if="(cl?.Clients ?? []).length > 0">
                      <NuxtLink
                        :to="`${parent_routes.web_app.clients.path}/${client.client_uid}`"
                        v-for="(client, client_index) in cl.Clients"
                        :style="{
                          transform: `translateX(-${client_index * 15}px)`, // multiply index by 7px
                        }"
                        class="h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center border border-gray-400 hover:z-[10] hover:cursor-pointer"
                      >
                        <span
                          class="uppercase font-[600] text-[12px] text-[#ffffff]"
                        >
                          {{ getInitials(client.client_company_name) }}
                        </span>
                      </NuxtLink>
                    </template>
                    <template v-else> <p>---</p></template>
                    <!-- <div
                      class="translate-x-[-7px] h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                    >
                      <span
                        class="uppercase font-[600] text-[12px] text-[#ffffff]"
                      >
                        NT
                      </span>
                    </div>
                    <div
                      class="translate-x-[-14px] h-[32px] w-[32px] bg-[#4F46E5] rounded-full flex items-center justify-center"
                    >
                      <span
                        class="uppercase font-[600] text-[12px] text-[#ffffff]"
                      >
                        NT
                      </span>
                    </div> -->
                  </div>
                </td>
                <td class="px-[20px] py-[23px]">
                  <span
                    class="font-[400] text-[13px] text-[#667085] text-center"
                  >
                    {{ activityLogController.parse_date(cl.last_activity!) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-else>
            <tr class="bg-[#ffffff] border-b-[1px] border-b-[#E5E7EB]">
              <td class="px-[20px] py-[23px]">
                <p>No consultant found</p>
              </td>
            </tr>
          </template>
        </table>
      </div>
      <div class="w-full flex justify-end">
        <!-- pagination -->

        <!-- {{ pagination }} -->
        <nav class="flex gap-[8px]">
          <button
            @click="prev_page(true)"
            class="flex items-center justify-center py-[8px] px-[16px] gap-[10px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[4px] h-[32px]"
          >
            <span class="font-[500] text-[12px] text-[#000000]"> First </span>
          </button>
          <div class="flex gap-[2px] items-center justify-center">
            <button
              @click="prev_page(false)"
              :disabled="!pagination?.hasPrev"
              class="flex justify-center items-center p-[6px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-[4px] h-[32px] w-[32px]"
            >
              <IconsChevronDown class="rotate-[90deg]" />
            </button>

            <template v-for="i in pagination?.pages">
              <button
                @click="
                  () => {
                    if (typeof i === 'number') currentPageNumber = i;
                  }
                "
                :class="{
                  'border-[#E5E7EB] bg-[#E10600] text-[#FFFFFF]':
                    i === pagination?.currentPage,
                  'border-[#E5E7EB] bg-[#ffffff] text-[#000000]':
                    i !== pagination?.currentPage,
                }"
                class="flex justify-center items-center p-[6px] bg- border-[1px] rounded-[4px] h-[32px] w-[32px]"
              >
                <span class="font-[500] text-[12px]">
                  {{ i }}
                </span>
              </button>
            </template>

            <button
              @click="next_page(false)"
              :disabled="!pagination?.hasNext"
              class="flex justify-center items-center p-[6px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-[4px] h-[32px] w-[32px]"
            >
              <IconsChevronDown class="rotate-[-90deg]" />
            </button>
          </div>

          <button
            @click="next_page(true)"
            class="flex items-center justify-center py-[8px] px-[16px] gap-[10px] bg-[#ffffff] border-[1px] border-[#EFEFEF] rounded-[4px] h-[32px]"
          >
            <span class="font-[500] text-[12px] text-[#000000]"> Last </span>
          </button>
        </nav>
      </div>
    </div>
  </div>

  <!-- Main modal -->
  <div
    id="new_consultant_modal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] max-h-full bg-[#00000033]"
  >
    <div class="relative p-4 w-full max-w-5xl max-h-full h-full">
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 w-[100%] max-h-full h-full overflow-y-auto"
      >
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <div class="flex items-center gap-[10px]">
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="new_consultant_modal"
            >
              <IconsChevronDown class="rotate-[90deg]" />

              <span class="sr-only">Close modal</span>
            </button>

            <span class="font-[600] text-[20px] text-[#1A1A1D]">
              New Consultant
            </span>
          </div>
        </div>

        <!-- Modal body -->
        <div class="grid grid-cols-6 items-start p-4 md:p-5">
          <div class="col-span-4 flex flex-col items-start gap-[24px]">
            <div class="flex flex-col items-start gap-[4px]">
              <span class="font-[500] text-[16px]/[24px] text-[#474D66]">
                Personal Details
              </span>
              <span
                v-if="adding_new_consultant_error"
                class="font-[500] text-[12px]/[16px] text-red-800"
              >
                {{ adding_new_consultant_error }}
              </span>
            </div>

            <div class="w-full grid gap-4 grid-cols-2 gap-[20px]">
              <div class="flex flex-col gap-[8px]">
                <label
                  for="first_name"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >First Name
                </label>

                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  v-model="new_consultant_data.first_name"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="First Name "
                />
              </div>
              <div class="flex flex-col gap-[8px]">
                <label
                  for="last_name"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Last Name
                </label>

                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  v-model="new_consultant_data.last_name"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="Last Name "
                />
              </div>

              <div class="flex flex-col gap-[8px]">
                <label
                  for="email"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  v-model="new_consultant_data.email"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="Consultant Email Address"
                />
              </div>

              <div class="flex flex-col gap-[8px]">
                <label
                  for="role"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Role
                </label>

                <select
                  id="role"
                  v-model="new_consultant_data.role"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                >
                  <option value="">Select one</option>
                  <option value="Independent Consultant">
                    Independent Consultant
                  </option>
                  <option value="Senior Consultant">Senior Consultant</option>
                  <option value="Partner">Partner</option>
                </select>
              </div>

              <div class="flex flex-col gap-[8px]">
                <label
                  for="password"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="new_consultant_data.password"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="Consultant Password"
                />
              </div>

              <div class="flex flex-col gap-[8px]">
                <label
                  for="confirm_password"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Confirm Password
                </label>

                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  v-model="new_consultant_data.confirm_password"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="Confirm Password"
                />
              </div>

              <div class="flex col-span-2 flex-col gap-[8px]">
                <label
                  for="home_address"
                  class="block font-[500] text-[14px] text-[#4B5563]"
                  >Home Address
                </label>

                <input
                  type="text"
                  name="home_address"
                  id="home_address"
                  v-model="new_consultant_data.home_address"
                  class="bg-gray-50 border border-[#F1F6FA] text-[#667085] text-[14px] rounded-[4px] focus:ring-gray-600 focus:border-gray-600 block w-full min-h-[50px] px-[16px] py-[8px]"
                  placeholder="Home Address "
                />
              </div>
            </div>
          </div>
          <div class="col-span-2 pt-[10px] p-[20px] flex items-start">
            <div class="flex flex-col items-start gap-[30px]">
              <div class="flex flex-col items-start gap-[20px]">
                <div class="flex flex-col gap-[4px]">
                  <span class="font-[500] text-[16px]/[24px] text-[#474D66]">
                    Profile Picture
                  </span>
                  <span class="text-[12px]/[16px] text-[#696F8C]">
                    Supports JPEG & PNG under 3MB (max. 800x400px)
                  </span>
                </div>
                <div class="flex items-center gap-[8px]">
                  <IconsProfile />

                  <button
                    disabled
                    type="button"
                    class="flex items-center justify-center py-[16px] px-[33px] gap-[8px] rounded-[200px] hover:opacity-50 focus:opacity-[50] focus:ring-3 focus:ring-red-300 min-w-[150px] border border-[#F1F6FA]"
                  >
                    <span class="font-[500] text-[15px]/[20px] text-[#696F8C]">
                      Upload Photo
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center justify-end gap-[10px] p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="flex items-center p-[16px] gap-[8px] rounded-[200px] hover:opacity-50 focus:opacity-[50] focus:ring-3 focus:ring-red-300"
            data-modal-hide="new_consultant_modal"
          >
            <span class="font-[500] text-[15px]/[20px] text-[#E10600]">
              Cancel
            </span>
          </button>

          <button
            :disabled="adding_new_consultant"
            @click.prevent="add_new_consultant"
            type="button"
            class="flex items-center justify-center p-[16px] gap-[8px] rounded-[200px] bg-[#E10600] hover:opacity-50 focus:opacity-[50] focus:ring-3 focus:ring-red-300 min-w-[150px]"
          >
            <IconsRefresh v-if="adding_new_consultant" class="animate-spin" />
            <span class="font-[500] text-[15px]/[20px] text-[#ffffff]">
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
