import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface AtomVisualizationProps {
  protons: number;
  neutrons: number;
  electrons: number;
}

const AtomVisualization: React.FC<AtomVisualizationProps> = ({ protons, neutrons, electrons }) => {
  const { isDarkMode } = useTheme();
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [protons, neutrons, electrons]);

  const getElementInfo = (atomicNumber: number) => {
    const elements = [
      { symbol: '', name: 'Empty' },
      { symbol: 'H', name: 'Hydrogen' },
      { symbol: 'He', name: 'Helium' },
      { symbol: 'Li', name: 'Lithium' },
      { symbol: 'Be', name: 'Beryllium' },
      { symbol: 'B', name: 'Boron' },
      { symbol: 'C', name: 'Carbon' },
      { symbol: 'N', name: 'Nitrogen' },
      { symbol: 'O', name: 'Oxygen' },
      { symbol: 'F', name: 'Fluorine' },
      { symbol: 'Ne', name: 'Neon' },
      { symbol: 'Na', name: 'Sodium' },
      { symbol: 'Mg', name: 'Magnesium' },
      { symbol: 'Al', name: 'Aluminum' },
      { symbol: 'Si', name: 'Silicon' },
      { symbol: 'P', name: 'Phosphorus' },
      { symbol: 'S', name: 'Sulfur' },
      { symbol: 'Cl', name: 'Chlorine' },
      { symbol: 'Ar', name: 'Argon' },
      { symbol: 'K', name: 'Potassium' },
      { symbol: 'Ca', name: 'Calcium' }
    ];
    
    return elements[atomicNumber] || { symbol: '?', name: 'Unknown' };
  };

  const renderElectronShells = () => {
    const shells = [];
    const maxElectronsPerShell = [2, 8, 8]; // K, L, M shells for first 18 electrons
    let remainingElectrons = electrons;
    
    for (let shellIndex = 0; shellIndex < 3 && remainingElectrons > 0; shellIndex++) {
      const maxInThisShell = maxElectronsPerShell[shellIndex];
      const electronsInThisShell = Math.min(remainingElectrons, maxInThisShell);
      const radius = 80 + shellIndex * 40;
      
      for (let i = 0; i < electronsInThisShell; i++) {
        const baseAngle = (i / electronsInThisShell) * 2 * Math.PI;
        
        shells.push(
          <div
            key={`${animationKey}-electron-${shellIndex}-${i}`}
            className={`absolute w-3 h-3 bg-yellow-400 rounded-full shadow-lg electron-orbit-${shellIndex}`}
            style={{
              left: `calc(50% - 6px)`,
              top: `calc(50% - 6px)`,
              boxShadow: '0 0 10px #fbbf24',
              transformOrigin: `6px 6px`,
              transform: `rotate(${baseAngle}rad)`,
              animationDelay: `${(i / electronsInThisShell) * (3 + shellIndex * 0.5)}s`
            }}
          />
        );
      }
      
      // Shell orbit lines
      shells.push(
        <div
          key={`shell-${shellIndex}`}
          className={`absolute border rounded-full ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          } opacity-30`}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            left: `calc(50% - ${radius}px)`,
            top: `calc(50% - ${radius}px)`
          }}
        />
      );
      
      remainingElectrons -= electronsInThisShell;
    }
    
    return shells;
  };

  const renderNucleus = () => {
    const particles = [];
    const totalParticles = protons + neutrons;
    
    for (let i = 0; i < totalParticles; i++) {
      const isProton = i < protons;
      const angle = (i / totalParticles) * 2 * Math.PI;
      const radius = Math.min(20, totalParticles * 2);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      particles.push(
        <div
          key={`${animationKey}-particle-${i}`}
          className={`absolute w-4 h-4 rounded-full ${
            isProton ? 'bg-red-500' : 'bg-blue-500'
          } shadow-lg`}
          style={{
            left: `calc(50% + ${x}px - 8px)`,
            top: `calc(50% + ${y}px - 8px)`,
            boxShadow: `0 0 8px ${isProton ? '#ef4444' : '#3b82f6'}`
          }}
        />
      );
    }
    
    return particles;
  };

  const element = getElementInfo(protons);

  return (
    <>
      <style>
        {`
          @keyframes orbit-0 {
            0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
          }
          @keyframes orbit-1 {
            0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
          }
          @keyframes orbit-2 {
            0% { transform: rotate(0deg) translateX(160px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(160px) rotate(-360deg); }
          }
          .electron-orbit-0 {
            animation: orbit-0 3s linear infinite;
          }
          .electron-orbit-1 {
            animation: orbit-1 3.5s linear infinite;
          }
          .electron-orbit-2 {
            animation: orbit-2 4s linear infinite;
          }
        `}
      </style>
      
      <div className={`relative w-full h-96 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      } overflow-hidden`}>
        
        {/* Background Grid */}
        <div className={`absolute inset-0 opacity-20 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
        
        {/* Atom Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Nucleus */}
          <div className={`relative w-16 h-16 rounded-full ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
          } border-2 ${
            isDarkMode ? 'border-gray-600' : 'border-gray-400'
          } shadow-lg flex items-center justify-center`}>
            {renderNucleus()}
            
            {/* Element Symbol */}
            <div className={`text-sm font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            } z-10`}>
              {element.symbol}
            </div>
          </div>
          
          {/* Electron Shells */}
          {renderElectronShells()}
        </div>
        
        {/* Element Info */}
        <div className={`absolute top-4 right-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        } rounded-lg p-3 shadow-lg`}>
          <div className={`text-lg font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {element.name}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Atomic Number: {protons}
          </div>
          <div className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Mass Number: {protons + neutrons}
          </div>
        </div>
        
        {/* Legend */}
        <div className={`absolute bottom-4 left-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        } rounded-lg p-3 shadow-lg space-y-2`}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm" />
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Protons
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Neutrons
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm" />
            <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Electrons
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AtomVisualization;