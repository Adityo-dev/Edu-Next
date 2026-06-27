/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ICourseBrief {
  _id: string;
  title: string;
}

export interface IInstructorBrief {
  firstName: string;
  lastName: string;
  avatar: string;
}

// --- Student Specific Types ---
export interface ILiveSessionStatsResponse {
  success: boolean;
  message: string;
  data: {
    liveNow: number;
    upcoming: number;
    attended: number;
  };
}

export interface IStudentLiveSession {
  _id: string;
  title: string;
  description: string;
  meetingLink: string;
  meetingPlatform: string;
  startTime: string;
  durationInMins: number;
  status: 'live' | 'upcoming' | 'completed';
  course: ICourseBrief;
  instructor: IInstructorBrief;
}

export interface IStudentDashboardSessionsResponse {
  success: boolean;
  message: string;
  data: IStudentLiveSession[];
}

export interface IJoinSessionResponse {
  success: boolean;
  message: string;
}

// --- Instructor Specific Types ---
export interface IInstructorLiveSessionStatsResponse {
  success: boolean;
  message: string;
  data: {
    liveNow: number;
    upcoming: number;
    completed: number;
  };
}

export interface IInstructorLiveSession {
  _id: string;
  title: string;
  description: string;
  meetingLink: string;
  meetingPlatform: string;
  startTime: string;
  durationInMins: number;
  status: 'live' | 'upcoming' | 'completed';
  totalUsersRegistered: number;
  course: ICourseBrief;
}

export interface IInstructorDashboardSessionsResponse {
  success: boolean;
  message: string;
  data: IInstructorLiveSession[];
}

export interface IScheduleSessionPayload {
  courseId: string;
  title: string;
  description: string;
  meetingLink: string;
  meetingPlatform: string;
  startTime: string;
  durationInMins: number;
}

export interface IUpdateSessionPayload {
  title?: string;
  description?: string;
  meetingLink?: string;
  meetingPlatform?: string;
  startTime?: string;
  durationInMins?: number;
  status?: 'live' | 'upcoming' | 'completed';
}

export interface ICourseSessionsResponse {
  success: boolean;
  message: string;
  data: any[];
}
