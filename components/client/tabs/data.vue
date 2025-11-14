<script setup lang="ts">
defineProps<{
  client_details: ClientDetail | null;
}>();

const clientController = useClientController();
const filesController = useFilesController();

const route = useRoute();

const uid = route.params.uid as string;

const files = ref<ClientUploadedFile[] | null>(null);

onBeforeMount(async () => {
  const res = await clientController.get_client_files(uid);
  // console.log(res);
  files.value = res?.files ? res?.files : null;
});
</script>

<template>
  <section class="w-full flex flex-col gap-[20px] bg-[#ffffff]">
    <div class="w-full flex flex-col items-start gap-[16px]">
      <span class="font-[600] text-[16px]/[24px] text-[#474D66]">
        Documents
      </span>
      <!-- {{ files }} -->
      <template v-if="(files ?? []).length > 0">
        <div class="flex w-full flex-col items-start gap-[12px]">
          <template v-for="file in files">
            <data-in-client-dataitem :file="file" />
          </template>
        </div>
      </template>
    </div>

    <button
      disabled
      class="flex items-center justify-center p-[16px] h-[48px] w-[170px] gap-[4px] bg-[#ffffff] rounded-[8px] border-[1px] border-[#EDEFF5]"
    >
      <span class="font-[500] text-[15px]/[20px] text-[#E10600]">
        Request More Data
      </span>
    </button>
  </section>
</template>
