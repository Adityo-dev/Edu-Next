const quizHistory = [
  {
    course: 'Web Development',
    quiz: 'JavaScript Fundamentals',
    score: 90,
    date: 'Apr 20',
    passed: true,
  },
  { course: 'UI/UX Design', quiz: 'Design Principles', score: 82, date: 'Apr 18', passed: true },
  { course: 'Digital Marketing', quiz: 'SEO Basics', score: 75, date: 'Apr 15', passed: true },
  { course: 'Web Development', quiz: 'HTML & CSS Basics', score: 95, date: 'Apr 10', passed: true },
  { course: 'Freelancing', quiz: 'Client Management', score: 60, date: 'Apr 5', passed: false },
];

const QuizHistoryTab = () => {
  return (
    <div className="dashboard-card-container p-0">
      <div className="divide-y divide-slate-100">
        {quizHistory.map((quiz, i) => (
          <div key={i} className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              {/* Score Circle */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                  quiz.score >= 80
                    ? 'text-primary bg-emerald-50'
                    : quiz.score >= 60
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-500'
                }`}
              >
                {quiz.score}%
              </div>
              <div>
                <p className="text-sm font-bold">{quiz.quiz}</p>
                <p className="text-text-secondary text-xs">{quiz.course}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-secondary text-xs">{quiz.date}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                  quiz.passed ? 'text-primary bg-emerald-50' : 'bg-red-50 text-red-500'
                }`}
              >
                {quiz.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizHistoryTab;
