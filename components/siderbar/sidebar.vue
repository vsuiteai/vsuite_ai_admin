<script setup lang="ts">
import { parent_routes } from "~/config/parent_routes";
const { clear, loggedIn, user } = useUserSession();

const webapp_parent_routes = parent_routes.web_app;

const show_consultant_link = computed(() => {
  if (user.value && (user.value?.category ?? "") === "admin") {
    return true;
  } else {
    return false;
  }
});

const logout = async () => {
  await clear();
  useRouter().push(parent_routes.web_app.sign_in);
};
</script>

<template>
  <section id="sidebar" class="block bg-black h-full w-[275px] fixed">
    <div class="block h-full w-full relative overflow-y-scroll">
      <div
        class="w-full h-[70px] lg:h-[90px] my-[20px] lg:my-[unset] px-[32px] flex justify-start lg:justify-center items-center"
      >
        <img
          src="/assets/images/logo.png"
          class="h-[60px] lg:h-[80px]"
          alt=""
        />
      </div>

      <div class="flex flex-col gap-[12px] items-start">
        <div class="flex flex-col justify-center items-center w-full">
          <SiderbarSectionHeader :title="'main'" />

          <NuxtLink :to="webapp_parent_routes.dashboard.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.dashboard.title"
            >
              <template #icon>
                <IconsDashboardNavHome />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink :to="webapp_parent_routes.clients.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.clients.title"
            >
              <template #icon>
                <IconsDashboardNavUsers />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink
            v-if="show_consultant_link"
            :to="webapp_parent_routes.consultants.path"
            id="nav_item"
          >
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.consultants.title"
            >
              <template #icon>
                <IconsDashboardNavConsultants />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink :to="webapp_parent_routes.notifications.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.notifications.title"
            >
              <template #icon>
                <IconsNotificationBell />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <SiderbarSectionHeader :title="'operations'" />

          <NuxtLink :to="webapp_parent_routes.data.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.data.title"
            >
              <template #icon>
                <IconsDashboardNavData />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink :to="webapp_parent_routes.intelligence.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.intelligence.title"
            >
              <template #icon>
                <IconsDashboardNavIntelligence />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink :to="webapp_parent_routes.audit.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.audit.title"
            >
              <template #icon>
                <IconsDashboardNavAudits />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <SiderbarSectionHeader :title="'preferences'" />
          <NuxtLink :to="webapp_parent_routes.settings.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.settings.title"
            >
              <template #icon>
                <IconsDashboardNavSettings />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <NuxtLink :to="webapp_parent_routes.help.path" id="nav_item">
            <SiderbarNavItem
              :is_active="false"
              :title="webapp_parent_routes.help.title"
            >
              <template #icon>
                <IconsDashboardNavHelpSupport />
              </template>
            </SiderbarNavItem>
          </NuxtLink>

          <div id="nav_item" class="w-full px-[18px]">
            <SiderbarNavButtonItem
              :is_active="false"
              :title="'Logout'"
              @click="logout"
            >
              <template #icon>
                <IconsDashboardNavLogout />
              </template>
            </SiderbarNavButtonItem>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
