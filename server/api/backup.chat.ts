import "dotenv/config";

import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { find_relevant_content } from "../controller/OpenAIEmbeddingCont";

import { z } from "zod";

export default defineLazyEventHandler(async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API key");
  const openai = createOpenAI({
    apiKey: apiKey,
  });
  // Did the Free-form responses provide substantive information?
  return defineEventHandler(async (event: any) => {
    const { messages }: { messages: UIMessage[] } = await readBody(event);

    const result = streamText({
      model: openai("gpt-4.1"),
      messages: convertToModelMessages(messages),
      tools: {
        getInformation: tool({
          description: `Get information from your knowledge base to answer questions.`,
          inputSchema: z.object({
            question: z.string().describe("the users question"),
          }),
          execute: async ({ question }) => find_relevant_content(question),
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  });
});
