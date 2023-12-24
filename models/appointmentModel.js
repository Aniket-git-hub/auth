// models/Appointment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const APPOINTMENT = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    consultationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    // appointment status (e.g., 'completed', 'pending')
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
        allowNull: false,
    },
});

export default APPOINTMENT;
