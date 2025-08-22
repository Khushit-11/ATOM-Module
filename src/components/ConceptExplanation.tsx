import React from 'react';
import { BookOpen, Atom, Zap, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ConceptExplanation: React.FC = () => {
  const { isDarkMode } = useTheme();

  const concepts = [
    {
      icon: Atom,
      title: "What is an Atom?",
      content: "An atom is the smallest unit of matter that retains the properties of an element. It consists of a nucleus (containing protons and neutrons) surrounded by electrons in shells or energy levels."
    },
    {
      icon: Target,
      title: "Atomic Structure",
      content: "The nucleus is at the center and contains positively charged protons and neutral neutrons. Electrons with negative charge orbit the nucleus in specific energy levels called electron shells."
    },
    {
      icon: Zap,
      title: "Electron Shells",
      content: "Electrons occupy shells around the nucleus. The first shell (K) holds 2 electrons, the second shell (L) holds 8 electrons, and the third shell (M) holds 8 electrons for the first 18 elements."
    },
    {
      icon: BookOpen,
      title: "Key Terms",
      content: "• Atomic Number: Number of protons\n• Mass Number: Protons + Neutrons\n• Ion: Atom with unequal protons and electrons\n• Isotope: Same element with different neutrons"
    }
  ];

  return (
    <div className="space-y-4">
      {concepts.map((concept, index) => (
        <div
          key={index}
          className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg border ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          } hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <concept.icon className={`w-6 h-6 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {concept.title}
              </h3>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {concept.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConceptExplanation;