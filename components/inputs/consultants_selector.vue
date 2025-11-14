<script setup lang="ts">
import { initDropdowns } from "flowbite";
import { v4 as uuidv4 } from "uuid";

const model_value = defineModel();
const props = withDefaults(
  defineProps<{
    is_disabled?: boolean;
  }>(),
  {
    is_disabled: false,
  }
);

const dropdown_id = uuidv4();
const consultantController = useConsultantController();

const dropdown_menu = ref<HTMLElement | null>(null);
const consultants = ref<ConsultantDetail[]>([]);
const pagination = ref<Pagination | null>(null);
const consultant_loading_error = ref(false);
const loading_consultants = ref(false);

const search_term = ref(null);
const filter_status = ref(null);
const filter_date_from = ref(null);
const filter_date_to = ref(null);
const currentPageNumber = ref<number>(1);

const get_options = computed(() => {
  return consultants.value.map((consultant) => {
    return {
      key: consultant.consultant_id,
      value: `${consultant.consultant_first_name} ${consultant.consultant_last_name}`,
    };
  });
});

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
    consultant_loading_error.value = true;
  }

  loading_consultants.value = false;
};

onMounted(async () => {
  await fetch_consultants();
  initDropdowns();

  // Scroll event for infinite loading
  const el = dropdown_menu.value;
  if (el) {
    el.addEventListener("scroll", async () => {
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

      if (
        nearBottom &&
        !loading_consultants.value &&
        pagination.value?.hasNext
      ) {
        currentPageNumber.value++;
        await fetch_consultants();
      }
    });
  }
});
</script>

<template>
  <button
    :disabled="is_disabled"
    ref="dropdwon_button"
    :data-dropdown-toggle="dropdown_id"
    class="h-[40px] flex items-center justify-center py-[10px] px-[12px] h-[40px] gap-[4px] bg-[#ffffff] rounded-[8px] shadow-[0_1px_4px_1px_rgba(0,0,0,0.05)] hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-300"
    type="button"
  >
    <span class="font-[500] text-[14px] text-[#474D66]"> Consultant</span>
    <svg
      class="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  <!-- Dropdown menu -->
  <div
    ref="dropdown_menu"
    :id="dropdown_id"
    class="z-10 hidden max-h-64 overflow-y-auto bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
  >
    <ul
      class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownCheckboxButton"
    >
      <template v-for="(consultant, index) in get_options" :key="index">
        <li>
          <div class="flex items-center">
            <input
              :id="consultant.key"
              type="checkbox"
              :value="consultant.key"
              v-model="model_value"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              :for="consultant.key"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ consultant.value }}</label
            >
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
