'use client';

import { ReactNode } from 'react';

const CollapsibleField = ({ show, children }: { show: boolean; children: ReactNode }) => {
  return (
    <div
      className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
      style={{ gridTemplateRows: show ? '1fr' : '0fr' }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
};

export default CollapsibleField;
