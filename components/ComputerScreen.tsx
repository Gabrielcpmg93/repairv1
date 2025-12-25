
import React from 'react';
import type { StoreItem, PartType } from '../types';
import { PARTS_CATALOG } from '../constants';
import { CloseIcon, CartIcon, MoneyIcon } from './Icons';

interface ComputerScreenProps {
  money: number;
  inventory: PartType[];
  onBuyPart: (item: StoreItem) => void;
  onClose: () => void;
}

const PartImage: React.FC<{image: string}> = ({ image }) => {
    let colorClass = 'bg-gray-500';
    if(image === 'blue') colorClass = 'bg-blue-500';
    if(image === 'gray') colorClass = 'bg-gray-400';
    if(image === 'green') colorClass = 'bg-green-600';
    if(image === 'dark-green') colorClass = 'bg-green-800';
    if(image === 'black') colorClass = 'bg-gray-800';
    if(image === 'dark-gray') colorClass = 'bg-gray-600';
    if(image === 'purple') colorClass = 'bg-purple-600';
    if(image === 'white') colorClass = 'bg-gray-100';

    if (image === 'multi-color') {
        return (
            <div className="w-12 h-12 rounded-md border-2 border-gray-400 grid grid-cols-2 grid-rows-2">
                <div className="bg-red-500 rounded-tl-md"></div>
                <div className="bg-blue-500 rounded-tr-md"></div>
                <div className="bg-yellow-500 rounded-bl-md"></div>
                <div className="bg-green-500 rounded-br-md"></div>
            </div>
        );
    }
    
    return <div className={`w-12 h-12 ${colorClass} rounded-md border-2 border-gray-400`}></div>;
}

const ComputerScreen: React.FC<ComputerScreenProps> = ({ money, onBuyPart, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-[800px] h-[600px] bg-gray-300 rounded-lg shadow-2xl flex flex-col overflow-hidden border-4 border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500">
        
        {/* Title Bar */}
        <div className="bg-blue-800 text-white flex justify-between items-center p-1 pl-3 select-none">
          <h2 className="font-bold">GOZILLA FAIRFOX</h2>
          <button onClick={onClose} className="bg-gray-300 text-black w-6 h-6 flex items-center justify-center font-bold border-2 border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500">
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-200 p-1 border-b-2 border-gray-400 flex items-center space-x-4">
            <span className="ml-2">Mercado digital ...</span>
            <span className="font-bold text-blue-800">Peças - Packuten</span>
            <div className="flex-grow"></div>
            <div className="flex items-center bg-black text-white px-2 py-0.5 rounded-sm">
                 <CartIcon className="w-5 h-5 mr-2"/>
                 <span>R$ {money.toLocaleString('pt-BR')}</span>
            </div>
        </div>

        <div className="bg-gray-200 p-2 border-b-2 border-gray-400">
            <p className="text-black bg-white p-1 border-2 border-gray-500 border-r-gray-100 border-b-gray-100">www.packuten.co.jp</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-4 overflow-y-auto">
          <table className="w-full text-black border-collapse">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="p-2 border-b-2 border-gray-300"></th>
                <th className="p-2 border-b-2 border-gray-300">Produto</th>
                <th className="p-2 border-b-2 border-gray-300">Preço</th>
                <th className="p-2 border-b-2 border-gray-300">Ação</th>
              </tr>
            </thead>
            <tbody>
              {PARTS_CATALOG.map((item) => (
                <tr key={item.id} className="hover:bg-blue-100">
                  <td className="p-3 border-b border-gray-200 flex justify-center items-center">
                    <PartImage image={item.image} />
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </td>
                  <td className="p-3 border-b border-gray-200 font-mono font-bold">R$ {item.price.toLocaleString('pt-BR')}</td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      onClick={() => onBuyPart(item)}
                      className="bg-green-500 text-white font-bold px-4 py-1.5 rounded-sm border-2 border-b-green-700 border-r-green-700 border-t-green-400 border-l-green-400 hover:bg-green-600 active:border-t-green-700 active:border-l-green-700"
                    >
                      Na cesta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-300 border-t-2 border-gray-200 px-2 py-1 flex justify-end">
            <div className="border-2 border-gray-400 border-t-gray-500 border-l-gray-500 px-4">
                <span className="text-black">R$ {money.toLocaleString('pt-BR')}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerScreen;
