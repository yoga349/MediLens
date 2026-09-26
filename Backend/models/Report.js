import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      required: true,
    },

    reportType: {
      type: String,
      default: "Medical Report",
    },

    extractedText: {
      type: String,
      default: "",
    },

    aiSummary: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;