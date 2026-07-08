import {
  FileText,
  Pill,
  Calculator,
} from "lucide-react";

const activities = [
  {
    icon: <FileText size={20} />,
    title: "Medical Report Analyzed",
    time: "2 hours ago",
  },
  {
    icon: <Pill size={20} />,
    title: "Prescription Explained",
    time: "Yesterday",
  },
  {
    icon: <Calculator size={20} />,
    title: "BMI Calculated",
    time: "2 days ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-[#111111] rounded-2xl border border-gray-800 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-800 pb-4"
          >
            <div className="flex items-center gap-4">

              <div className="bg-red-600 p-3 rounded-xl text-white">
                {item.icon}
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.time}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}