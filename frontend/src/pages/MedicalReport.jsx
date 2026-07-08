import { useState } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function MedicalReport() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async () => {

    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("report", file);

      const res = await api.post(
        "/medical-report/analyze",
        formData
      );

      setAnalysis(res.data.analysis);

    } catch (err) {

      console.error(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen text-white fade-up">

      {/* HEADER */}

      <motion.div

        initial={{opacity:0,y:-30}}
        animate={{opacity:1,y:0}}
        transition={{duration:.6}}

        className="glass-card p-8 mb-8"

      >

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 flex items-center justify-center shadow-2xl">

            <FileText size={42}/>

          </div>

          <div>

            <h1 className="text-5xl font-extrabold">

              Medical Report Analyzer

            </h1>

            <p className="text-gray-400 mt-3 text-lg">

              Upload your medical report and receive an AI-powered analysis,
              summary and health recommendations.

            </p>

          </div>

        </div>

      </motion.div>

      {/* UPLOAD */}

      <motion.div

        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        transition={{delay:.2}}

        className="glass-card p-10"

      >

        <div className="border-2 border-dashed border-red-900 rounded-3xl p-12 text-center hover:border-red-500 transition-all">

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center mx-auto floating">

            <UploadCloud size={46}/>

          </div>

          <h2 className="text-3xl font-bold mt-6">

            Upload Medical Report

          </h2>

          <p className="text-gray-400 mt-3">

            Supported format: PDF

          </p>

          <input

            type="file"

            accept=".pdf"

            onChange={(e)=>setFile(e.target.files[0])}

            className="hidden"

            id="upload"

          />

          <label

            htmlFor="upload"

            className="inline-block mt-8 red-btn cursor-pointer"

          >

            Choose PDF

          </label>

          {file && (

            <motion.div

              initial={{opacity:0}}
              animate={{opacity:1}}

              className="mt-8"

            >

              <div className="inline-flex items-center gap-3 bg-[#160909] border border-red-900 rounded-xl px-5 py-4">

                <FileText className="text-red-400"/>

                <span>{file.name}</span>

              </div>

            </motion.div>

          )}

          <div className="mt-10">

            <button

              onClick={handleSubmit}

              disabled={loading}

              className="red-btn text-lg"

            >

              {loading ? "Analyzing Report..." : "Analyze Report"}

            </button>

          </div>

        </div>

      </motion.div>

      {/* LOADING */}

      {loading && (

        <motion.div

          initial={{opacity:0}}
          animate={{opacity:1}}

          className="glass-card mt-10 p-10 text-center"

        >

          <Loader2

            size={55}

            className="mx-auto animate-spin text-red-500"

          />

          <h2 className="text-3xl font-bold mt-6">

            AI is analyzing your report...

          </h2>

          <p className="text-gray-400 mt-4">

            Extracting text...

          </p>

          <p className="text-gray-400">

            Understanding medical values...

          </p>

          <p className="text-gray-400">

            Generating recommendations...

          </p>

        </motion.div>

      )}

      {/* RESULTS */}
      {analysis && (

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-12 space-y-8"
  >

    {/* Summary */}

    <div className="glass-card p-8">

      <div className="flex items-center gap-4 mb-5">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center text-2xl">
          📄
        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Summary
          </h2>

          <p className="text-gray-400">
            Overall interpretation of your report
          </p>

        </div>

      </div>

      <p className="leading-8 text-gray-200">
        {analysis.summary}
      </p>

    </div>

    {/* Two Column */}

    <div className="grid lg:grid-cols-2 gap-8">

      <div className="glass-card p-7">

        <h2 className="text-2xl font-bold text-green-400 mb-5">
          ✅ Normal Findings
        </h2>

        <ul className="space-y-3">

          {analysis.normalFindings.map((item, i) => (

            <li
              key={i}
              className="bg-[#0f1612] border border-green-900 rounded-xl p-4"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

      <div className="glass-card p-7">

        <h2 className="text-2xl font-bold text-red-400 mb-5">
          ⚠ Abnormal Findings
        </h2>

        <ul className="space-y-3">

          {analysis.abnormalFindings.map((item, i) => (

            <li
              key={i}
              className="bg-[#180909] border border-red-900 rounded-xl p-4"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

    </div>

    {/* Health Concerns */}

    <div className="glass-card p-8">

      <h2 className="text-2xl font-bold text-orange-400 mb-6">
        🩺 Possible Health Concerns
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {analysis.possibleHealthConcerns.map((item, i) => (

          <div
            key={i}
            className="rounded-xl bg-[#17110b] border border-orange-900 p-5"
          >
            {item}
          </div>

        ))}

      </div>

    </div>

    {/* Recommendations */}

    <div className="grid lg:grid-cols-2 gap-8">

      <div className="glass-card p-7">

        <h2 className="text-2xl font-bold text-green-400 mb-5">
          🥗 Diet Recommendations
        </h2>

        <ul className="space-y-3">

          {analysis.dietRecommendations.map((item, i) => (

            <li
              key={i}
              className="bg-[#0f1612] border border-green-900 rounded-xl p-4"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

      <div className="glass-card p-7">

        <h2 className="text-2xl font-bold text-blue-300 mb-5">
          🏃 Lifestyle Recommendations
        </h2>

        <ul className="space-y-3">

          {analysis.lifestyleRecommendations.map((item, i) => (

            <li
              key={i}
              className="bg-[#101318] border border-blue-900 rounded-xl p-4"
            >
              {item}
            </li>

          ))}

        </ul>

      </div>

    </div>

    {/* Questions */}

    <div className="glass-card p-8">

      <h2 className="text-2xl font-bold text-yellow-300 mb-6">
        👨‍⚕ Questions to Ask Your Doctor
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {analysis.questionsForDoctor.map((item, i) => (

          <div
            key={i}
            className="rounded-xl bg-[#17140a] border border-yellow-900 p-5"
          >
            {item}
          </div>

        ))}

      </div>

    </div>

        {/* Disclaimer */}

    <div className="rounded-3xl border border-red-800 bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60 p-8">

      <h2 className="text-2xl font-bold text-red-300 mb-4">
        ⚠ Medical Disclaimer
      </h2>

      <p className="leading-8 text-gray-300">
        {analysis.disclaimer}
      </p>

    </div>

  </motion.div>

)}

    </div>

  );

}
