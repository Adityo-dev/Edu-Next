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
      <p className="text-xl font-black break-words sm:text-2xl">{value}</p>
      <p className="text-xs font-semibold break-words text-slate-600 sm:text-sm">{label}</p>
      {sub && (
        <p className="text-text-secondary mt-0.5 text-[10px] font-medium break-words sm:text-xs">
          {sub}
        </p>
      )}
    </div>
  );
};

export default StatsCard;
