import React from 'react';
import Quiz from '../components/Quiz';

const QuizPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Interactive Quiz</h1>
      <Quiz />
    </div>
  );
};

export default QuizPage;