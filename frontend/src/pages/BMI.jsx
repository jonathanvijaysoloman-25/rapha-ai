import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  Activity,
  Heart,
  RotateCcw,
  Calculator,
} from "lucide-react";

export default function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");

  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [tips, setTips] = useState([]);
  const [healthyRange, setHealthyRange] = useState("");
  const [categoryColor, setCategoryColor] = useState(
    "from-gray-600 to-gray-700"
  );

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter height and weight.");
      return;
    }

    const h = Number(height) / 100;
    const w = Number(weight);

    if (h <= 0 || w <= 0) {
      alert("Please enter valid values.");
      return;
    }

    const bmiValue = w / (h * h);

    setBMI(bmiValue.toFixed(1));

    const minWeight = (18.5 * h * h).toFixed(1);
    const maxWeight = (24.9 * h * h).toFixed(1);

    setHealthyRange(`${minWeight} kg - ${maxWeight} kg`);

    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setCategoryColor("from-blue-600 to-cyan-500");

      setSummary(
        "Your BMI indicates you are underweight. A nutrient-rich diet and strength training may help improve your health."
      );

      setTips([
        "Increase protein intake",
        "Eat calorie-rich healthy foods",
        "Strength training",
        "Consult a nutritionist",
      ]);
    } else if (bmiValue < 25) {
      setCategory("Healthy Weight");
      setCategoryColor("from-green-600 to-emerald-500");

      setSummary(
        "Excellent! Your BMI is within the healthy range. Continue maintaining your current lifestyle."
      );

      setTips([
        "Balanced nutrition",
        "Exercise regularly",
        "Drink enough water",
        "Sleep 7–8 hours",
      ]);
    } else if (bmiValue < 30) {
      setCategory("Overweight");
      setCategoryColor("from-yellow-500 to-orange-500");

      setSummary(
        "Your BMI falls into the overweight range. Healthy eating and regular exercise are recommended."
      );

      setTips([
        "Walk daily",
        "Reduce sugary drinks",
        "Eat more vegetables",
        "Monitor calories",
      ]);
    } else {
      setCategory("Obese");
      setCategoryColor("from-red-700 to-red-500");

      setSummary(
        "Your BMI indicates obesity. Please consult a healthcare professional for a personalized health plan."
      );

      setTips([
        "Consult a doctor",
        "Exercise regularly",
        "Avoid processed foods",
        "Track weight weekly",
      ]);
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setAge("");
    setGender("Male");

    setBMI(null);
    setCategory("");
    setSummary("");
    setHealthyRange("");
    setTips([]);
    setCategoryColor("from-gray-600 to-gray-700");
  };

  return (

<div className="min-h-screen text-white fade-up">

  {/* Header */}

  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="glass-card p-8 mb-8 overflow-hidden relative"
  >

    <div className="absolute -right-16 -top-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />

    <div className="flex items-center gap-6 relative z-10">

      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 flex items-center justify-center shadow-2xl floating">

        <Scale size={46} />

      </div>

      <div>

        <h1 className="text-5xl font-extrabold">
          AI BMI Calculator
        </h1>

        <p className="text-gray-400 text-lg mt-3">

          Calculate your Body Mass Index and receive
          AI-powered health insights instantly.

        </p>

      </div>

    </div>

  </motion.div>

  {/* Calculator */}

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: .2 }}
    className="glass-card p-8"
  >

    <div className="grid md:grid-cols-2 gap-6">

      <div>

        <label className="block mb-3 text-gray-300">
          Height (cm)
        </label>

        <input
          type="number"
          value={height}
          onChange={(e)=>setHeight(e.target.value)}
          placeholder="Enter Height"
          className="w-full p-4"
        />

      </div>

      <div>

        <label className="block mb-3 text-gray-300">
          Weight (kg)
        </label>

        <input
          type="number"
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
          placeholder="Enter Weight"
          className="w-full p-4"
        />

      </div>

      <div>

        <label className="block mb-3 text-gray-300">
          Age
        </label>

        <input
          type="number"
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          placeholder="Enter Age"
          className="w-full p-4"
        />

      </div>

      <div>

        <label className="block mb-3 text-gray-300">
          Gender
        </label>

        <select
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          className="w-full p-4"
        >

          <option>Male</option>
          <option>Female</option>
          <option>Other</option>

        </select>

      </div>

    </div>

    <div className="flex flex-col md:flex-row gap-5 mt-10">

      <button
        onClick={calculateBMI}
        className="red-btn flex-1 flex items-center justify-center gap-3 text-lg"
      >

        <Calculator size={22} />

        Calculate BMI

      </button>

      <button
        onClick={resetCalculator}
        className="flex-1 rounded-2xl bg-[#181010] border border-red-900 hover:border-red-500 py-4 font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
      >

        <RotateCcw size={20} />

        Reset

      </button>

    </div>

  </motion.div>
        {/* ================= RESULTS ================= */}

<motion.div
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: .3 }}
  className="glass-card mt-10 p-8"
>

  <div className="flex items-center gap-4 mb-8">

    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 flex items-center justify-center heartbeat">

      <Activity size={30} />

    </div>

    <div>

      <h2 className="text-3xl font-bold">

        BMI Analysis

      </h2>

      <p className="text-gray-400">

        AI Generated Health Report

      </p>

    </div>

  </div>

  {/* Score */}

  <div className="text-center mb-10">

    <motion.h1
      key={bmi}
      initial={{ scale: .7 }}
      animate={{ scale: 1 }}
      className="text-7xl font-black text-red-500"
    >

      {bmi || "--"}

    </motion.h1>

    <p className="text-gray-400 mt-2">

      Body Mass Index

    </p>

  </div>

  {/* Category */}

  <div className="flex justify-center mb-10">

    <div
      className={`px-8 py-3 rounded-full bg-gradient-to-r ${categoryColor} font-bold text-lg shadow-xl`}
    >

      {category || "Not Calculated"}

    </div>

  </div>

  {/* Cards */}

  <div className="grid lg:grid-cols-2 gap-8">

    {/* Healthy Weight */}

    <div className="glass-card p-6">

      <div className="flex items-center gap-3 mb-4">

        <Heart className="text-red-400"/>

        <h3 className="text-2xl font-bold">

          Healthy Weight Range

        </h3>

      </div>

      <h2 className="text-4xl font-extrabold text-green-400">

        {healthyRange || "--"}

      </h2>

      <p className="text-gray-400 mt-3">

        Ideal weight according to your height.

      </p>

    </div>

    {/* Summary */}

    <div className="glass-card p-6">

      <h3 className="text-2xl font-bold text-red-400 mb-5">

        AI Health Summary

      </h3>

      <p className="leading-8 text-gray-300">

        {summary ||
          "Calculate your BMI to receive an AI-powered health summary."}

      </p>

    </div>

  </div>

  {/* Recommendations */}

  <div className="glass-card p-7 mt-8">

    <h2 className="text-2xl font-bold mb-6">

      Recommendations

    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      {tips.length > 0 ? (

        tips.map((tip,index)=>(

          <motion.div
            key={index}
            whileHover={{ scale:1.02 }}
            className="rounded-xl border border-red-900 bg-[#150909] p-5"
          >

            <span className="text-green-400 mr-3">

              ✔

            </span>

            {tip}

          </motion.div>

        ))

      ) : (

        <>
          <div className="rounded-xl border border-red-900 bg-[#150909] p-5">
            ✔ Maintain a balanced diet
          </div>

          <div className="rounded-xl border border-red-900 bg-[#150909] p-5">
            ✔ Exercise regularly
          </div>

          <div className="rounded-xl border border-red-900 bg-[#150909] p-5">
            ✔ Stay hydrated
          </div>

          <div className="rounded-xl border border-red-900 bg-[#150909] p-5">
            ✔ Sleep 7–8 hours
          </div>

        </>

      )}

    </div>

  </div>
    {/* BMI Formula */}

  <div className="glass-card p-7 mt-8">

    <h2 className="text-2xl font-bold text-red-400 mb-5">

      BMI Formula

    </h2>

    <div className="rounded-2xl bg-[#140808] border border-red-900 p-6">

      <p className="text-3xl font-bold text-center">

        BMI =
        <span className="text-red-400">
          {" "}Weight (kg)
        </span>
        {" / "}
        <span className="text-red-400">
          Height² (m²)
        </span>

      </p>

      <p className="text-gray-400 text-center mt-5">

        BMI is calculated by dividing your weight (kg)
        by the square of your height (meters).

      </p>

    </div>

  </div>

  {/* Disclaimer */}

  <div className="mt-8 rounded-3xl border border-red-800 bg-gradient-to-r from-red-950/60 via-red-900/40 to-red-950/60 p-8">

    <h2 className="text-2xl font-bold text-red-300 mb-4">

      ⚠ Medical Disclaimer

    </h2>

    <p className="leading-8 text-gray-300">

      Body Mass Index (BMI) is only a screening tool and
      does not directly measure body fat or overall health.
      Individual health depends on many factors including age,
      muscle mass, gender, lifestyle, genetics and medical history.

      <br /><br />

      Please consult a qualified healthcare professional before
      making any medical or dietary decisions.

    </p>

  </div>

</motion.div>

</div>

);
}