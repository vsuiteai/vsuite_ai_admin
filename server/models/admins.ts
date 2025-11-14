/**
 * 

admin_id INT AUTO_INCREMENT PRIMARY KEY,
admin_username VARCHAR(50) NOT NULL UNIQUE,
admin_firstname VARCHAR(50) NOT NULL,
admin_lastname VARCHAR(50) NOT NULL,
admin_password VARCHAR(255) NOT NULL,
admin_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
admin_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

*/

import { Sequelize, DataTypes } from "sequelize";

export const AdminModel = (sequelize: Sequelize) => {
  return sequelize.define(
    "Admin",
    {
      admin_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      admin_username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      admin_firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      admin_lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      admin_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      admin_created_at: {
        type: DataTypes.DATE,
      },
      admin_updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "admins",
      timestamps: true,
      createdAt: "admin_created_at",
      updatedAt: "admin_updated_at",
    }
  );
};
