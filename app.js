import express from 'express';
import getEnvVariable from './utils/env.js';

const app = express();
const PORT = process.env.PORT || 3000;

import cors from 'cors';
const allowedOrigins = getEnvVariable('ALLOWED_ORIGINS').split(',');
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`${origin} not allowed by cors`));
            }
        },
        optionsSuccessStatus: 200,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);
app.use(cors());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

import sequelize from './config/database.js';
import CATEGORY from './models/categoryModel.js';
import DOCUMENT from './models/documentModel.js';
import VIDEO from './models/videoModel.js';

VIDEO.belongsToMany(CATEGORY, { through: 'VideoCategory' })
CATEGORY.belongsToMany(VIDEO, { through: 'VideoCategory' })
DOCUMENT.belongsToMany(CATEGORY, { through: 'documentCategory' })
CATEGORY.belongsToMany(DOCUMENT, { through: 'documentCategory' })

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('[database] synced successfully');
    })
    .catch((error) => {
        console.error('[database] Error syncing database:', error);
    });




import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

import appointmentRoute from './routes/appointmentRoute.js';
app.use('/api/appointment', appointmentRoute);

import courseRoute from './routes/courseRoute.js';
app.use('/api/course', courseRoute);

import enrollmentRoute from './routes/enrollmentRoutes.js';
app.use('/api/enrollment', enrollmentRoute);

import documentRoute from './routes/documentRoute.js';
app.use('/api/document', documentRoute)

import videoRoute from './routes/videoRoute.js';
app.use('/api/video', videoRoute)

import categoryRoute from './routes/categoryRoute.js';
app.use('/api/category', categoryRoute)

app.get('/', (req, res) => res.send('Hello world'));

import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('[server] listening on port ' + PORT + '...');
});
