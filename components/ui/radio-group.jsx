import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

const Question = ({ question, options, onAnswer }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <RadioGroup.Root 
        className="flex flex-col space-y-2"
        onValueChange={(value) => {
          const selectedOption = options.find(option => option.label === value);
          if (selectedOption) {
            onAnswer(selectedOption.label, selectedOption.next);
          }
        }}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <RadioGroup.Item 
              value={option.label} 
              id={`option-${index}`}
              className="w-5 h-5 rounded-full border border-gray-300 mr-2"
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full after:bg-blue-600" />
            </RadioGroup.Item>
            <label 
              htmlFor={`option-${index}`}
              className="flex-1 p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default Question;