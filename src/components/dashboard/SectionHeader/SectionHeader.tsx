import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-1.5">
      <h1 className="text-2xl font-black">{title}</h1>
      <p className="text-text-secondary mt-1 text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default SectionHeader;
