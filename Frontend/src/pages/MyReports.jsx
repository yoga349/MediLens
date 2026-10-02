import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarDays,
  ArrowRight,
  Loader2,
  AlertCircle,
  Upload,
} from "lucide-react";
import api from "../services/api";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/reports");

        setReports(response.data.reports || []);
      } catch (error) {
        console.error("Failed to fetch reports:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your reports."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>

        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Reports
            </h1>

            <p className="text-slate-500 mt-2">
              View your uploaded medical reports and AI summaries.
            </p>
          </div>

          <Link
            to="/upload-report"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Upload size={18} />
            Upload Report
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <Loader2
              size={32}
              className="mx-auto text-blue-600 animate-spin"
            />

            <p className="text-slate-500 mt-3">
              Loading your reports...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">

            <AlertCircle
              size={36}
              className="mx-auto text-red-500"
            />

            <h2 className="font-semibold text-slate-800 mt-4">
              Something went wrong
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              {error}
            </p>

          </div>
        )}

        {/* Empty state */}
        {!loading && !error && reports.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={26} />
            </div>

            <h2 className="text-xl font-semibold text-slate-800 mt-5">
              No reports yet
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Upload your first medical report to generate an AI summary.
            </p>

            <Link
              to="/upload-report"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              <Upload size={18} />
              Upload Report
            </Link>

          </div>
        )}

        {/* Reports */}
        {!loading && !error && reports.length > 0 && (
          <div className="grid gap-4">

            {reports.map((report) => (
              <Link
                key={report._id}
                to={`/reports/${report._id}`}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-sm transition"
              >

                <div className="flex items-center justify-between gap-4">

                  <div className="flex items-center gap-4 min-w-0">

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText size={23} />
                    </div>

                    <div className="min-w-0">

                      <h2 className="font-semibold text-slate-800 truncate">
                        {report.fileName}
                      </h2>

                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">

                        <span className="flex items-center gap-1">
                          <CalendarDays size={14} />

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

                  <ArrowRight
                    size={20}
                    className="shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                  />

                </div>

              </Link>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default MyReports;