<script setup lang="ts"></script>
<template>
  <div class="auth_container overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full bg-black/70"></div>
    <div class="relative z-[1] w-full h-full">
      <div class="mb-[50px]">
        <img src="/assets/images/logo.png" class="h-[60px]" />
      </div>
      <div class="flex gap-[90px]">
        <div class="w-full flex flex-col gap-[12px]">
          <h5 class="text-[32px] text-[#fafafa]">
            The smarter way <br />
            to drive business strategy
          </h5>
          <span class="text-[16px] text-[#fafafa]">
            Unlock clarity and control with powerful insights, seamless
            collaboration, and data-driven decision-making — all in one place.
          </span>
        </div>
        <div class="rounded-[20px] auth_form_container py-[50px] px-[100px]">
          <slot />
        </div>
      </div>
    </div>
    <!-- <div class="absolute top-[38%] left-[5%] w-full h-full ">
      </div> -->

    <div class="absolute top-[48%] left-[5%] w-[990px] max-w-full">
      <div class="relative w-full">
        <img
          src="/assets/images/dashboard_home.png"
          class="w-full object-contain"
          alt=""
        />
        <div class="absolute top-0 left-0 w-full h-full bg-black/70"></div>
      </div>
    </div>
  </div>
</template>

<style>
.auth_container {
  background-color: #0b0b0f;
  background-image: url("/assets/images/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -100px 30%;
  position: relative;

  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;

  padding: 60px 80px;
}
.auth_form_container {
  background: linear-gradient(180deg, #1a0b0d 0%, #2a0f14 100%);
  min-width: 640px;
}
.sign_in_with_google {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  gap: 8px;

  width: 100%;
  height: 48px;

  background: linear-gradient(
      180deg,
      rgba(223, 225, 231, 0) 0%,
      rgba(223, 225, 231, 0.05) 100%
    ),
    #ffffff;
  border: 1px solid #f1f6fa;
  box-shadow: inset 0px -1px 2px rgba(18, 55, 105, 0.08);
  border-radius: 200px;
}
</style>
