
import React, { useState, useMemo } from 'react';
import type { StoreItem, PartType, WorkbenchPart } from '../types';
import { PARTS_CATALOG } from '../constants';
import { CloseIcon, CartIcon, HammerIcon, MoneyIcon, TagIcon } from './Icons';

interface ComputerScreenProps {
  money: number;
  workbenchParts: WorkbenchPart[];
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
    if(image === 'brown') colorClass = 'bg-yellow-800';

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

const ComputerScreen: React.FC<ComputerScreenProps> = ({ money, workbenchParts, repairCount, sellingItems, onBuyPart, onCraftPart, onSellPart, onClose }) => {
  const [view, setView] = useState<'store' | 'crafting' | 'sell'>('store');
  const [sellPrices, setSellPrices] = useState<Partial<Record<PartType, number>>>({});

  const isCraftingUnlocked = repairCount >= CRAFTING_UNLOCK_COUNT;

  const inventoryCounts = useMemo(() => {
    return workbenchParts.reduce((acc, part) => {
        if (part && part.type) { 
            acc[part.type] = (acc[part.type] || 0) + 1;
        }
        return acc;
    }, {} as Record<PartType, number>);
  }, [workbenchParts]);

  // FIX: Moved useMemo to the top level to respect the Rules of Hooks.
  // This was previously inside renderSell(), causing a conditional hook call.
  const sellableItems = useMemo(() => {
    return (Object.keys(inventoryCounts) as PartType[])
        .map(partType => {
            return {
                partType,
                count: inventoryCounts[partType],
                // This links inventory data with catalog data safely.
                storeItem: PARTS_CATALOG.find(p => p.id === partType),
            };
        })
        // This filter is the definitive bug fix: it ensures we only try to render items that exist in the catalog.
        .filter(item => item.storeItem && item.count > 0);
  }, [inventoryCounts]);

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
    return (
        <div className="text-black">
            {sellingItems.length > 0 && (
                <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg shadow-inner">
                    <h3 className="font-bold text-lg text-blue-800 mb-2">Vendas em Progresso...</h3>
                    <ul className="space-y-1">
                        {sellingItems.map(item => (
                            <li key={item.id} className="animate-pulse text-sm text-blue-700">
                                Vendendo {item.part} por R$ {item.price.toLocaleString('pt-BR')}...
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {sellableItems.length === 0 && sellingItems.length === 0 && (
                <div className="text-center py-10">
                    <TagIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Você não tem peças para vender.</p>
                    <p className="text-sm text-gray-500">Compre ou crie peças para começar a vender.</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellableItems.map(({ partType, count, storeItem }) => {
                    // Thanks to the filter above, 'storeItem' is guaranteed to exist here.
                    if (!storeItem) return null; 

                    const price = sellPrices[partType] || Math.floor(storeItem.price * 0.5);

                    return (
                        <div key={partType} className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex flex-col shadow-sm">
                            <div className="flex items-center mb-3">
                                <PartImage image={storeItem.image} />
                                <div className="ml-3">
                                    <p className="font-bold text-sm leading-tight">{storeItem.name}</p>
                                    <p className="text-xs text-gray-600">Em estoque: {count}</p>
                                </div>
                            </div>
                            <div className="mt-auto space-y-2">
                                <div className="flex items-center">
                                    <span className="text-sm font-semibold mr-2">Preço: R$</span>
                                    <input 
                                        type="number" 
                                        value={price}
                                        onChange={(e) => setSellPrices({...sellPrices, [partType]: Math.max(1, Number(e.target.value))})}
                                        className="w-full p-1 border border-gray-400 rounded-sm text-sm"
                                        min="1"
                                    />
                                </div>
                                <button
                                    onClick={() => onSellPart(partType, price)}
                                    className="w-full bg-cyan-500 text-white font-bold py-1.5 rounded-md border-b-2 border-cyan-700 hover:bg-cyan-600 active:bg-cyan-700 transition-all text-sm"
                                >
                                    Vender 1 Unidade
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
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
