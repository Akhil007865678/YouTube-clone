import express from "express";
import userController from '../controllers/history.js';
const { addToHistory, getHistory} = userController;
import Userauth from "../middleware/UserAuth.js";

const router = express.Router();

router.post('/add-history', Userauth, addToHistory);
router.get('/fetch-history', Userauth, getHistory);

export default router;