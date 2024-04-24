// models/pdfModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DOCUMENT = sequelize.define('documents', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default DOCUMENT;
