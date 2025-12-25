import React, { useState, useEffect } from 'react';
import './DeliveryMapScreen.css';

interface DeliveryMapScreenProps {
  price: number;
  onComplete: () => void;
}

const DeliveryMapScreen: React.FC<DeliveryMapScreenProps> = ({ price, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 5000); // 5 second animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-2xl border-2 border-cyan-700 flex flex-col items-center w-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6 z-10 transition-colors duration-500">
          {isComplete ? 'Entrega Concluída!' : 'Realizando a Entrega...'}
        </h2>
        
        <div className="map-container relative w-[600px] h-[375px] bg-gray-800 border-4 border-cyan-800 rounded-lg overflow-hidden">
          <div className="map-bg"></div>
          <div className="road"></div>

          <div className="point start">
              Oficina
              <div className="ping"></div>
          </div>
          <div className="point end">
              Cliente
              <div className="ping"></div>
          </div>

          <div className="van">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
          </div>
        </div>

        <div className="mt-6 p-3 bg-gray-800 rounded-lg z-10 text-center min-h-[90px] flex flex-col justify-center">
          {!isComplete ? (
            <>
              <p className="text-lg">Pagamento a receber:</p>
              <p className="text-3xl font-bold text-yellow-400">R$ {price.toLocaleString('pt-BR')}</p>
            </>
          ) : (
            <div className="fade-in">
              <p className="text-2xl font-bold text-green-400 mb-2">Pagamento Recebido!</p>
              <button
                onClick={onComplete}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryMapScreen;
