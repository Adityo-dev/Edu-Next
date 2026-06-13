import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-text-secondary mt-1 text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default SectionHeader;
