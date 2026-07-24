import SectionHeader from '@/components/dashboard/SectionHeader/SectionHeader';
import CreateSessionForm from './_components/CreateSessionForm/CreateSessionForm';

const CreateLiveSessionPage = () => {
  return (
    <div className="space-y-4">
      <div className="dashboard-card-container">
        <SectionHeader
          title="Create Live Session"
          description="Fill in the details to schedule a new live session."
        />
      </div>

      <CreateSessionForm />
    </div>
  );
};

export default CreateLiveSessionPage;
