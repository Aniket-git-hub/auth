import { Sequelize } from 'sequelize';
import getEnvVariable from '../utils/env.js';

const sequelize = new Sequelize({
    database: getEnvVariable('DB_NAME'),
    username: getEnvVariable('DB_USERNAME'),
    password: getEnvVariable('DB_PASSWORD'),
    host: getEnvVariable('DB_HOST'),
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
