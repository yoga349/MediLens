import fs from "fs";
import { PDFParse } from "pdf-parse";
import { createWorker } from "tesseract.js";

export const extractTextFromPDF = async (filePath) => {
  let parser;

  try {
    const fileBuffer = fs.readFileSync(filePath);

    parser = new PDFParse({
      data: fileBuffer,
    });

    const result = await parser.getText();

    return result.text.trim();
  } catch (error) {
    console.error("PDF text extraction failed:", error.message);
    throw new Error("Unable to extract text from PDF");
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
};

export const extractTextFromImage = async (filePath) => {
  let worker;

  try {
    worker = await createWorker("eng");

    const {
      data: { text },
    } = await worker.recognize(filePath);

    return text.trim();
  } catch (error) {
    console.error("Image OCR failed:", error.message);
    throw new Error("Unable to extract text from image");
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
};