import express from "express";
import { getData } from "../controllers/weather.controller.js";

const router = express.Router();

router.get("/getData", getData);

export default router;
