// ConsultantClient.ts
import { Sequelize, DataTypes } from "sequelize";

export const ConsultantClientModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "ConsultantClient",
    {
      consultant_client_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      consultant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attached_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "consultant_clients",
      timestamps: false,
    }
  );
};
