import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const COURSE_ENROLLMENT = sequelize.define('Enrollments', {
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    paymentTransactionId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentScreenshotUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
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
});

export default COURSE_ENROLLMENT;
