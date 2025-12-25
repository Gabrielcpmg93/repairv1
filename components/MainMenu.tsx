
import React from 'react';

interface MainMenuProps {
  onStartGame: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-cover bg-center" style={{backgroundImage: 'url(https://picsum.photos/1920/1080?blur=5)'}}>
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center shadow-2xl">
        <h1 className="text-6xl font-bold mb-4 text-cyan-300 tracking-widest" style={{textShadow: '0 0 10px #0891b2, 0 0 20px #0891b2'}}>
          Mobile Repair Master
        </h1>
        <p className="text-xl mb-8 text-gray-200">
          Você consegue consertar todos eles?
        </p>
        <button
          onClick={onStartGame}
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-4 px-10 rounded-lg text-2xl transition-transform transform hover:scale-105 shadow-lg"
        >
          Iniciar Jogo
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
