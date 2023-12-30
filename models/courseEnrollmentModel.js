import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import COURSE from './courseModel.js';
import USER from './userModel.js';

const COURSE_ENROLLMENT = sequelize.define(
    'Enrollments',
    {
        paymentTransactionId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        paymentScreenshotUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected'),
            defaultValue: 'pending'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['CourseId', 'UserId']
            }
        ]
    }
);

COURSE_ENROLLMENT.belongsTo(USER);
COURSE_ENROLLMENT.belongsTo(COURSE);
COURSE.hasMany(COURSE_ENROLLMENT);
COURSE.hasMany(COURSE_ENROLLMENT);

export default COURSE_ENROLLMENT;
