import express from "express";
import getEnvVariable from "./utils/env.js";

const app = express();

import cors from "cors";
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
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
app.use(cors())

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

import sequelize from "./config/database.js";
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully');
}).catch((error) => {
    console.error('Error syncing database:', error);
});


import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes)

import errorHandler from "./middleware/errorHandler.js";
app.use(errorHandler)


app.listen(3000, () => {
    console.log("listening on port 3000")
})