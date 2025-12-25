
import { useState, useCallback, useEffect } from 'react';
import type { Device, DevicePart, PartType, StoreItem } from '../types';
import { INITIAL_MONEY } from '../constants';
import { PartType as PartTypeEnum } from '../types';

const generatePhone = (): Device => {
    const parts: DevicePart[] = [
        { id: 'p1', type: PartTypeEnum.BACK_COVER, isBroken: false, isAttached: true, color: '#4299e1' },
        { id: 'p2', type: PartTypeEnum.BATTERY, isBroken: false, isAttached: true, color: '#a0aec0' },
        { id: 'p3', type: PartTypeEnum.MOTHERBOARD, isBroken: false, isAttached: true, color: '#48bb78' },
        { id: 'p4', type: PartTypeEnum.CAMERA, isBroken: false, isAttached: true, color: '#805ad5' },
        { id: 'p5', type: PartTypeEnum.SCREEN, isBroken: false, isAttached: true, color: '#2d3748' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `phone-${Date.now()}`, name: 'Gozilla Fone 3D', type: 'PHONE', parts };
};

const generateConsole = (): Device => {
    const parts: DevicePart[] = [
        { id: 'c1', type: PartTypeEnum.TOP_CASING, isBroken: false, isAttached: true, color: '#e2e8f0' },
        { id: 'c2', type: PartTypeEnum.DISK_DRIVE, isBroken: false, isAttached: true, color: '#4a5568' },
        { id: 'c3', type: PartTypeEnum.FAN, isBroken: false, isAttached: true, color: '#2d3748' },
        { id: 'c4', type: PartTypeEnum.PSU, isBroken: false, isAttached: true, color: '#a0aec0' },
        { id: 'c5', type: PartTypeEnum.CONSOLE_MOTHERBOARD, isBroken: false, isAttached: true, color: '#2f855a' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `console-${Date.now()}`, name: 'G-Station', type: 'CONSOLE', parts };
};

const generateController = (): Device => {
    const parts: DevicePart[] = [
        { id: 't1', type: PartTypeEnum.CONTROLLER_SHELL, isBroken: false, isAttached: true, color: '#2d3748' },
        { id: 't2', type: PartTypeEnum.CONTROLLER_BATTERY, isBroken: false, isAttached: true, color: '#718096' },
        { id: 't3', type: PartTypeEnum.CONTROLLER_MOTHERBOARD, isBroken: false, isAttached: true, color: '#48bb78' },
        { id: 't4', type: PartTypeEnum.JOYSTICK, isBroken: false, isAttached: true, color: '#4a5568' },
        { id: 't5', type: PartTypeEnum.BUTTONS_PAD, isBroken: false, isAttached: true, color: '#a0aec0' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `controller-${Date.now()}`, name: 'G-Pad', type: 'CONTROLLER', parts };
};

const deviceGenerators = [generatePhone, generateConsole, generateController];

export default function useGameLogic() {
    const [money, setMoney] = useState(INITIAL_MONEY);
    const [inventory, setInventory] = useState<PartType[]>([]);
    const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
    const [roundCompleted, setRoundCompleted] = useState(false);
    const [sponsorshipActive, setSponsorshipActive] = useState(false);

    useEffect(() => {
        if (sponsorshipActive) {
            const intervalId = setInterval(() => {
                setMoney(prev => prev + 500);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [sponsorshipActive]);

    const startNewRound = useCallback(() => {
        const randomGenerator = deviceGenerators[Math.floor(Math.random() * deviceGenerators.length)];
        setCurrentDevice(randomGenerator());
        setRoundCompleted(false);
    }, []);

    const collectPaymentAndStartNewRound = useCallback((price: number) => {
        setMoney(prev => prev + price);
        startNewRound();
    }, [startNewRound]);
    
    const buyPart = useCallback((item: StoreItem) => {
        if (money >= item.price) {
            setMoney(prev => prev - item.price);
            setInventory(prev => [...prev, item.id]);
            return true;
        }
        alert("Dinheiro insuficiente!");
        return false;
    }, [money]);

    const checkWinCondition = useCallback((device: Device) => {
        if (roundCompleted) return;
        const allAttached = device.parts.every(p => p.isAttached);
        const allFixed = device.parts.every(p => !p.isBroken);

        if (allAttached && allFixed) {
            setRoundCompleted(true);
        }
    }, [roundCompleted]);

    const togglePartAttachment = useCallback((partId: string) => {
        setCurrentDevice(prevDevice => {
            if (!prevDevice) return null;
            const newParts = prevDevice.parts.map(p => 
                p.id === partId ? { ...p, isAttached: !p.isAttached } : p
            );
            const newDevice = { ...prevDevice, parts: newParts };
            checkWinCondition(newDevice);
            return newDevice;
        });
    }, [checkWinCondition]);

    const swapPart = useCallback((partId: string) => {
       setCurrentDevice(prevDevice => {
            if (!prevDevice) return null;
            const partToSwap = prevDevice.parts.find(p => p.id === partId);
            if (!partToSwap || !partToSwap.isBroken) return prevDevice;

            const inventoryHasReplacement = inventory.includes(partToSwap.type);
            if (!inventoryHasReplacement) {
                alert(`Você precisa de uma peça '${partToSwap.type}' nova no inventário!`);
                return prevDevice;
            }

            const inventoryIndex = inventory.indexOf(partToSwap.type);
            setInventory(prev => {
                const newInventory = [...prev];
                newInventory.splice(inventoryIndex, 1);
                return newInventory;
            });
            
            const newParts = prevDevice.parts.map(p =>
                p.id === partId ? { ...p, isBroken: false } : p
            );

            const newDevice = { ...prevDevice, parts: newParts };
            checkWinCondition(newDevice);
            return newDevice;
       });
    }, [inventory, checkWinCondition]);

    const signSponsorship = useCallback(() => {
        if (!sponsorshipActive) {
            setSponsorshipActive(true);
        }
    }, [sponsorshipActive]);

    return {
        money,
        inventory,
        currentDevice,
        roundCompleted,
        sponsorshipActive,
        startNewRound,
        collectPaymentAndStartNewRound,
        buyPart,
        togglePartAttachment,
        swapPart,
        signSponsorship,
    };
}
