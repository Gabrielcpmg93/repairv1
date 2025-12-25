
import React from 'react';
import type { Device, PartType, WorkbenchPart } from '../types';
import DeviceView from './DeviceView';
import { ComputerIcon, WrenchIcon, MoneyIcon, TrophyIcon } from './Icons';

interface GameScreenProps {
  money: number;
  workbenchParts: WorkbenchPart[];
  currentDevice: Device | null;
  roundCompleted: boolean;
  repairCount: number;
  onShowComputer: () => void;
  onShowSponsorships: () => void;
  onShowRepairHistory: () => void;
  togglePartAttachment: (partId: string) => void;
  installNewPart: (partId: string) => void;
  onStartDelivery: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  money,
  workbenchParts,
  currentDevice,
  roundCompleted,
  onShowComputer,
  onShowSponsorships,
  onShowRepairHistory,
  togglePartAttachment,
  installNewPart,
  onStartDelivery,
}) => {
  const detachedParts = currentDevice?.parts.filter(p => !p.isAttached) || [];

  return (
    <div className="w-full h-full flex flex-col bg-blue-900">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-gray-900 shadow-lg z-10">
        <h1 className="text-2xl font-bold text-cyan-400">Bancada de Reparos</h1>
        <div className="flex items-center space-x-4">
          <button onClick={onShowSponsorships} className="flex items-center bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-600 transition-colors">
            <MoneyIcon className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-lg font-semibold">R$ {money.toLocaleString('pt-BR')}</span>
          </button>
          <button onClick={onShowRepairHistory} className="p-3 bg-gray-700 rounded-full hover:bg-cyan-600 transition-colors">
            <TrophyIcon className="w-6 h-6 text-yellow-300" />
          </button>
          <button onClick={onShowComputer} className="p-3 bg-gray-700 rounded-full hover:bg-cyan-600 transition-colors">
            <ComputerIcon className="w-6 h-6" />
          </button>
          {roundCompleted && (
            <button 
                onClick={onStartDelivery} 
                className="bg-green-500 hover:bg-green-400 text-white font-bold py-1 px-3 text-sm rounded-lg transition-transform transform hover:scale-105 shadow-lg shadow-green-500/50 animate-pulse"
            >
                Entregar
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Panel - Inventory & Detached Parts */}
        <aside className="w-64 bg-gray-800 p-4 overflow-y-auto space-y-4 flex flex-col">
          <div>
            <h2 className="text-lg font-bold mb-2 border-b-2 border-cyan-500 pb-1">Peças Novas</h2>
            <div className="space-y-2 mt-2">
              {workbenchParts.length > 0 ? (
                workbenchParts.map((part) => (
                  <button 
                    key={part.id} 
                    onClick={() => installNewPart(part.id)}
                    className="w-full p-2 rounded-md text-left bg-gray-700 hover:bg-cyan-800 transition-colors cursor-pointer border border-gray-600"
                  >
                      <div className="flex justify-between items-center">
                          <p className="font-semibold text-sm">{part.type}</p>
                          <span className="text-xs font-bold text-green-400 bg-green-900/50 px-2 py-0.5 rounded-full">NOVA</span>
                      </div>
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-400">Compre peças novas no computador.</p>
              )}
            </div>
          </div>
           <div>
            <h2 className="text-lg font-bold mb-2 border-b-2 border-cyan-500 pb-1">Peças Removidas</h2>
             <div className="space-y-2 mt-2">
                {detachedParts.length > 0 ? (
                    detachedParts.map(part => (
                         <button 
                            key={part.id} 
                            onClick={() => !part.isBroken && togglePartAttachment(part.id)}
                            disabled={part.isBroken}
                            className={`w-full p-2 rounded-md text-left ${part.isBroken ? 'bg-red-800 border border-red-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-cyan-800 transition-colors cursor-pointer'}`}
                        >
                            <p className="font-semibold text-sm">{part.type}</p>
                            {part.isBroken && <p className="text-xs text-red-300">Quebrada</p>}
                        </button>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">Nenhuma peça removida.</p>
                )}
             </div>
          </div>
          {roundCompleted && (
            <div className="mt-4 pt-4 border-t-2 border-cyan-500">
                <h2 className="text-lg font-bold text-green-400 mb-2 text-center animate-pulse">Reparo Concluído!</h2>
                <p className="text-sm text-center text-gray-300">Clique em 'Entregar' no topo da tela para finalizar.</p>
            </div>
          )}
        </aside>

        {/* Center - 3D View */}
        <div className="flex-1 relative bg-blue-800 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]">
          {currentDevice && (
            <DeviceView device={currentDevice} onPartClick={togglePartAttachment} />
          )}
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
