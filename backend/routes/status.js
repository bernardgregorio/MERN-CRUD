import express from "express";
import StatusController from "../controllers/status.js";

const router = express.Router();
router.get("/", StatusController.getAllStatus);

export default router;
