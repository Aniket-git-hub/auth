// models/categoryModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CATEGORY = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("video", "notes"),
        allowNull: false,
    }
});

export default CATEGORY;
