// models/videoModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const VIDEO = sequelize.define('video', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnailName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default VIDEO;
