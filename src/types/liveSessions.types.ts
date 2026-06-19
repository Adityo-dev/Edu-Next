// common sheared interface
export interface CourseInfo {
  _id: string;
  title: string;
}

export interface InstructorInfo {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Student Dashboard Type
export interface StudentLiveSession {
  _id: string;
  title: string;
  description: string;
  meetingLink: string;
  meetingPlatform: string;
  startTime: string;
  durationInMins: number;
  status: 'live' | 'upcoming' | 'completed';
  course: CourseInfo;
  instructor: InstructorInfo;
}

export interface StudentStats {
  liveNow: number;
  upcoming: number;
  attended: number;
}

// Instructor Dashboard Type
export interface InstructorLiveSession {
  _id: string;
  title: string;
  description: string;
  meetingLink: string;
  meetingPlatform: string;
  startTime: string;
  durationInMins: number;
  status: 'live' | 'upcoming' | 'completed';
  totalUsersRegistered: number;
  course: CourseInfo;
}

export interface InstructorStats {
  liveNow: number;
  upcoming: number;
  completed: number;
}
