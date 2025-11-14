/**
 * 
 * CREATE TABLE client_verification (
  cl_ver_id** INT AUTO_INCREMENT PRIMARY KEY,
  cl_ver_client_id** INT NOT NULL,
  cl_ver_is_verified** BOOLEAN DEFAULT FALSE,
  cl_ver_verification_token** VARCHAR(255),
  cl_ver_token_expires_at** DATETIME,
  cl_ver_created_at** TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_client_verification_client
    FOREIGN KEY (cl_ver_client_id)
    REFERENCES clients(client_id)
    ON DELETE CASCADE
);
 */

import { Sequelize, DataTypes } from "sequelize";

export const ClientVerificationModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "client_verification",
    {
      cl_ver_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cl_ver_verification_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
      },
      cl_ver_client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "clients",
          key: "client_id",
        },
        onDelete: "CASCADE",
      },
      cl_ver_is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      cl_ver_token_expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cl_ver_created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "client_verification",
      timestamps: true,
      createdAt: "cl_ver_created_at",
      updatedAt: false,
    }
  );
};
