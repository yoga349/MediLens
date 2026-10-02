import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

const UploadReport = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, JPG, JPEG or PNG file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a medical report first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      formData.append("report", file);

      const response = await api.post(
        "/reports/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const reportId = response.data.report.id;

      navigate(`/reports/${reportId}`);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to process the report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>
      </nav>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-12">

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 mb-4">
            <Upload size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Upload Medical Report
          </h1>

          <p className="text-slate-500 mt-2">
            Upload your report and let HealthChronicle AI
            explain it in simple language.
          </p>

        </div>

        {/* Upload Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8">

          {!file ? (
            <label
              htmlFor="report-upload"
              className="block border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition"
            >

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Upload size={26} />
              </div>

              <h2 className="mt-5 font-semibold text-slate-800">
                Upload your medical report
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Drag and drop or click to choose a file
              </p>

              <p className="text-xs text-slate-400 mt-3">
                PDF, JPG, JPEG or PNG • Maximum 10 MB
              </p>

              <input
                id="report-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>
          ) : (
            <div>

              {/* Selected file */}
              <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">

                <div className="flex items-center gap-4 min-w-0">

                  <div className="w-11 h-11 shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FileText size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 truncate">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                </div>

                {!loading && (
                  <button
                    onClick={removeFile}
                    className="p-2 text-slate-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                )}

              </div>

              {/* Upload button */}
              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Analyzing your report...
                  </>
                ) : (
                  <>
                    <Upload size={19} />
                    Analyze Report
                  </>
                )}
              </button>

            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">

              <AlertCircle
                size={19}
                className="shrink-0 mt-0.5"
              />

              <p>{error}</p>

            </div>
          )}

        </div>

        {/* Processing information */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">

          <div className="flex items-start gap-3">

            <CheckCircle
              size={20}
              className="text-blue-600 shrink-0 mt-0.5"
            />

            <div>

              <h3 className="font-medium text-blue-900">
                What happens after upload?
              </h3>

              <p className="text-sm text-blue-700 mt-1">
                Your report is processed to extract its text,
                then Gemini generates an easy-to-understand
                summary based on the extracted information.
              </p>

            </div>

          </div>

        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          AI-generated summaries are for informational purposes
          and should not replace professional medical advice.
        </p>

      </main>
    </div>
  );
};

export default UploadReport;