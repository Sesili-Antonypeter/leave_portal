import express from "express";
import { login } from "../controllers/authController";

const router = express.Router()

route.post('/login',login)

export default router;
