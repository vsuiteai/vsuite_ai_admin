/**
 *  - file_id
    - file_type
    - file_original_name
    - file_GCS_name
    - file_owner
    - file_GCS_id
    - created_at
    - updated_at
 */

import { Sequelize, DataTypes } from "sequelize";

export const ClientFilesUploadModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "client_files_upload",
    {
      file_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      file_type: {
        type: DataTypes.ENUM("csv", "pdf", "xlsx", "word"),
        allowNull: true,
      },
      file_original_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
      },
      file_metric_contained: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
      },

      file_GCS_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
      },
      file_GCS_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
      },

      file_owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "clients",
          key: "client_id",
        },
        onDelete: "CASCADE",
      },

      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "client_files_upload",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
