'use client';

import { useState } from 'react';
import CreateSessionForm from './_components/CreateSessionForm/CreateSessionForm';
import LiveSessionsHeader from './_components/LiveSessionsHeader/LiveSessionsHeader';
import LiveSessionsList from './_components/LiveSessionsList/LiveSessionsList';
import LiveSessionsStats from './_components/LiveSessionsStats/LiveSessionsStats';

const InstructorLiveSessionsPage = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <LiveSessionsHeader showCreate={showCreate} setShowCreate={setShowCreate} />
      {/* Create Form */}
      {showCreate && <CreateSessionForm setShowCreate={setShowCreate} />}
      {/* Stats */}
      <LiveSessionsStats />
      {/* Sessions */}
      <LiveSessionsList />
    </div>
  );
};

export default InstructorLiveSessionsPage;
