/**
 * 
    consultant_id INT PRIMARY KEY AUTO_INCREMENT,
    consultant_first_name VARCHAR(255),
    consultant_last_name VARCHAR(255),
    consultant_home_address VARCHAR(255),
    consultant_password VARCHAR(255),
    consultant_email VARCHAR(100) UNIQUE,
    consultant_created_at DATE,
    is_active BOOLEAN DEFAULT TRUE
*/

import { Sequelize, DataTypes } from "sequelize";

export const ConsultantModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "consultant",
    {
      consultant_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      consultant_first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      consultant_last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      consultant_role: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      consultant_home_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      consultant_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      consultant_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      last_activity: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      consultant_created_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "consultants",
      timestamps: true,
      createdAt: "consultant_created_at",
      updatedAt: false,
    }
  );
};
