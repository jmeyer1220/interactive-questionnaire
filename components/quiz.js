import React, { useState } from 'react';
import Question from './question.js';
import Result from './result.js';

const questions = {
  start: {
    question: "Which of the following describes your organization type?",
    type: "radio",
    options: [
      { label: "Church Plant", next: "churchPlant" },
      { label: "Established Church", next: "churchSize" },
      { label: "Church Network or Denomination", next: "churchNetwork" },
      { label: "Non-Profit", next: "nonProfitType" },
      { label: "For-Profit", next: "forProfitType" },
    ],
  },
  churchSize: {
    question: "What size is your church's average weekly attendance?",
    type: "radio",
    options: [
      { label: "Less than 250", next: "smallChurch" },
      { label: "250–1,000", next: "mediumChurch" },
      { label: "Over 1,000", next: "largeChurch" },
      { label: "Over 1,000 with multiple campuses or sites", next: "multiSiteChurch" },
    ],
  },
  churchPlant: {
    question: "Tell us about your vision for your church plant.",
    type: "text",
    next: "end",
  },
  smallChurch: {
    question: "What are the main challenges your small church is facing?",
    type: "text",
    next: "end",
  },
  // Add more questions here...
};

const Quiz = () => {
  const [currentQuestionKey, setCurrentQuestionKey] = useState('start');
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer, nextKey) => {
    setAnswers([...answers, { question: questions[currentQuestionKey].question, answer }]);
    setCurrentQuestionKey(nextKey);
  };

  if (currentQuestionKey === 'end') {
    return <Result answers={answers} />;
  }

  const currentQuestion = questions[currentQuestionKey];

  return (
    <div className="p-4">
      <Question 
        question={currentQuestion.question} 
        options={currentQuestion.options} 
        type={currentQuestion.type}
        onAnswer={handleAnswer} 
      />
    </div>
  );
};

export default Quiz;