import { Sequelize, DataTypes } from "sequelize";

export const PromptStatsModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "prompt_stats",
    {
      prompt_stats_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      prompt_stats_status: {
        type: DataTypes.ENUM("Failed", "Ongoing", "Successful"),
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "clients",
          key: "client_id",
        },
        onDelete: "CASCADE",
      },
      prompt_id: {
        type: DataTypes.STRING(255),
        unique: false,
      },
    },
    {
      tableName: "prompt_stats",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
