
import React from 'react';
import { SPONSORSHIP_DEAL } from '../constants';
import { CloseIcon } from './Icons';

interface SponsorshipScreenProps {
  sponsorshipActive: boolean;
  onSign: () => void;
  onClose: () => void;
}

const SponsorshipScreen: React.FC<SponsorshipScreenProps> = ({ sponsorshipActive, onSign, onClose }) => {
  const deal = SPONSORSHIP_DEAL;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-lg border-2 border-indigo-500">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-400">Acordo de Patrocínio</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700">
                <CloseIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${deal.logoColor} rounded-full flex items-center justify-center mr-4`}>
                    <span className="text-2xl font-bold text-gray-900">Q</span>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">{deal.brand}</h3>
                    <p className="text-sm text-indigo-400">Patrocinador Oficial</p>
                </div>
            </div>
            <p className="text-gray-300 mb-6">{deal.description}</p>
            
            <div className="bg-gray-800 p-4 rounded-md space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-400">Renda Passiva:</span>
                    <span className="font-bold text-green-400">R$ {deal.paymentPerSecond.toLocaleString('pt-BR')} / segundo</span>
                </div>
                 {sponsorshipActive && (
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                        <span className="text-gray-400">Status:</span>
                        <span className="font-bold text-cyan-400 animate-pulse">ATIVO</span>
                    </div>
                 )}
            </div>

            <div className="mt-6">
                <button
                    onClick={onSign}
                    disabled={sponsorshipActive}
                    className="w-full font-bold py-3 px-6 rounded-lg transition-colors text-lg
                               disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
                               bg-indigo-500 hover:bg-indigo-400 text-white"
                >
                    {sponsorshipActive ? 'Acordo Ativo' : 'Assinar Acordo'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipScreen;
