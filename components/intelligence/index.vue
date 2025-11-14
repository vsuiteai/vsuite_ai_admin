<script setup lang="ts">
import { Chat } from "@ai-sdk/vue";
import { ref } from "vue";
import { useChatStore } from "~/store/chat_store";

import { marked } from 'marked'

const output =  (markdown: string) => {
  const processed_output =  marked(markdown)

  return processed_output
}

const input = ref("");
const chat = new Chat({});

const chatStore = useChatStore();

const handleSubmit = (e: Event) => {
  e.preventDefault();
  const queries = selected_queries.value;
  chat.sendMessage({
    text: input.value,
    metadata: {
      queries: queries,
    },
  });
  input.value = "";
};

const current_client = computed(() => {
  return chatStore.get_current_client;
});

const selected_queries = computed(() => {
  return chatStore.get_selected_queries;
});



</script>

<template>
  <div
    class="w-full overflow-y-auto max-h-[50vh] h-[50vh] mx-[24px] flex flex-col"
  >
    <div v-if="selected_queries.length > 0" class="px-[10px] pb-[5px]">
      <div
        class="p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <p>
          vSuite now uses the following queries in responding to your prompt:
          <span class="font-semibold">
            {{ selected_queries.join(", ") }}
          </span>
        </p>
      </div>
    </div>
    <!-- {{ current_client }} -->
    <template v-for="(m, index) in chat.messages" :key="m.id ? m.id : index">
      <div
        :class="{
          'self-end': m.role === 'user',
          'self-start': m.role !== 'user',
        }"
        class="px-[10px] py-[15px] min-w-[50%] max-w-[80%]"
      >
        <div
          :class="{
            'bg-[#D9D9D9] rounded-tr-[8px]': m.role === 'user',
            'bg-[#D9D0D9] rounded-tl-[8px]': m.role !== 'user',
          }"
          class="rounded-[8px] p-[15px]"
        >
          {{ m.role === "user" ? "User: " : "vSuite: " }}

          <div
            v-for="(part, index) in m.parts"
            :key="`${m.id}-${part.type}-${index}`"
            class="break-all"
          >
             <template  v-if="part.type === 'text'" >
                
                <div class="output" v-html=" output(part.text )"></div>
              </template>

            <div
              v-else-if="
                part.type === 'tool-getInformation' &&
                part.state === 'output-available' &&
                part.output
              "
            >
           
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <form
    @submit="handleSubmit"
    class="w-full px-[16px] py-[10px] w-full min-h-[10vh]"
  >
    <div
      class="w-full flex items-center justify-between py-[8px] px-[16px] min-w-[300px] min-h-[60px] h-[60px] border border-[#E5E7EB] rounded-[8px]"
    >
      <div class="gap-[16px] flex items-center w-full h-full">
        <button type="button" disabled>
          <IconsPlus />
        </button>
        <input
          v-model="input"
          placeholder="Ask me anything..."
          class="w-full h-full outline-none"
        />
      </div>
      <div class="gap-[16px] flex items-center">
        <button
          type="submit"
          class="flex items-center justify-center gap-[10px] h-[48px] w-[48px] bg-[#E10600] rounded-[4px]"
        >
          <IconsPaperPlane />
        </button>
      </div>
    </div>
  </form>
</template>
