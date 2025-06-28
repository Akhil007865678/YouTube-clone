import express from 'express';
import dotenv from "dotenv";
import connectDB from './Connection/conn.js';
import users from './routes/users.js';
import videos from './routes/videos.js';
import history from './routes/history.js';
import comments from './routes/comments.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();

app.set('trust proxy', 1);
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.use('/auth', users);
app.use('/api', videos);
app.use('/commentApi', comments);
app.use('/User-history', history)

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
})