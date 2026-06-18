/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Save } from 'lucide-react';

interface NotificationSettingsProps {
  notifications: any;
  setNotifications: (n: any) => void;
}

const NotificationSettings = ({ notifications, setNotifications }: NotificationSettingsProps) => {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold">Notification Preferences</h2>
      <div className="space-y-3">
        {[
          {
            key: 'newEnrollment',
            label: 'New Student Enrollment',
            desc: 'When someone enrolls in your course',
          },
          {
            key: 'newReview',
            label: 'New Review',
            desc: 'When a student leaves a review',
          },
          {
            key: 'withdrawal',
            label: 'Withdrawal Updates',
            desc: 'When your withdrawal is processed',
          },
          {
            key: 'courseApproval',
            label: 'Course Approval',
            desc: 'When admin approves or rejects your course',
          },
          {
            key: 'marketing',
            label: 'Platform Updates',
            desc: 'News and feature updates from EduNext',
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between rounded-sm border border-slate-100 px-5 py-4"
          >
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-text-secondary text-xs">{item.desc}</p>
            </div>
            <button
              onClick={() =>
                setNotifications({
                  ...notifications,
                  [item.key]: !notifications[item.key as keyof typeof notifications],
                })
              }
              className={`relative h-6 w-11 rounded-full transition-all duration-300 ${notifications[item.key as keyof typeof notifications] ? 'bg-primary' : 'bg-slate-200'}`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${notifications[item.key as keyof typeof notifications] ? 'left-5' : 'left-0.5'}`}
              />
            </button>
          </div>
        ))}
      </div>
      <button className="bg-primary flex items-center gap-2 rounded-sm px-6 py-3 text-sm font-bold text-white hover:bg-[#2a6159]">
        <Save size={15} /> Save Preferences
      </button>
    </div>
  );
};

export default NotificationSettings;
