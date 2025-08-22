import React, { useState } from 'react';
import { Sun, Moon, Atom, BookOpen, Brain, Lightbulb } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import AtomVisualization from './components/AtomVisualization';
import ControlPanel from './components/ControlPanel';
import Quiz from './components/Quiz';
import ConceptExplanation from './components/ConceptExplanation';

const AppContent: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [protons, setProtons] = useState(6);
  const [neutrons, setNeutrons] = useState(6);
  const [electrons, setElectrons] = useState(6);
  const [activeTab, setActiveTab] = useState<'visualizer' | 'concepts' | 'quiz'>('visualizer');

  const tabs = [
    { id: 'visualizer' as const, label: 'Atom Visualizer', icon: Atom },
    { id: 'concepts' as const, label: 'Learn Concepts', icon: BookOpen },
    { id: 'quiz' as const, label: 'Test Knowledge', icon: Brain },
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}>
                <Atom className={`w-6 h-6 ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Atomic Structure Explorer
                </h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Interactive Learning for Class 10
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex space-x-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? isDarkMode
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 shadow-lg'
                  : isDarkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Atom Visualizer Tab */}
        {activeTab === 'visualizer' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Visualization */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Interactive Atom Model
                </h2>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Adjust the sliders to explore different atomic structures
                </p>
              </div>
              <AtomVisualization 
                protons={protons} 
                neutrons={neutrons} 
                electrons={electrons} 
              />
            </div>

            {/* Controls */}
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Atomic Controls
                </h3>
                <ControlPanel
                  protons={protons}
                  neutrons={neutrons}
                  electrons={electrons}
                  onProtonsChange={setProtons}
                  onNeutronsChange={setNeutrons}
                  onElectronsChange={setElectrons}
                />
              </div>

              {/* Fun Fact */}
              <div className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100'
              } border ${
                isDarkMode ? 'border-purple-700' : 'border-purple-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className={`w-5 h-5 ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`} />
                  <span className={`font-medium ${
                    isDarkMode ? 'text-purple-200' : 'text-purple-800'
                  }`}>
                    Did you know?
                  </span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  If an atom were the size of a football stadium, the nucleus would be about the size of a marble at the center!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Concepts Tab */}
        {activeTab === 'concepts' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Understanding Atomic Structure
              </h2>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Master the fundamental concepts of atoms and their components
              </p>
            </div>
            <ConceptExplanation />
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className={`text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Test Your Knowledge
              </h2>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Answer questions based on the current atom configuration
              </p>
            </div>
            <Quiz currentAtom={{ protons, neutrons, electrons }} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Built for Class 10 students to explore and understand atomic structure interactively
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;