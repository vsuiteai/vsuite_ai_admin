import { Sequelize, DataTypes } from "sequelize";
import pgvector from "pgvector/sequelize";

export const PromptQueryResultEmbeddingsModel = (sequelize: Sequelize) => {
  pgvector.registerTypes(Sequelize);

  return sequelize.define(
    "prompt_query_result_embeddings",
    {
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
    },
    {
      tableName: "prompt_query_result_embeddings",
      timestamps: false,
      indexes: [
        {
          fields: ["embedding"],
          using: "hnsw",
          operator: "vector_cosine_ops",
        },
      ],
    }
  );
};
