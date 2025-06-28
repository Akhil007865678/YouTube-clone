import express from 'express';
import dotenv from "dotenv";
import connectDB from './Connection/conn.js';
import users from './routes/users.js';
import videos from './routes/videos.js';
import history from './routes/history.js';
import comments from './routes/comments.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.use('/auth', users);
app.use('/api', videos);
app.use('/commentApi', comments);
app.use('/User-history', history);

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});