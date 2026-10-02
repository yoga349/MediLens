import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  LogOut,
  User,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchReports = async () => {
      try {
        const response = await api.get("/reports");
        setReports(response.data.reports || []);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to="/dashboard"
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <HeartPulse size={21} />
            </div>

            <span className="font-bold text-lg text-slate-900">
              HealthChronicle AI
            </span>
          </Link>

          <div className="flex items-center gap-4">

            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <User size={18} />
              {user?.name}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            Upload your medical report and let AI explain it simply.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <h2 className="text-2xl font-semibold">
                Analyze a medical report
              </h2>

              <p className="text-blue-100 mt-2 max-w-xl">
                Upload a PDF or image of your medical report.
                HealthChronicle AI will extract the information
                and generate an easy-to-understand summary.
              </p>
            </div>

            <Link
              to="/upload-report"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-5 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              <Upload size={19} />
              Upload Report
            </Link>

          </div>

        </div>

        {/* Reports */}
        <div className="bg-white border border-slate-200 rounded-2xl">

          <div className="p-6 border-b border-slate-200 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Reports
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your recently analyzed medical reports
              </p>
            </div>

            <Link
              to="/reports"
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              View all
            </Link>

          </div>

          <div className="p-6">

            {loading ? (
              <p className="text-slate-500 text-center py-8">
                Loading reports...
              </p>
            ) : reports.length === 0 ? (

              <div className="text-center py-12">

                <FileText
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-medium text-slate-700">
                  No reports yet
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Upload your first medical report to get started.
                </p>

                <Link
                  to="/upload-report"
                  className="inline-flex items-center gap-2 mt-5 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium"
                >
                  Upload Report
                  <ArrowRight size={16} />
                </Link>

              </div>

            ) : (

              <div className="space-y-3">

                {reports.slice(0, 5).map((report) => (

                  <Link
                    key={report._id}
                    to={`/reports/${report._id}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={20} />
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {report.fileName}
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(
                            report.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-400"
                    />

                  </Link>

                ))}

              </div>

            )}

          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;