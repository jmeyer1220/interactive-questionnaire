import React from 'react';
import * as RadioGroup from '..components/ui/react-radio-group';

const Question = ({ question, options, type, onAnswer }) => {
  const [textValue, setTextValue] = React.useState('');

  const handleTextSubmit = () => {
    onAnswer(textValue, question.next);
  };

  if (type === 'text') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{question}</h2>
        <textarea
          className="w-full p-2 border rounded-md"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          rows={4}
        />
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleTextSubmit}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <RadioGroup.Root className="flex flex-col space-y-2">
        {options.map((option, index) => (
          <RadioGroup.Item 
            key={index} 
            value={option.label} 
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onAnswer(option.label, option.next)}
          >
            {option.label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default Question;