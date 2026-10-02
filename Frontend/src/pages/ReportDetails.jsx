import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarDays,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

const ReportDetails = () => {
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get(`/reports/${id}`);

        setReport(response.data.report);
      } catch (error) {
        console.error("Failed to fetch report:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load this report."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={32}
            className="mx-auto text-blue-600 animate-spin"
          />

          <p className="text-slate-500 mt-3">
            Loading report...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center">

          <AlertCircle
            size={40}
            className="mx-auto text-red-500"
          />

          <h2 className="text-xl font-semibold text-slate-900 mt-4">
            Unable to load report
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {error}
          </p>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FileText size={24} />
            </div>

            <div className="min-w-0">

              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 truncate">
                {report.fileName}
              </h1>

              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">

                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} />

                  {new Date(
                    report.createdAt
                  ).toLocaleDateString()}
                </span>

                <span>
                  {report.fileType}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* AI Summary */}
        <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3">

            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles size={21} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                AI Health Summary
              </h2>

              <p className="text-sm text-slate-500 mt-0.5">
                Generated from your uploaded report
              </p>
            </div>

          </div>

          {/* Summary */}
          <div className="p-6">

            <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-7">
              {report.aiSummary}
            </div>

          </div>

        </section>

        {/* Extracted Information */}
        <section className="mt-6 bg-white border border-slate-200 rounded-2xl">

          <div className="px-6 py-5 border-b border-slate-200">

            <h2 className="text-lg font-semibold text-slate-900">
              Extracted Report Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Text extracted from your uploaded report.
            </p>

          </div>

          <div className="p-6">

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">

              <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans leading-6">
                {report.extractedText || "No extracted text available."}
              </pre>

            </div>

          </div>

        </section>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-5">

          <p className="text-sm text-amber-800 leading-6">
            <strong>Important:</strong> This summary is generated
            by AI from the uploaded medical report. It is intended
            to help explain the information in simpler language and
            should not replace advice, diagnosis, or treatment from
            a qualified healthcare professional.
          </p>

        </div>

      </main>
    </div>
  );
};

export default ReportDetails;