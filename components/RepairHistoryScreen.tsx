
import React from 'react';
import type { Device, DeviceType } from '../types';
import { CloseIcon, TrophyIcon } from './Icons';

interface RepairHistoryScreenProps {
  devices: Device[];
  onClose: () => void;
}

const RetroDeviceImage: React.FC<{type: DeviceType}> = ({ type }) => {
    if (type === 'PHONE') {
        return (
            <div className="w-16 h-24 bg-gray-700 border-2 border-gray-500 rounded-md mx-auto flex items-center justify-center">
                <div className="w-12 h-20 bg-blue-300 rounded-sm"></div>
            </div>
        )
    } else if (type === 'CONSOLE') {
        return (
            <div className="w-24 h-16 bg-gray-300 border-2 border-gray-500 rounded-md mx-auto flex items-center justify-center p-1">
                 <div className="w-full h-full bg-gray-800 rounded-sm flex items-center justify-center">
                    <div className="w-8 h-1 bg-blue-500"></div>
                 </div>
            </div>
        )
    } else if (type === 'CONTROLLER') {
        return (
            <div className="w-24 h-16 bg-gray-800 border-2 border-gray-500 rounded-lg mx-auto relative flex items-center justify-center">
                <div className="absolute left-1 top-4 w-2 h-6 bg-gray-600 rounded-l-md"></div>
                <div className="absolute right-1 top-4 w-2 h-6 bg-gray-600 rounded-r-md"></div>
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
        )
    } else if (type === 'RADIO') {
        return (
            <div className="w-24 h-16 bg-yellow-900 border-2 border-yellow-700 rounded-md mx-auto relative p-1">
                <div className="absolute top-1 right-1 w-1 h-8 bg-gray-400"></div>
                <div className="w-8 h-8 bg-black rounded-full absolute left-2 top-3"></div>
            </div>
        )
    } else if (type === 'TELEVISION') {
        return (
            <div className="w-24 h-16 bg-gray-800 border-2 border-gray-600 rounded-md mx-auto flex flex-col items-center justify-end p-1">
                <div className="w-20 h-12 bg-black border-2 border-gray-700 rounded-sm"></div>
                <div className="w-8 h-1 bg-gray-600 mt-1"></div>
            </div>
        )
    } else if (type === 'BICYCLE') {
        return (
            <div className="w-24 h-16 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 rounded-full border-2 border-gray-500"></div>
                <div className="w-8 h-8 rounded-full border-2 border-gray-500 -ml-2"></div>
            </div>
        )
    } else if (type === 'ROUTER') {
        return (
            <div className="w-24 h-16 bg-gray-200 border-2 border-gray-400 rounded-md mx-auto relative p-1">
                <div className="w-1 h-8 bg-gray-800 absolute top-0 left-4"></div>
                <div className="w-1 h-8 bg-gray-800 absolute top-0 right-4"></div>
                <div className="w-full h-4 bg-gray-700 absolute bottom-0 left-0"></div>
            </div>
        )
    } else if (type === 'CAR') {
        return (
            <div className="w-24 h-16 flex flex-col justify-center items-center mx-auto">
                <div className="w-20 h-8 bg-red-600 rounded-t-lg border-2 border-red-800"></div>
                <div className="flex justify-between w-24">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
            </div>
        )
    }
    return null;
}

const RepairHistoryScreen: React.FC<RepairHistoryScreenProps> = ({ devices, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-4xl h-[90%] rounded-lg shadow-2xl flex flex-col border-4 border-yellow-400 font-mono">
        {/* Title Bar */}
        <div className="bg-gray-800 p-4 flex justify-between items-center border-b-4 border-yellow-400">
            <div className="flex items-center">
                <TrophyIcon className="w-8 h-8 text-yellow-300 mr-3" />
                <h2 className="text-3xl font-bold text-yellow-300 tracking-widest">Galeria de Reparos</h2>
            </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Info Bar */}
        <div className="p-4 bg-gray-800 border-b-4 border-yellow-400">
            <p className="text-center text-xl">Total de Reparos Concluídos: <span className="font-bold text-2xl text-yellow-300">{devices.length}</span></p>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {devices.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {devices.map((device, index) => (
                <div key={`${device.id}-${index}`} className="bg-gray-800 border-2 border-gray-600 rounded-md p-4 text-center flex flex-col justify-between">
                    <div>
                        <RetroDeviceImage type={device.type} />
                        <h3 className="font-bold mt-3 text-cyan-400">{device.name}</h3>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <TrophyIcon className="w-24 h-24 mb-4"/>
                <p className="text-2xl">A sua galeria está vazia.</p>
                <p>Complete seu primeiro reparo para começar!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairHistoryScreen;
