<script setup lang="ts">
import { initModals } from "flowbite";

const props = defineProps<{
  client: ClientDetail;
}>();

const queryController = useQueryController();

const queries = ref<any[]>([]);
const loading_queries = ref(false);
const queries_loading_error = ref(false);

const selected_queries = defineModel();

const fetch_queries = async () => {
  try {
    // console.log("here");
    if (loading_queries.value) return;

    const uid = props?.client?.client_uid ?? false;
    if (!uid) return;

    loading_queries.value = true;

    let res = await queryController.get_queries(uid);

    if (!res) {
      throw new Error("Error fetching client data");
    }
    // console.log(res);

    queries.value = res?.queries ? res.queries : [];
  } catch (error) {
    queries_loading_error.value = true;
  }

  loading_queries.value = false;
};

onBeforeMount(async () => {
  await fetch_queries();
});
</script>

<template>
  <div class="w-full flex flex-col items-start p-4 md:p-5">
    <div class="w-full h-full">
      <template v-if="loading_queries">
        <div class="flex items-center justify-center w-full min-h-[40vh]">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </template>
      <template v-if="queries.length > 0">
        <!-- {{ queries[0] }} -->

        <ul class="w-full gap-6 flex flex-col">
          <template v-for="query in queries">
            <li>
              <input
                type="checkbox"
                :id="query.id"
                :value="query.id"
                class="hidden peer"
                v-model="selected_queries"
              />
              <label
                :for="query.id"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
              >
                <div class="block">
                  <div class="w-full text-lg font-semibold">{{ query.id }}</div>
                  <div class="w-full text-sm">
                    {{ query.formattedDate }} {{ query.formattedTime }}
                  </div>
                </div>
              </label>
            </li>
          </template>
        </ul>
      </template>

      <template v-if="!(queries.length > 0) && !loading_queries">
        <p>This client has no query</p>
      </template>
    </div>
  </div>
</template>
