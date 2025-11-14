<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
const { loggedIn, user, fetch: refreshSession } = useUserSession();
import { parent_routes } from "~/config/parent_routes";

definePageMeta({
  layout: "auth-pages",
});

const authController = useAuthController();
const logging_in = ref(false);
const logging_in_error = ref("");

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup.string().required("Please enter your password"),
  }),
});

const login_admin = handleSubmit(async (values) => {
  try {
    logging_in.value = true;
    logging_in_error.value = "";

    await authController.login_admin(values.email!, values.password!);

    await refreshSession();
    await navigateTo(parent_routes.web_app.dashboard.path);
  } catch (error) {
    if (error instanceof Error) {
      logging_in_error.value = error.message;
    } else {
      logging_in_error.value = "An unexpected error occurred.";
    }
  }
  logging_in.value = false;
});

onBeforeMount(async () => {
  if (loggedIn.value) {
    await navigateTo(parent_routes.web_app.dashboard.path);
  }
});
</script>

<template>
  <div class="flex flex-col w-full gap-[16px]">
    <div class="flex flex-col w-full items-start gap-[24px]">
      <div>
        <h5 class="text-[24px] text-[#E5E7EB] mb-[8px]">Admin Login</h5>
        <p class="text-[16px] text-[#c5c2c8cc]">
          Log in to your account to continue
        </p>
      </div>

      <button class="sign_in_with_google" disabled>
        <img src="/assets/images/google_logo.svg" alt="" />
        <span class="text-[15px] text-[#4B5563]"> Continue with Google </span>
      </button>
    </div>

    <div class="flex items-center justify-center gap-[12px]">
      <hr class="w-full h-px border-[#F1F6FA] bg-[#F1F6FA] rounded-full" />
      <span class="text-[14px] text-[#667085]">or</span>
      <hr class="w-full h-px border-[#F1F6FA] bg-[#F1F6FA] rounded-full" />
    </div>

    <div class="flex flex-col gap-[32px] w-full">
      <div class="flex flex-col gap-[8px] w-full">
        <div class="flex flex-col gap-[16px] w-full">
          <InputsEmailInput name="email" label="Email Address" />
          <InputsPasswordInput name="password" label="Password" />
        </div>
        <span class="text-[10px] text-[#EDEFF5] opacity-[0.8]">
          By proceeding you agree to the Terms and Conditions and Privacy Policy
          of Benjamin Strategy Advisors
        </span>
      </div>

      <div class="w-full" v-if="logging_in_error !== ''">
        <p class="text-[15px] text-[#E10600] text-center opacity-[0.8]">
          {{ logging_in_error }}
        </p>
      </div>
      <button
        :disabled="logging_in"
        @click.prevent="login_admin"
        class="w-full h-[50px] py-[6px] flex items-center justify-center bg-[#E10600] rounded-full"
      >
        <LoadersInButton v-if="logging_in" fill="#aaa" />
        <span class="text-[15px] text-[#ffffff]"> Login </span>
      </button>
    </div>
  </div>
</template>
