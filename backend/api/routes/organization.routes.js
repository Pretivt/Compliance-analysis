import express from "express";
import {
  createOrganization,
  getAllCompanies,
} from "../controllers/organization.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createOrganization);
router.get("/get-companies", protect, getAllCompanies);



export default router;
