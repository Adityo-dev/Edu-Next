/* eslint-disable no-unused-vars */
import { Plus } from 'lucide-react';

interface LiveSessionsHeaderProps {
  showCreate: boolean;
  setShowCreate: (show: boolean) => void;
}

const LiveSessionsHeader = ({ showCreate, setShowCreate }: LiveSessionsHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-text-primary text-2xl font-black">Live Sessions</h1>
        <p className="text-text-secondary mt-1 text-sm">Schedule and manage your live classes.</p>
      </div>
      <button
        onClick={() => setShowCreate(!showCreate)}
        className="bg-primary flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2a6159]"
      >
        <Plus size={16} />
        Schedule Session
      </button>
    </div>
  );
};

export default LiveSessionsHeader;
