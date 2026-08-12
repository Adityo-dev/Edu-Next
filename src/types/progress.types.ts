export interface IStudentOverallProgress {
  overallPercentage: number;
  lessonsDone: {
    completed: number;
    total: number;
  };
  quizzesPassed: {
    completed: number;
    total: number;
  };
  coursesDone: {
    completed: number;
    total: number;
  };
}

export interface IStudentSummaryCards {
  lessonsCompleted: {
    value: number;
    subtitle: string;
  };
  hoursLearned: {
    value: string;
    subtitle: string;
  };
  quizAverage: {
    value: string;
    subtitle: string;
  };
  certificates: {
    value: number;
    subtitle: string;
  };
}

export interface IStudentWeeklyActivity {
  day: string;
  hours: number;
  minutes: number;
  timeText: string;
}

export interface IStudentWeeklyActivityResponse {
  success: boolean;
  message: string;
  data: IStudentWeeklyActivity[];
  currentStreak: number;
}

export interface IStudentAchievement {
  id: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  icon: string;
}

export interface IStudentWeeklyGoal {
  hoursLearnedThisWeek?: number;
  hoursLearnedText?: string;
  weeklyGoalHours?: number;
  lessonsCompletedThisWeek: number;
  weeklyGoal?: number;
  percentile: number;
  percentileText: string;
  progressText: string;
}
