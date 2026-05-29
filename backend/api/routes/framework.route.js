


import express from "express";
import {
  createFrameWork,
  getFramework,
  syncFrameworksToVectorDB
} from "../controllers/framework.controller.js";
import { isAdmin, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/create", protect, isAdmin, createFrameWork);
router.get("/get-frameworks", getFramework);
router.post("/sync-vector-db", protect, isAdmin, syncFrameworksToVectorDB);

export default router;