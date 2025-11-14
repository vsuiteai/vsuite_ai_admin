<script setup lang="ts">
import { useCurrentAdminStore } from "./store/current_admin";

const { loggedIn, user } = useUserSession();

watchEffect(async () => {
  if (user.value) {
    useCurrentAdminStore().setCurrentAdmin(user.value);
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
