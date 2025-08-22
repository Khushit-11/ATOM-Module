import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface QuizProps {
  currentAtom: {
    protons: number;
    neutrons: number;
    electrons: number;
  };
}

const Quiz: React.FC<QuizProps> = ({ currentAtom }) => {
  const { isDarkMode } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions = [
    {
      question: `What is the atomic number of the current element?`,
      options: [
        currentAtom.protons,
        currentAtom.protons + 1,
        currentAtom.protons - 1,
        currentAtom.neutrons
      ],
      correct: 0,
      explanation: "The atomic number equals the number of protons in the nucleus."
    },
    {
      question: `What is the mass number of the current atom?`,
      options: [
        currentAtom.protons + currentAtom.neutrons,
        currentAtom.protons,
        currentAtom.neutrons,
        currentAtom.electrons
      ],
      correct: 0,
      explanation: "Mass number = protons + neutrons"
    },
    {
      question: `Is this atom neutral, positive, or negative?`,
      options: [
        currentAtom.protons === currentAtom.electrons ? "Neutral" : 
          currentAtom.protons > currentAtom.electrons ? "Positive (Cation)" : "Negative (Anion)",
        currentAtom.protons === currentAtom.electrons ? "Positive (Cation)" : "Neutral",
        "Always neutral",
        "Cannot determine"
      ],
      correct: 0,
      explanation: currentAtom.protons === currentAtom.electrons 
        ? "Equal protons and electrons make the atom neutral."
        : currentAtom.protons > currentAtom.electrons 
        ? "More protons than electrons make it a positive ion (cation)."
        : "More electrons than protons make it a negative ion (anion)."
    },
    {
      question: `How many electron shells does this atom have?`,
      options: [
        Math.min(3, Math.ceil(currentAtom.electrons <= 2 ? 1 : currentAtom.electrons <= 10 ? 2 : 3)),
        1,
        2,
        4
      ],
      correct: 0,
      explanation: "Electrons fill shells: K(2), L(8), M(8), etc."
    }
  ];

  useEffect(() => {
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  }, [currentAtom]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const isQuizComplete = answeredQuestions.every(answered => answered);
  const question = questions[currentQuestion];

  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg border ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Atomic Structure Quiz
          </h2>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Test your understanding of the current atom
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <button
            onClick={resetQuiz}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-2 rounded-full mb-6 ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
      }`}>
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className={`text-lg font-medium mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showCorrectAnswer = showResult && isCorrect;
            const showWrongAnswer = showResult && isSelected && !isCorrect;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={answeredQuestions[currentQuestion]}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showCorrectAnswer
                    ? 'border-green-500 bg-green-100 text-green-800'
                    : showWrongAnswer
                    ? 'border-red-500 bg-red-100 text-red-800'
                    : isSelected && !showResult
                    ? isDarkMode
                      ? 'border-blue-500 bg-blue-900 text-blue-100'
                      : 'border-blue-500 bg-blue-100 text-blue-800'
                    : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-gray-200 hover:border-gray-500'
                    : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400'
                } ${!answeredQuestions[currentQuestion] ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-not-allowed'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && (
                    <span>
                      {showCorrectAnswer && <CheckCircle className="text-green-600" size={20} />}
                      {showWrongAnswer && <XCircle className="text-red-600" size={20} />}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-lg ${
          selectedAnswer === question.correct
            ? isDarkMode
              ? 'bg-green-900 text-green-100'
              : 'bg-green-100 text-green-800'
            : isDarkMode
            ? 'bg-red-900 text-red-100'
            : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {selectedAnswer === question.correct ? (
              <CheckCircle size={18} />
            ) : (
              <XCircle size={18} />
            )}
            <span className="font-medium">
              {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect!'}
            </span>
          </div>
          <p className="text-sm">{question.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Score: {score} / {questions.length}
        </div>
        
        {showResult && !isQuizComplete && (
          <button
            onClick={nextQuestion}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
              isDarkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Next Question
          </button>
        )}
        
        {isQuizComplete && (
          <div className="flex items-center space-x-2">
            <Trophy className={`${
              score >= questions.length * 0.7 ? 'text-yellow-500' : 'text-gray-500'
            }`} size={20} />
            <span className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Quiz Complete! {score >= questions.length * 0.7 ? 'Great job!' : 'Keep practicing!'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;