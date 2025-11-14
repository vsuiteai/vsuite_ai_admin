import { PromptQueryResultEmbeddings, sequelize } from "../vector_models";
import { generateChunks } from "../utils/generate_chunks";

import { embedMany, embed } from "ai";
import { openai } from "@ai-sdk/openai";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const save_vector_embeddings = async (
  query_result: string,
  query_id: string
): Promise<void> => {
  try {
    const chunks = generateChunks(query_result);

    if (!chunks) return;

    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    const embeddings_res = embeddings.map((e, i) => ({
      content: chunks[i],
      embedding: e,
    }));

    /**
   id: {
             type: DataTypes.UUID,
             defaultValue: DataTypes.UUIDV4,
             primaryKey: true,
           },
           prompt_query_result_id: {
             type: DataTypes.STRING(191),
             allowNull: false,
           },
           content: {
             type: DataTypes.TEXT,
             allowNull: false,
           },
           embedding: {
             // type: DataTypes.VECTOR(1536),
             type: DataTypes.ARRAY(DataTypes.FLOAT),
     
             allowNull: false,
           },
     */

    await PromptQueryResultEmbeddings.bulkCreate(
      embeddings_res.map((e) => ({
        prompt_query_result_id: query_id,
        content: e.content,
        embedding: e.embedding,
      }))
    );
  } catch (err) {
    console.log(err);
  }
};

const generate_embedding = async (value: string): Promise<number[]> => {
  console.log(value);
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

const find_relevant_content = async (
  userQuery: string,
  limit = 4,
  query_ids: string[]
) => {
  console.log("query_id");
  console.log(query_ids);
  try {
    const userEmbedding = await generate_embedding(userQuery);

    const embeddingStr = `[${userEmbedding.join(",")}]`;
    const queryIdsLiteral = `{${query_ids.join(",")}}`;

    const [results] = await sequelize.query(
      `
  SELECT content,
         1 - (embedding <=> :embedding::vector) AS similarity
  FROM prompt_query_result_embeddings
  WHERE 1 - (embedding <=> :embedding::vector) > 0.5
    AND prompt_query_result_id = ANY(:query_ids)
  ORDER BY similarity DESC
  LIMIT :limit
  `,
      {
        replacements: {
          embedding: embeddingStr,
          limit,
          query_ids: queryIdsLiteral,
        },
        type: "SELECT",
      }
    );

    console.log("called");
    console.log(results);

    return results;
  } catch (err) {
    console.log(err);
  }
};

export { save_vector_embeddings, generate_embedding, find_relevant_content };
