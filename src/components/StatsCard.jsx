import React from "react";

const StatsCard = ({ title, count }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center text-white shadow-lg">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default StatsCard;
