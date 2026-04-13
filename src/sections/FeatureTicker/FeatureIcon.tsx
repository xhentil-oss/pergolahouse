// FeatureIcon component for FeatureTicker section
import React from "react";

const FeatureIcon = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-2 text-[#344148] font-bold text-lg tracking-widest uppercase">
    {icon}
    {label}
  </span>
);

export default FeatureIcon;
