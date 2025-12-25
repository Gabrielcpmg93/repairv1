
import React from 'react';
import type { Device, PartType } from '../types';
import DeviceView from './DeviceView';
import { ComputerIcon, WrenchIcon, MoneyIcon } from './Icons';

interface GameScreenProps {
  money: number;
  inventory: PartType[];
  currentDevice: Device | null;
  roundCompleted: boolean;
  onShowComputer: () => void;
  togglePartAttachment: (partId: string) => void;
  swapPart: (partId: string) => void;
  onStartDelivery: () => void;
}

const InventoryItem: React.FC<{ partType: PartType; onClick: () => void }> = ({ partType, onClick }) => (
    <button onClick={onClick} className="bg-gray-700 p-2 rounded-md hover:bg-cyan-600 transition-colors text-center">
        <WrenchIcon className="w-8 h-8 mx-auto mb-1 text-cyan-400" />
        <span className="text-xs">{partType}</span>
    </button>
);


const GameScreen: React.FC<GameScreenProps> = ({
  money,
  inventory,
  currentDevice,
  roundCompleted,
  onShowComputer,
  togglePartAttachment,
  swapPart,
  onStartDelivery,
}) => {
  const detachedParts = currentDevice?.parts.filter(p => !p.isAttached) || [];

  return (
    <div className="w-full h-full flex flex-col bg-blue-900">
      {/* Top Bar */}
      <header className="flex justify-between items-center p-4 bg-gray-900 shadow-lg z-10">
        <h1 className="text-2xl font-bold text-cyan-400">Bancada de Reparos</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
            <MoneyIcon className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-lg font-semibold">R$ {money.toLocaleString('pt-BR')}</span>
          </div>
          <button onClick={onShowComputer} className="p-3 bg-gray-700 rounded-full hover:bg-cyan-600 transition-colors">
            <ComputerIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Panel - Inventory & Detached Parts */}
        <aside className="w-64 bg-gray-800 p-4 overflow-y-auto space-y-4 flex flex-col">
          <div>
            <h2 className="text-lg font-bold mb-2 border-b-2 border-cyan-500 pb-1">Inventário</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {inventory.length > 0 ? (
                inventory.map((partType, index) => (
                  <InventoryItem key={`${partType}-${index}`} partType={partType} onClick={() => {}} />
                ))
              ) : (
                <p className="text-sm text-gray-400 col-span-2">Vazio. Compre peças no computador.</p>
              )}
            </div>
          </div>
           <div className="flex-grow">
            <h2 className="text-lg font-bold mb-2 border-b-2 border-cyan-500 pb-1">Peças Removidas</h2>
             <div className="space-y-2 mt-2">
                {detachedParts.length > 0 ? (
                    detachedParts.map(part => (
                        <div key={part.id} className={`p-2 rounded-md ${part.isBroken ? 'bg-red-800 border border-red-500' : 'bg-gray-700'}`}>
                            <p className="font-semibold text-sm">{part.type}</p>
                            {part.isBroken && <p className="text-xs text-red-300">Quebrada</p>}
                             {part.isBroken && inventory.includes(part.type) && (
                                <button
                                  onClick={() => swapPart(part.id)}
                                  className="mt-2 w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-1 px-2 rounded"
                                >
                                  Trocar Peça
                                </button>
                              )}
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">Nenhuma peça removida.</p>
                )}
             </div>
          </div>
          {roundCompleted && (
            <div className="mt-4 pt-4 border-t-2 border-cyan-500">
                <h2 className="text-lg font-bold text-green-400 mb-2 text-center">Reparo Concluído!</h2>
                <button 
                    onClick={onStartDelivery} 
                    className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg shadow-green-500/50 animate-pulse"
                >
                    Entregar
                </button>
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
