import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconColor?: string;
  className?: string;
}

const StatsCard = ({
  label,
  value,
  sub,
  icon: Icon,
  iconColor = '#34796f',
  className = '',
}: StatsCardProps) => {
  // Append '1A' for 10% opacity in hex
  const bgWithOpacity = `${iconColor}1A`;

  return (
    <div
      className={`dashboard-card-container p-4 transition-all hover:border-emerald-100 hover:shadow-sm ${className}`}
    >
      <div
        className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-sm"
        style={{ color: iconColor, backgroundColor: bgWithOpacity }}
      >
        <Icon size={20} />
      </div>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      {sub && <p className="text-text-secondary mt-0.5 text-xs font-medium">{sub}</p>}
    </div>
  );
};

export default StatsCard;
