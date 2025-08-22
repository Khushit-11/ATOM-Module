import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ControlPanelProps {
  protons: number;
  neutrons: number;
  electrons: number;
  onProtonsChange: (value: number) => void;
  onNeutronsChange: (value: number) => void;
  onElectronsChange: (value: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  protons,
  neutrons,
  electrons,
  onProtonsChange,
  onNeutronsChange,
  onElectronsChange
}) => {
  const { isDarkMode } = useTheme();

  const SliderControl = ({ 
    label, 
    value, 
    onChange, 
    max, 
    color 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max: number;
    color: string;
  }) => (
    <div className={`p-4 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg border ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <label className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {label}
        </label>
        <span className={`text-lg font-bold px-3 py-1 rounded-lg ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider-${color}`}
          style={{
            background: `linear-gradient(to right, ${color} 0%, ${color} ${(value/max)*100}%, ${
              isDarkMode ? '#374151' : '#e5e7eb'
            } ${(value/max)*100}%, ${
              isDarkMode ? '#374151' : '#e5e7eb'
            } 100%)`
          }}
        />
        <style>
          {`
            .slider-${color.replace('#', '')}::-webkit-slider-thumb {
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${color};
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              border: 2px solid white;
            }
            .slider-${color.replace('#', '')}::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${color};
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            }
          `}
        </style>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );

  const resetAtom = () => {
    onProtonsChange(1);
    onNeutronsChange(0);
    onElectronsChange(1);
  };

  const createPresetAtom = (p: number, n: number, e: number) => {
    onProtonsChange(p);
    onNeutronsChange(n);
    onElectronsChange(e);
  };

  return (
    <div className="space-y-6">
      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SliderControl
          label="Protons"
          value={protons}
          onChange={onProtonsChange}
          max={20}
          color="#ef4444"
        />
        <SliderControl
          label="Neutrons"
          value={neutrons}
          onChange={onNeutronsChange}
          max={25}
          color="#3b82f6"
        />
        <SliderControl
          label="Electrons"
          value={electrons}
          onChange={onElectronsChange}
          max={20}
          color="#fbbf24"
        />
      </div>

      {/* Preset Atoms */}
      <div className={`p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h3 className={`text-sm font-medium mb-3 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Common Elements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: 'Hydrogen', p: 1, n: 0, e: 1 },
            { name: 'Helium', p: 2, n: 2, e: 2 },
            { name: 'Carbon', p: 6, n: 6, e: 6 },
            { name: 'Oxygen', p: 8, n: 8, e: 8 },
            { name: 'Neon', p: 10, n: 10, e: 10 },
            { name: 'Sodium', p: 11, n: 12, e: 11 },
            { name: 'Magnesium', p: 12, n: 12, e: 12 },
            { name: 'Chlorine', p: 17, n: 18, e: 17 }
          ].map((element) => (
            <button
              key={element.name}
              onClick={() => createPresetAtom(element.p, element.n, element.e)}
              className={`p-2 text-xs rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-blue-900 hover:bg-blue-800 text-blue-100' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              {element.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={`p-4 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className={`text-sm font-medium ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Quick Actions
            </h3>
            <p className={`text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Reset or neutralize the atom
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onElectronsChange(protons)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-green-900 hover:bg-green-800 text-green-100'
                  : 'bg-green-100 hover:bg-green-200 text-green-800'
              }`}
            >
              Neutralize
            </button>
            <button
              onClick={resetAtom}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;