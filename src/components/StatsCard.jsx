import React from "react";

const StatsCard = ({ title, count, color }) => {
  // Map color names to Tailwind classes
  const colorClasses = {
    gray: " text-gray-300",
    orange: " text-yellow-500",
    green: "text-green-400",
    blue: " text-blue-400",
  };

  return (
    <div
      className={`bg-white/10 backdrop-blur-lg border-2 rounded-xl p-4 text-center shadow-lg ${
        colorClasses[color] || "border-white text-white"
      }`}
    >
      <p className="text-md font-bold">{title}</p>
      <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default StatsCard;
