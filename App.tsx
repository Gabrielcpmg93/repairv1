
import React, { useState, useCallback } from 'react';
import MainMenu from './components/MainMenu';
import GameScreen from './components/GameScreen';
import useGameLogic from './hooks/useGameLogic';
import ComputerScreen from './components/ComputerScreen';
import SetPriceScreen from './components/SetPriceScreen';
import DeliveryMapScreen from './components/DeliveryMapScreen';
import SponsorshipScreen from './components/ContractsScreen';
import RepairHistoryScreen from './components/RepairHistoryScreen';
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
  const showSponsorships = useCallback(() => setGameState('SPONSORSHIP'), []);
  const hideSponsorships = useCallback(() => setGameState('PLAYING'), []);
  const showRepairHistory = useCallback(() => setGameState('REPAIR_HISTORY'), []);
  const hideRepairHistory = useCallback(() => setGameState('PLAYING'), []);
  
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

  const handleSignSponsorship = useCallback(() => {
    gameLogic.signSponsorship();
    hideSponsorships();
  }, [gameLogic, hideSponsorships]);


  return (
    <div className="bg-gray-800 text-white w-screen h-screen overflow-hidden font-sans">
      {gameState === 'MENU' && <MainMenu onStartGame={startGame} />}
      
      {(gameState === 'PLAYING' || gameState === 'COMPUTER' || gameState === 'SPONSORSHIP' || gameState === 'REPAIR_HISTORY') && (
        <GameScreen
          {...gameLogic}
          repairCount={gameLogic.repairedDevices.length}
          onShowComputer={showComputer}
          onShowSponsorships={showSponsorships}
          onShowRepairHistory={showRepairHistory}
          onStartDelivery={handleStartDelivery}
        />
      )}
      
      {gameState === 'COMPUTER' && (
        <ComputerScreen
          money={gameLogic.money}
          inventory={gameLogic.inventory}
          repairCount={gameLogic.repairedDevices.length}
          sellingItems={gameLogic.sellingItems}
          onBuyPart={gameLogic.buyPart}
          onCraftPart={gameLogic.craftPart}
          onSellPart={gameLogic.sellPart}
          onClose={hideComputer}
        />
      )}
       
      {gameState === 'SPONSORSHIP' && (
        <SponsorshipScreen
          sponsorshipActive={gameLogic.sponsorshipActive}
          onSign={handleSignSponsorship}
          onClose={hideSponsorships}
        />
      )}

      {gameState === 'REPAIR_HISTORY' && (
        <RepairHistoryScreen
            devices={gameLogic.repairedDevices}
            onClose={hideRepairHistory}
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
