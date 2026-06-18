'use client';

interface CertificatesStatsProps {
  earnedCount: number;
  inProgressCount: number;
}

const CertificatesStats = ({ earnedCount, inProgressCount }: CertificatesStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div className="dashboard-card-container text-center">
        <p className="text-primary text-3xl font-black">{earnedCount}</p>
        <p className="text-text-secondary text-sm">Certificates Earned</p>
      </div>
      <div className="dashboard-card-container text-center">
        <p className="text-3xl font-black text-blue-500">{inProgressCount}</p>
        <p className="text-text-secondary text-sm">In Progress</p>
      </div>
      <div className="dashboard-card-container col-span-2 text-center sm:col-span-1">
        <p className="text-3xl font-black text-yellow-500">50%</p>
        <p className="text-text-secondary text-sm">Overall Completion</p>
      </div>
    </div>
  );
};

export default CertificatesStats;
