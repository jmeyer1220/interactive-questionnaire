import React, { useState, useEffect } from "react";
import ThemeToggle from "../components/Switch"; // Adjust the path accordingly

const archetypes = [
  "Visionary",
  "Creator",
  "Mentor",
  "Healer",
  "Leader",
  "Hero",
  "Romantic/Worshipper",
  "Everyman",
  "Maverick",
  "Optimist",
  "Entertainer",
  "Explorer",
];

const questions = [
  {
    question:
      "You have a mission to reach people. How does your brand work to change lives?",
    options: [
      {
        text: "Vision and inspiration",
        archetypes: ["Visionary", "Creator"],
        weight: 2,
      },
      { text: "Clarity and understanding", archetypes: ["Mentor"], weight: 2 },
      { text: "Help and healing", archetypes: ["Healer"], weight: 2 },
      {
        text: "Direction, instruction, or leadership",
        archetypes: ["Leader", "Hero"],
        weight: 2,
      },
      {
        text: "Connection and relational support",
        archetypes: ["Romantic/Worshipper", "Everyman"],
        weight: 2,
      },
      {
        text: "A conduit for real change",
        archetypes: ["Maverick", "Optimist"],
        weight: 2,
      },
      { text: "Entertainment and fun", archetypes: ["Entertainer"], weight: 2 },
      { text: "Freedom and liberation", archetypes: ["Explorer"], weight: 2 },
    ],
  },
  {
    question: "What do you look for in key staff or volunteers for your brand?",
    options: [
      {
        text: "Knowledge and experience",
        archetypes: ["Leader", "Mentor"],
        weight: 2,
      },
      {
        text: "Fearlessness and enthusiasm",
        archetypes: ["Explorer", "Hero"],
        weight: 2,
      },
      {
        text: "Sociability and sense of humor",
        archetypes: ["Entertainer"],
        weight: 2,
      },
      {
        text: "Kindness and empathy",
        archetypes: ["Healer", "Everyman"],
        weight: 2,
      },
      { text: "Optimism and humility", archetypes: ["Optimist"], weight: 2 },
      {
        text: "Innovation and creativity",
        archetypes: ["Creator", "Visionary"],
        weight: 2,
      },
      {
        text: "Sincerity and vulnerability",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      {
        text: "Boldness and assertiveness",
        archetypes: ["Maverick"],
        weight: 2,
      },
    ],
  },
  {
    question:
      "How would you finish the following sentence when it comes to your brand: 'We are successful if those we serve feel…'",
    options: [
      { text: "Safe and nurtured", archetypes: ["Healer"], weight: 2 },
      {
        text: "Empowered to make big decisions",
        archetypes: ["Leader", "Maverick"],
        weight: 2,
      },
      {
        text: "Lighter, happier, and more carefree",
        archetypes: ["Entertainer"],
        weight: 2,
      },
      {
        text: "Heard and understood",
        archetypes: ["Mentor", "Everyman"],
        weight: 2,
      },
      {
        text: "Excited about what's next",
        archetypes: ["Explorer", "Visionary"],
        weight: 2,
      },
      {
        text: "Less alone and more appreciated",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      { text: "Hopeful and assured", archetypes: ["Optimist"], weight: 2 },
      { text: "Inspired and imaginative", archetypes: ["Creator"], weight: 2 },
      { text: "Liberated and fulfilled", archetypes: ["Hero"], weight: 2 },
    ],
  },
  {
    question:
      "Which of the following attributes feel the most like your brand?",
    options: [
      {
        text: "Independent. Brave. Self-sufficient.",
        archetypes: ["Explorer"],
        weight: 2,
      },
      { text: "Wise. Honest. Guiding.", archetypes: ["Mentor"], weight: 2 },
      {
        text: "Nurturing. Trustworthy. Compassionate.",
        archetypes: ["Healer"],
        weight: 2,
      },
      {
        text: "Creative. Inspirational. Daring.",
        archetypes: ["Creator"],
        weight: 2,
      },
      {
        text: "Refined. Confident. Experienced.",
        archetypes: ["Leader"],
        weight: 2,
      },
      {
        text: "Hopeful, Kind, Good-Natured.",
        archetypes: ["Optimist"],
        weight: 2,
      },
      {
        text: "Supportive. Friendly. Humble.",
        archetypes: ["Everyman"],
        weight: 2,
      },
      {
        text: "Casual. Funny. Playful.",
        archetypes: ["Entertainer"],
        weight: 2,
      },
      {
        text: "Sincere. Affectionate. Personal.",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      {
        text: "Courageous. Bold. Self-Sacrificing.",
        archetypes: ["Hero"],
        weight: 2,
      },
      {
        text: "Perceptive. Influential. Driven.",
        archetypes: ["Visionary"],
        weight: 2,
      },
      {
        text: "Original. Non-conforming. Rebellious.",
        archetypes: ["Maverick"],
        weight: 2,
      },
    ],
  },
  {
    question:
      "Which of these phrases or one-liners feel closest to your brand?",
    options: [
      {
        text: "We believe in contributing to the common good, and in shared prosperity where everyone everywhere has the opportunity to thrive.",
        archetypes: ["Optimist"],
        weight: 2,
      },
      {
        text: "Our innovations have indelibly marked history and bear witness to our founder's unending quest for excellence.",
        archetypes: ["Leader"],
        weight: 2,
      },
      {
        text: "Founded on the simple idea of creating innovative products that change the world, our products empower everyone, everywhere to imagine, create, and bring any experience to life.",
        archetypes: ["Creator"],
        weight: 2,
      },
      {
        text: "We seek the truth and help people understand the world.",
        archetypes: ["Mentor"],
        weight: 2,
      },
      {
        text: "Exploration is our oxygen. It shapes who we are, what we stand for and what we strive for. Because the path of discovery is also the path of progression.",
        archetypes: ["Explorer"],
        weight: 2,
      },
      {
        text: "We're known for challenging the status quo and shaking up markets, while championing people and the planet.",
        archetypes: ["Maverick"],
        weight: 2,
      },
      {
        text: "We believe powerful ideas, powerfully presented, move us: to feel something, to think differently, to take action.",
        archetypes: ["Visionary"],
        weight: 2,
      },
      {
        text: "With a global footprint, culture of innovation, and team-first mentality, we take action to create a future of continual progress for our world.",
        archetypes: ["Hero"],
        weight: 2,
      },
      {
        text: "We believe that luxury is found wherever you are – in moments large and small. Here's to choosing comfort every time.",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      {
        text: "We create a world where everyone feels they belong through the power of fun to include everyone.",
        archetypes: ["Entertainer"],
        weight: 2,
      },
      {
        text: "We're here to help all families discover the joy of everyday life.",
        archetypes: ["Everyman"],
        weight: 2,
      },
      {
        text: "We are a healing place for a hurting world.",
        archetypes: ["Healer"],
        weight: 2,
      },
    ],
  },
  {
    question: "Which of these taglines appeal to you?",
    options: [
      {
        text: "We don't care how everyone else does it.",
        archetypes: ["Maverick"],
        weight: 2,
      },
      { text: "Refresh the world.", archetypes: ["Visionary"], weight: 2 },
      {
        text: "Our world evolves around you.",
        archetypes: ["Hero"],
        weight: 2,
      },
      {
        text: "Premium care designed for you.",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      { text: "Get more awesomeness.", archetypes: ["Entertainer"], weight: 2 },
      { text: "Save money. Live better.", archetypes: ["Everyman"], weight: 2 },
      {
        text: "You can do good and feel good at the same time.",
        archetypes: ["Optimist"],
        weight: 2,
      },
      { text: "Lead the charge.", archetypes: ["Leader"], weight: 2 },
      { text: "Do it all.", archetypes: ["Creator"], weight: 2 },
      { text: "Healthy. It's our nature.", archetypes: ["Healer"], weight: 2 },
      {
        text: "What you do makes a difference. What kind of difference will you make?",
        archetypes: ["Mentor"],
        weight: 2,
      },
      { text: "Share in the adventure.", archetypes: ["Explorer"], weight: 2 },
    ],
  },
  {
    question: "Which of these taglines appeal to you?",
    options: [
      {
        text: "The snack that smiles back.",
        archetypes: ["Entertainer"],
        weight: 2,
      },
      {
        text: "Make living easy and affordable for everyone.",
        archetypes: ["Optimist"],
        weight: 2,
      },
      { text: "Live well where you are.", archetypes: ["Healer"], weight: 2 },
      { text: "Don't wannabe.", archetypes: ["Maverick"], weight: 2 },
      {
        text: "We're here to put a dent in the universe.",
        archetypes: ["Visionary"],
        weight: 2,
      },
      {
        text: "Exploration is our oxygen.",
        archetypes: ["Explorer"],
        weight: 2,
      },
      {
        text: "You can do it. We can help.",
        archetypes: ["Everyman"],
        weight: 2,
      },
      {
        text: "The pinnacle of electric luxury.",
        archetypes: ["Leader"],
        weight: 2,
      },
      {
        text: "We strive to be deeply connected to individual stories.",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      {
        text: "Inspire and Develop the Builders of Tomorrow.",
        archetypes: ["Creator"],
        weight: 2,
      },
      {
        text: "Never put passion in front of principle. Even if you win, you lose.",
        archetypes: ["Mentor"],
        weight: 2,
      },
      { text: "#YouGotThis", archetypes: ["Hero"], weight: 2 },
    ],
  },
  {
    question: "Which of these headlines appeal to you?",
    options: [
      { text: "Smell confident.", archetypes: ["Entertainer"], weight: 2 },
      { text: "Find your calm.", archetypes: ["Healer"], weight: 2 },
      {
        text: "Only the stupid can be truly brilliant.",
        archetypes: ["Maverick"],
        weight: 2,
      },
      {
        text: "A place where creativity lives and thrives because it's powered by people.",
        archetypes: ["Creator"],
        weight: 2,
      },
      {
        text: "We're here to inspire you every day.",
        archetypes: ["Visionary"],
        weight: 2,
      },
      {
        text: "A haven of serenity, where time stands still and noise fades to birdsong.",
        archetypes: ["Romantic/Worshipper"],
        weight: 2,
      },
      {
        text: "Standing up for what matters and leaving things better than we find them.",
        archetypes: ["Optimist"],
        weight: 2,
      },
      {
        text: "Take Control of Your Money.",
        archetypes: ["Leader"],
        weight: 2,
      },
      {
        text: "Solving the world's toughest problems — one person at a time.",
        archetypes: ["Mentor"],
        weight: 2,
      },
      {
        text: "Take the road less traveled.",
        archetypes: ["Explorer"],
        weight: 2,
      },
      { text: "All in or nothing.", archetypes: ["Hero"], weight: 2 },
      {
        text: "Not fancy. Just real. (And there will be donuts.)",
        archetypes: ["Everyman"],
        weight: 2,
      },
    ],
  },
];

const ArchetypeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [theme, toggleTheme] = useDarkMode();

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // setTheme(savedTheme); // setTheme is not returned by useDarkMode
      // Instead, call the toggleTheme function to update the theme state
      toggleTheme();
    }
  }, []);

  // Apply theme to the document on theme change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };
      if (!newAnswers[questionIndex]) {
        newAnswers[questionIndex] = [];
      }
      const optionIndexInAnswers =
        newAnswers[questionIndex].indexOf(optionIndex);
      if (optionIndexInAnswers > -1) {
        newAnswers[questionIndex].splice(optionIndexInAnswers, 1);
      } else if (newAnswers[questionIndex].length < 3) {
        newAnswers[questionIndex].push(optionIndex);
      }
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const scores = {};
    archetypes.forEach((archetype) => (scores[archetype] = 0));

    Object.entries(answers).forEach(([questionIndex, selectedOptions]) => {
      selectedOptions.forEach((optionIndex) => {
        const option = questions[questionIndex].options[optionIndex];
        option.archetypes.forEach((archetype) => {
          scores[archetype] += option.weight;
        });
      });
    });

    const sortedResults = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setResults(sortedResults);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmitEmail = async () => {
    if (!validateEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Replace this with your actual API endpoint
      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          results,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit results");
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitError("Failed to submit results. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (results) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Top 3 Archetypes
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {results.map(([archetype, score], index) => (
              <div
                key={archetype}
                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt className="text-sm font-medium text-gray-500">
                  {index + 1}. {archetype}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(score / (questions.length * 2)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <input
            type="email"
            placeholder="Enter your email for full results"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
          {submitError && (
            <p className="mt-2 text-sm text-red-600">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="mt-2 text-sm text-green-600">
              Results sent successfully!
            </p>
          )}
          <button
            onClick={handleSubmitEmail}
            disabled={isSubmitting}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Get Full Results"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl leading-6 font-bold text-gray-900">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
      </div>
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <p className="mb-4 text-lg text-gray-500">
          {questions[currentQuestion].question}
        </p>
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`question-${currentQuestion}-option-${index}`}
              checked={answers[currentQuestion]?.includes(index) || false}
              onChange={() => handleOptionChange(currentQuestion, index)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={`question-${currentQuestion}-option-${index}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option.text}
            </label>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          onClick={handleNext}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-copper-400 hover:bg-copper-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper-100"
        >
          {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default ArchetypeQuiz;

function useDarkMode() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return [theme, toggleTheme];
}
