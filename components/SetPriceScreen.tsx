
import React, { useState, useMemo, useEffect } from 'react';
import type { Device } from '../types';
import { PARTS_CATALOG } from '../constants';
import { MoneyIcon } from './Icons';

interface SetPriceScreenProps {
  device: Device | null;
  onConfirm: (price: number) => void;
  onCancel: () => void;
}

const SetPriceScreen: React.FC<SetPriceScreenProps> = ({ device, onConfirm, onCancel }) => {
  const suggestedPrice = useMemo(() => {
    if (!device) return 500;
    // For simplicity, we'll assume the single broken part is the one that was "repaired".
    const brokenPart = device.parts.find(p => p.isBroken);
    if (!brokenPart) return 250; // Base price for a simple checkup
    
    const catalogItem = PARTS_CATALOG.find(item => item.id === brokenPart.type);
    const partCost = catalogItem?.price || 100;

    // Suggested markup is 50% of part cost, rounded to nearest 50.
    const finalPrice = partCost + Math.ceil((partCost * 0.5) / 50) * 50;
    return finalPrice;
  }, [device]);
  
  const [price, setPrice] = useState(suggestedPrice);
  const minPrice = Math.floor(suggestedPrice * 0.5);
  const maxPrice = Math.floor(suggestedPrice * 2);

  useEffect(() => {
    setPrice(suggestedPrice);
  }, [suggestedPrice]);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-cyan-500">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">Definir Preço do Conserto</h2>
        <p className="text-center text-gray-300 mb-2">Defina o valor a ser cobrado pelo reparo do <span className="font-bold">{device?.name}</span>.</p>
        <p className="text-center text-gray-400 text-sm mb-6">Preço Sugerido: R$ {suggestedPrice.toLocaleString('pt-BR')}</p>

        <div className="my-8 text-center">
            <span className="text-5xl font-bold text-yellow-400">R$ {price.toLocaleString('pt-BR')}</span>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="10"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
          />
          <div className="w-full flex justify-between text-xs text-gray-400 mt-2">
            <span>R$ {minPrice}</span>
            <span>R$ {maxPrice}</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(price)}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Confirmar e Entregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetPriceScreen;
