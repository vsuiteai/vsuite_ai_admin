<script setup lang="ts">
const emits = defineEmits(["view_consultant"]);
const props = defineProps({
  consultant_id: {
    type: String,
    required: true,
  },
});
const consultantController = useConsultantController();

const consultant = ref<ConsultantDetail | null>(null);
const consultant_loaded = ref(false);

const editing_consultant = ref(false);
const editing_consultant_error = ref("");
const editing_consultant_success = ref(false);
const new_consultant_data = reactive({
  first_name: "",
  last_name: "",
  email: "",
  role: "",
  home_address: "",
  password: "",
  confirm_password: "",
});

watch(consultant, (new_val) => {
  if (new_val) {
    new_consultant_data.first_name = new_val.consultant_first_name;
    new_consultant_data.last_name = new_val?.consultant_last_name;
    new_consultant_data.email = new_val.consultant_email;
    new_consultant_data.home_address = new_val.consultant_home_address;
    new_consultant_data.role = new_val.consultant_role;
    new_consultant_data.password = new_val.consultant_password;
  }
});

const can_save = computed(() => {
  return (
    !!props.consultant_id &&
    !!consultant_loaded.value &&
    !editing_consultant.value
  );
});

const edit_consultant = async () => {
  try {
    if (editing_consultant.value) return;

    editing_consultant.value = true;
    editing_consultant_success.value = false;
    editing_consultant_error.value = "";

    if (
      new_consultant_data.password != "" ||
      new_consultant_data.confirm_password != ""
    ) {
      if (
        new_consultant_data.password !== new_consultant_data.confirm_password
      ) {
        throw new Error("Password Must Match");
      }
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

    const updated_consultant = await consultantController.update_consultant(
      props.consultant_id,
      consultant_data
    );

    console.log(updated_consultant);
    if (updated_consultant) {
      consultant.value = updated_consultant.consultant;
    }
    editing_consultant_success.value = true;
  } catch (error: any) {
    const message = error?.message || "An unknown error occurred";

    editing_consultant_error.value = error.message;
  }
  editing_consultant.value = false;
};

onBeforeMount(async () => {
  const res = await consultantController.get_consultant(props.consultant_id);
  // console.log(res);
  consultant.value = res?.consultant ? res.consultant : null;
  if (consultant.value) {
    consultant_loaded.value = true;
  }
});
</script>

<template>
  <div class="w-full flex flex-col gap-[24px]">
    <div class="w-full">
      <div
        class="w-full flex flex-col gap-[4px] bg-[#ffffff] border-[1px] border-[#E5E7EB] rounded-t-[12px] py-[16px] px-[30px]"
      >
        <div class="w-full flex justify-between items-center">
          <button @click="$emit('view_consultant')">
            <div class="flex items-center justify-center gap-[8px]">
              <div class="w-[24px] h-[24px] flex items-center justify-center">
                <IconsChevronDown class="rotate-[90deg]" />
              </div>
              <div
                class="font-[500] text-[18px] text-[#101840] h-full flex items-center justify-center gap-2"
              >
                <span>
                  {{ consultant?.consultant_first_name }}
                  {{ consultant?.consultant_last_name }}
                </span>
                <span class="text-[#696F8C] text-[15px]">
                  {{ consultant?.consultant_email }}
                </span>
              </div>
            </div>
          </button>

          <div class="flex items-center gap-[8px]">
            <button
              :disabled="!can_save"
              @click="edit_consultant"
              class="flex items-center gap-[8px] p-[16px] h-[44px] bg-[#E10600] rounded-[200px]"
            >
              <span class="font-[500] text-[15px] text-[#FFFFFF]">
                Save Update
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-full flex flex-col gap-[40px] bg-[#ffffff] border-[1px] border-t-0 border-[#E5E7EB] rounded-b-[12px] py-[30px] px-[30px]"
      >
        <!-- {{ consultant }} -->
        <div class="w-full flex flex-col items-start gap-[30px]">
          <div class="w-full flex items-center justify-between gap-[20px]">
            <div class="flex items-center gap-[30px]">
              <IconsProfile height="80px" width="80px" />

              <div class="flex flex-col gap-[4px]">
                <span class="font-[500] text-[16px]/[24px] text-[#474D66]">
                  Profile Picture
                </span>
                <span class="text-[12px]/[16px] text-[#696F8C]">
                  Supports JPEG & PNG under 3MB (max. 800x400px)
                </span>
              </div>
            </div>

            <div class="flex gap-[16px]">
              <button
                disabled
                class="text-[#1A1A1D] underline font-[500] text-[14px]"
              >
                Change Picture
              </button>
              <button
                disabled
                class="text-[#E10600] underline font-[500] text-[14px]"
              >
                Delete Picture
              </button>
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col gap-[16px]">
          <h4 class="font-[600] text-[16px] text-[#474D66]">
            Personal Details
          </h4>

          <div class="w-full flex flex-col gap-[16px]">
            <div class="flex flex-col items-start gap-[4px]">
              <span
                v-if="editing_consultant_error"
                class="font-[500] text-[12px]/[16px] text-red-800"
              >
                {{ editing_consultant_error }}
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
        </div>
      </div>
    </div>
  </div>
</template>
