import { Link } from "react-router-dom";
import { HeartPulse, FileText, Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <HeartPulse size={21} />
            </div>

            <span className="text-lg font-bold text-slate-900">
              HealthChronicle AI
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI-powered medical report summaries
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Understand Your
            <span className="text-blue-600"> Medical Reports </span>
            Simply
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-500 leading-8">
            Upload your medical report and let HealthChronicle AI
            extract the important information and explain it in
            simple, easy-to-understand language.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="px-6 py-3.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Login
            </Link>

          </div>

        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-6 pb-20">

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={22} />
              </div>

              <h3 className="font-semibold text-slate-900 mt-5">
                Upload Reports
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Upload your medical reports as PDF or image files.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles size={22} />
              </div>

              <h3 className="font-semibold text-slate-900 mt-5">
                AI Analysis
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                AI analyzes the extracted information from your report.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="w-11 h-11 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                <HeartPulse size={22} />
              </div>

              <h3 className="font-semibold text-slate-900 mt-5">
                Simple Summary
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-6">
                Get an easy-to-understand summary of your report.
              </p>
            </div>

          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-xs text-slate-400">
            HealthChronicle AI provides AI-generated information
            for understanding medical reports and does not replace
            professional medical advice.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;