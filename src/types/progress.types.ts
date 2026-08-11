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
}
