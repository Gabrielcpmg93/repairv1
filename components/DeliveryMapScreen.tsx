
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
    <div className="absolute inset-0 bg-slate-900 bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl bg-[#1F2937] rounded-lg shadow-2xl border-2 border-cyan-700/50 flex flex-col items-center p-6 relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-cyan-500/20 glow-effect"></div>
        
        <h2 className="text-4xl font-bold text-cyan-400 mb-6 z-10">
          Entrega Concluída!
        </h2>
        
        <div className="relative w-full h-64 bg-[#111827] border-2 border-cyan-800/50 rounded-lg overflow-hidden grid-bg p-4">
            <svg width="100%" height="100%" viewBox="0 0 600 256" preserveAspectRatio="none">
                <path 
                    d="M 40,216 C 40,40 40,40 200,40 L 400,40 C 560,40 560,40 560,216" 
                    stroke="rgba(0, 255, 255, 0.4)" 
                    strokeWidth="6" 
                    fill="none" 
                    strokeLinecap="round" 
                    className="path-animation" 
                />
            </svg>
             <div className="absolute top-40 left-8 text-white bg-cyan-600 px-3 py-1 rounded-md text-sm font-bold shadow-lg">Oficina</div>
             <div className="absolute top-40 right-4 text-white bg-cyan-600 px-3 py-1 rounded-md text-sm font-bold shadow-lg">Cliente</div>
        </div>

        {isComplete && (
          <div className="absolute bottom-6 bg-[#1F2937] border-2 border-gray-600 p-4 rounded-lg shadow-lg z-20 text-center fade-in">
            <h3 className="text-2xl font-bold text-green-400 mb-2">Pagamento Recebido!</h3>
            <button
              onClick={onComplete}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-8 rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-500/20 glow-effect"></div>
      </div>
    </div>
  );
};

export default DeliveryMapScreen;
