import express from "express";

import {
  uploadReport,
  getMyReports,
  getReportById
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("report"),
  uploadReport
);

router.get("/", protect, getMyReports);
router.get("/:id", protect, getReportById);
export default router;