
import React, { useState, useMemo } from 'react';
import type { StoreItem, PartType } from '../types';
import { PARTS_CATALOG } from '../constants';
import { CloseIcon, CartIcon, HammerIcon, MoneyIcon, TagIcon } from './Icons';

interface ComputerScreenProps {
  money: number;
  inventory: PartType[];
  repairCount: number;
  sellingItems: { part: PartType; price: number; id: string }[];
  onBuyPart: (item: StoreItem) => void;
  onCraftPart: (item: StoreItem) => void;
  onSellPart: (part: PartType, price: number) => void;
  onClose: () => void;
}

const CRAFTING_UNLOCK_COUNT = 3;

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

const ComputerScreen: React.FC<ComputerScreenProps> = ({ money, inventory, repairCount, sellingItems, onBuyPart, onCraftPart, onSellPart, onClose }) => {
  const [view, setView] = useState<'store' | 'crafting' | 'sell'>('store');
  const [sellPrices, setSellPrices] = useState<Partial<Record<PartType, number>>>({});

  const isCraftingUnlocked = repairCount >= CRAFTING_UNLOCK_COUNT;

  const inventoryCounts = useMemo(() => {
    return inventory.reduce((acc, part) => {
        acc[part] = (acc[part] || 0) + 1;
        return acc;
    }, {} as Record<PartType, number>);
  }, [inventory]);

  const renderStore = () => (
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
  );

  const renderCrafting = () => (
     <table className="w-full text-black border-collapse">
      <thead>
        <tr className="text-left bg-gray-200">
          <th className="p-2 border-b-2 border-gray-300"></th>
          <th className="p-2 border-b-2 border-gray-300">Peça</th>
          <th className="p-2 border-b-2 border-gray-300">Custo de Criação</th>
          <th className="p-2 border-b-2 border-gray-300">Ação</th>
        </tr>
      </thead>
      <tbody>
        {PARTS_CATALOG.map((item) => {
            const craftingCost = Math.floor(item.price * 0.75);
            return (
              <tr key={item.id} className="hover:bg-amber-100">
                <td className="p-3 border-b border-gray-200 flex justify-center items-center">
                  <PartImage image={item.image} />
                </td>
                <td className="p-3 border-b border-gray-200">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.brand}</p>
                </td>
                <td className="p-3 border-b border-gray-200 font-mono font-bold text-amber-700">R$ {craftingCost.toLocaleString('pt-BR')}</td>
                <td className="p-3 border-b border-gray-200">
                  <button
                    onClick={() => onCraftPart(item)}
                    className="bg-orange-500 text-white font-bold px-4 py-1.5 rounded-sm border-2 border-b-orange-700 border-r-orange-700 border-t-orange-400 border-l-orange-400 hover:bg-orange-600 active:border-t-orange-700 active:border-l-orange-700 flex items-center"
                  >
                    <HammerIcon className="w-4 h-4 mr-2" />
                    Criar
                  </button>
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );

  const renderSell = () => {
    const sellableParts = Object.keys(inventoryCounts) as PartType[];

    return (
        <div>
            {sellingItems.length > 0 && (
                <div className="mb-4 p-2 bg-blue-100 border border-blue-300 rounded">
                    <h3 className="font-bold text-black">Vendas em Progresso...</h3>
                    <ul className="text-sm text-black">
                        {sellingItems.map(item => (
                            <li key={item.id} className="animate-pulse">Vendendo {item.part} por R$ {item.price.toLocaleString('pt-BR')} (2s)</li>
                        ))}
                    </ul>
                </div>
            )}
            {sellableParts.length === 0 && sellingItems.length === 0 && <p className="text-black">Você não tem peças para vender.</p>}
            <table className="w-full text-black border-collapse">
                <thead>
                    <tr className="text-left bg-gray-200">
                        <th className="p-2 border-b-2 border-gray-300">Peça</th>
                        <th className="p-2 border-b-2 border-gray-300">Quantidade</th>
                        <th className="p-2 border-b-2 border-gray-300">Preço de Venda</th>
                        <th className="p-2 border-b-2 border-gray-300">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {sellableParts.map(partType => {
                        const storeItem = PARTS_CATALOG.find(p => p.id === partType)!;
                        const price = sellPrices[partType] || Math.floor(storeItem.price * 0.5);

                        return (
                            <tr key={partType} className="hover:bg-green-100">
                                <td className="p-3 border-b border-gray-200 font-bold">{partType}</td>
                                <td className="p-3 border-b border-gray-200">{inventoryCounts[partType]}</td>
                                <td className="p-3 border-b border-gray-200">
                                    <input 
                                        type="number" 
                                        value={price}
                                        onChange={(e) => setSellPrices({...sellPrices, [partType]: Number(e.target.value)})}
                                        className="w-24 p-1 border border-gray-400 rounded-sm"
                                        min="1"
                                    />
                                </td>
                                <td className="p-3 border-b border-gray-200">
                                    <button
                                        onClick={() => onSellPart(partType, price)}
                                        className="bg-cyan-500 text-white font-bold px-4 py-1.5 rounded-sm border-2 border-b-cyan-700 border-r-cyan-700 border-t-cyan-400 border-l-cyan-400 hover:bg-cyan-600 active:border-t-cyan-700 active:border-l-cyan-700"
                                    >
                                        Vender
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
  }


  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-[800px] h-[600px] bg-gray-300 rounded-lg shadow-2xl flex flex-col overflow-hidden border-4 border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500">
        
        <div className="bg-blue-800 text-white flex justify-between items-center p-1 pl-3 select-none">
          <h2 className="font-bold">GOZILLA FAIRFOX</h2>
          <button onClick={onClose} className="bg-gray-300 text-black w-6 h-6 flex items-center justify-center font-bold border-2 border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500">
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gray-200 p-1 border-b-2 border-gray-400 flex items-center space-x-2">
            <button onClick={() => setView('store')} className={`font-bold px-3 py-1 border-2 text-black ${view === 'store' ? 'bg-gray-100 border-b-gray-100' : 'bg-gray-300 hover:bg-gray-100'}`}>
                <CartIcon className="w-5 h-5 inline-block mr-2"/>
                Peças - Packuten
            </button>
            <button 
              onClick={() => isCraftingUnlocked && setView('crafting')} 
              disabled={!isCraftingUnlocked}
              className={`font-bold px-3 py-1 border-2 disabled:cursor-not-allowed disabled:text-gray-500 relative group text-black ${view === 'crafting' ? 'bg-gray-100 border-b-gray-100' : 'bg-gray-300 hover:bg-gray-100'}`}
            >
                <HammerIcon className="w-5 h-5 inline-block mr-2"/>
                Bancada de Criação
                {!isCraftingUnlocked && (
                  <span className="absolute -top-8 left-0 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Conserte {CRAFTING_UNLOCK_COUNT} aparelhos para desbloquear.
                  </span>
                )}
            </button>
             <button onClick={() => setView('sell')} className={`font-bold px-3 py-1 border-2 text-black ${view === 'sell' ? 'bg-gray-100 border-b-gray-100' : 'bg-gray-300 hover:bg-gray-100'}`}>
                <TagIcon className="w-5 h-5 inline-block mr-2"/>
                Vender Peças
            </button>
            <div className="flex-grow"></div>
            <div className="flex items-center bg-black text-white px-2 py-0.5 rounded-sm">
                 <MoneyIcon className="w-5 h-5 mr-2"/>
                 <span>R$ {money.toLocaleString('pt-BR')}</span>
            </div>
        </div>

        <div className="bg-gray-200 p-2 border-b-2 border-gray-400">
            <p className="text-black bg-white p-1 border-2 border-gray-500 border-r-gray-100 border-b-gray-100">
                {view === 'store' && 'www.packuten.co.jp'}
                {view === 'crafting' && 'local://workbench/crafting'}
                {view === 'sell' && 'local://marketplace/sell'}
            </p>
        </div>

        <div className="flex-1 bg-white p-4 overflow-y-auto">
            {view === 'store' && renderStore()}
            {view === 'crafting' && renderCrafting()}
            {view === 'sell' && renderSell()}
        </div>

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
