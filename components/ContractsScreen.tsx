
import React from 'react';
import { CONTRACTS_DATA } from '../constants';
import type { Contract } from '../types';
import { CloseIcon } from './Icons';

interface ContractsScreenProps {
  activeContract: { id: string; repairsLeft: number } | null;
  onSignContract: (contract: Contract) => void;
  onClose: () => void;
}

const ContractsScreen: React.FC<ContractsScreenProps> = ({ activeContract, onSignContract, onClose }) => {
  const contract = CONTRACTS_DATA[0]; // For now, we only have one contract
  const isContractActive = activeContract?.id === contract.id;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg border-2 border-yellow-500">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-yellow-400">Contratos e Parcerias</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${contract.logoColor} rounded-full flex items-center justify-center mr-4`}>
                    <span className="text-2xl font-bold text-gray-900">T</span>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">{contract.brand}</h3>
                    <p className="text-sm text-yellow-400">Parceiro Oficial</p>
                </div>
            </div>
            <p className="text-gray-300 mb-6">{contract.description}</p>
            
            <div className="bg-gray-800 p-4 rounded-md space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">Bônus por Contrato:</span>
                    <span className="font-bold text-green-400">R$ {contract.payment.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Duração:</span>
                    <span className="font-bold">{contract.durationInRepairs} Reparos</span>
                </div>
                 {isContractActive && (
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-bold text-cyan-400">ATIVO ({activeContract.repairsLeft} reparos restantes)</span>
                    </div>
                 )}
            </div>

            <div className="mt-6">
                <button
                    onClick={() => onSignContract(contract)}
                    disabled={isContractActive}
                    className="w-full font-bold py-3 px-6 rounded-lg transition-colors text-lg
                               disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
                               bg-yellow-500 hover:bg-yellow-400 text-gray-900"
                >
                    {isContractActive ? 'Contrato Ativo' : (activeContract === null ? 'Assinar Contrato' : 'Renovar Contrato')}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsScreen;
