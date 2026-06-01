/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

interface SettingsSidebarProps {
  tabs: any[];
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const SettingsSidebar = ({ tabs, activeTab, setActiveTab }: SettingsSidebarProps) => {
  return (
    <div className="w-full rounded-md border border-slate-100 bg-white p-3 shadow-xs lg:w-56 lg:shrink-0 lg:self-start">
      <div className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === tab.key ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsSidebar;
