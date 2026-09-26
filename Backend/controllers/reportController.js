import Report from "../models/Report.js";

import {
  extractTextFromPDF,
  extractTextFromImage,
} from "../services/reportExtractor.js";

import { generateMedicalSummary } from "../services/aiService.js";

export const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a medical report",
      });
    }

    // 1. Extract text
    let extractedText = "";

    if (req.file.mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(req.file.path);
    } else if (
      req.file.mimetype === "image/jpeg" ||
      req.file.mimetype === "image/jpg" ||
      req.file.mimetype === "image/png"
    ) {
      extractedText = await extractTextFromImage(req.file.path);
    }

    if (!extractedText) {
      return res.status(400).json({
        message:
          "Could not extract text from the medical report. Please upload a clearer report.",
      });
    }

    // 2. Generate AI summary
    const aiSummary = await generateMedicalSummary(extractedText);

    // 3. Save report + extracted text + AI summary
    const report = await Report.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      extractedText,
      aiSummary,
    });

    // 4. Send response
    res.status(201).json({
      message: "Medical report processed successfully",

      report: {
        id: report._id,
        fileName: report.fileName,
        fileType: report.fileType,
        aiSummary: report.aiSummary,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error("Report processing error:", error);

    res.status(500).json({
      message: "Report processing failed",
      error: error.message,
    });
  }
};

export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      reports,
    });
  } catch (error) {
    console.error("Fetching reports failed:", error);

    res.status(500).json({
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      report,
    });
  } catch (error) {
    console.error("Fetching report failed:", error);

    res.status(500).json({
      message: "Failed to fetch report",
      error: error.message,
    });
  }
};