import {
  FileText,
  Pill,
  Activity,
  Calculator,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

export default function QuickActions() {
  return (
    <div>

      <h2 className="text-2xl font-bold text-white mb-6">
        Quick Actions
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <QuickActionCard
          title="Medical Report"
          description="Upload and analyze reports"
          icon={<FileText />}
          path="/medical-report"
        />

        <QuickActionCard
          title="Prescription"
          description="Understand medicines"
          icon={<Pill />}
          path="/prescription"
        />

        <QuickActionCard
          title="Symptoms"
          description="AI Symptom Checker"
          icon={<Activity />}
          path="/symptom-checker"
        />

        <QuickActionCard
          title="BMI"
          description="Calculate Body Mass Index"
          icon={<Calculator />}
          path="/bmi"
        />

      </div>

    </div>
  );
}