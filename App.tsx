
import React, { useState, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import useGameLogic from './hooks/useGameLogic';
import ComputerScreen from './components/ComputerScreen';
import SetPriceScreen from './components/SetPriceScreen';
import DeliveryMapScreen from './components/DeliveryMapScreen';
import ContractsScreen from './components/ContractsScreen';
import type { GameState } from './types';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const gameLogic = useGameLogic();

  const startGame = useCallback(() => {
    gameLogic.startNewRound();
    setGameState('PLAYING');
  }, [gameLogic]);

  const showComputer = useCallback(() => setGameState('COMPUTER'), []);
  const hideComputer = useCallback(() => setGameState('PLAYING'), []);
  const showContracts = useCallback(() => setGameState('CONTRACTS'), []);
  const hideContracts = useCallback(() => setGameState('PLAYING'), []);
  
  const handleStartDelivery = useCallback(() => {
    setGameState('SETTING_PRICE');
  }, []);

  const handleCancelSetPrice = useCallback(() => {
      setGameState('PLAYING');
  }, []);

  const handleConfirmPrice = useCallback((price: number) => {
      setDeliveryPrice(price);
      setGameState('DELIVERING');
  }, []);

  const handleDeliveryComplete = useCallback(() => {
      gameLogic.collectPaymentAndStartNewRound(deliveryPrice);
      setGameState('PLAYING');
  }, [gameLogic, deliveryPrice]);


  return (
    <div className="bg-gray-800 text-white w-screen h-screen overflow-hidden font-sans">
      {gameState === 'MENU' && <MainMenu onStartGame={startGame} />}
      
      {(gameState === 'PLAYING' || gameState === 'COMPUTER' || gameState === 'CONTRACTS') && (
        <GameScreen
          {...gameLogic}
          onShowComputer={showComputer}
          onShowContracts={showContracts}
          onStartDelivery={handleStartDelivery}
        />
      )}
      
      {gameState === 'COMPUTER' && (
        <ComputerScreen
          money={gameLogic.money}
          inventory={gameLogic.inventory}
          onBuyPart={gameLogic.buyPart}
          onClose={hideComputer}
        />
      )}
       
      {gameState === 'CONTRACTS' && (
        <ContractsScreen
          activeContract={gameLogic.activeContract}
          onSignContract={gameLogic.signContract}
          onClose={hideContracts}
        />
      )}
      
      {gameState === 'SETTING_PRICE' && (
        <SetPriceScreen
          device={gameLogic.currentDevice}
          onConfirm={handleConfirmPrice}
          onCancel={handleCancelSetPrice}
        />
      )}
      
      {gameState === 'DELIVERING' && (
        <DeliveryMapScreen
          price={deliveryPrice}
          onComplete={handleDeliveryComplete}
        />
      )}
    </div>
  );
}
