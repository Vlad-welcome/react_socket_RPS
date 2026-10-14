import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';

import initDB from './config/initDB.js';

import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('./uploads', express.static('uploads'));
app.use(cors({
    origin: "http://localhost:4000",
    credentials: true,
}));

app.use(errorHandler);

app.use('/user', userRouter);
app.use('/chat', chatRouter);

await initDB();

export default app;
