
import React, { useEffect } from 'react';
import './DeliveryMapScreen.css';

interface DeliveryMapScreenProps {
  price: number;
  onComplete: () => void;
}

const DeliveryMapScreen: React.FC<DeliveryMapScreenProps> = ({ price, onComplete }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // 5 second animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      <h2 className="text-4xl font-bold text-cyan-400 mb-8 z-10">Realizando a Entrega...</h2>
      
      <div className="map-container relative w-[800px] h-[500px] bg-gray-800 border-4 border-cyan-700 rounded-lg overflow-hidden">
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-800 rounded-lg z-10 text-center">
        <p className="text-xl">Pagamento a receber:</p>
        <p className="text-3xl font-bold text-yellow-400">R$ {price.toLocaleString('pt-BR')}</p>
      </div>

    </div>
  );
};

export default DeliveryMapScreen;
