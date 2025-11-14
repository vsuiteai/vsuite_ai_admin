import { Sequelize } from "sequelize";
import pgvector from "pgvector/sequelize";

// Import models
import { PromptQueryResultEmbeddingsModel } from "./prompt_query_result_embeddings";

const PG = {
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASS,
  database: process.env.PG_DB_NAME,
};

// Initialize Sequelize
const sequelize = new Sequelize(PG.database!, PG.user!, PG.password!, {
  host: PG.host!,
  dialect: "postgres",
  logging: false,
});

pgvector.registerTypes(Sequelize);

// Define models
const PromptQueryResultEmbeddings = PromptQueryResultEmbeddingsModel(sequelize);

export { sequelize, PromptQueryResultEmbeddings };
