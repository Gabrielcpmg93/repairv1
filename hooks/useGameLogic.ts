
import { useState, useCallback, useEffect } from 'react';
import type { Device, DevicePart, PartType, StoreItem, WorkbenchPart } from '../types';
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
        { id: 'c1', type: PartTypeEnum.TOP_CASING, isBroken: false, isAttached: true, color: '#d1d5db' },
        { id: 'c2', type: PartTypeEnum.DISK_DRIVE, isBroken: false, isAttached: true, color: '#4a5568' },
        { id: 'c3', type: PartTypeEnum.FAN, isBroken: false, isAttached: true, color: '#2d3748' },
        { id: 'c4', type: PartTypeEnum.PSU, isBroken: false, isAttached: true, color: '#a0aec0' },
        { id: 'c5', type: PartTypeEnum.CONSOLE_MOTHERBOARD, isBroken: false, isAttached: true, color: '#2f855a' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `console-${Date.now()}`, name: 'Super Retro Console', type: 'CONSOLE', parts };
};

const generateController = (): Device => {
    const parts: DevicePart[] = [
        { id: 't1', type: PartTypeEnum.CONTROLLER_SHELL, isBroken: false, isAttached: true, color: '#d1d5db' },
        { id: 't2', type: PartTypeEnum.CONTROLLER_BATTERY, isBroken: false, isAttached: true, color: '#718096' },
        { id: 't3', type: PartTypeEnum.CONTROLLER_MOTHERBOARD, isBroken: false, isAttached: true, color: '#48bb78' },
        { id: 't4', type: PartTypeEnum.JOYSTICK, isBroken: false, isAttached: true, color: '#4a5568' },
        { id: 't5', type: PartTypeEnum.BUTTONS_PAD, isBroken: false, isAttached: true, color: '#a0aec0' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `controller-${Date.now()}`, name: 'Super Retro Pad', type: 'CONTROLLER', parts };
};

const generateRadio = (): Device => {
    const parts: DevicePart[] = [
        { id: 'r1', type: PartTypeEnum.RADIO_CASING, isBroken: false, isAttached: true, color: '#8B4513' }, // SaddleBrown
        { id: 'r2', type: PartTypeEnum.SPEAKER, isBroken: false, isAttached: true, color: '#333333' },
        { id: 'r3', type: PartTypeEnum.ANTENNA, isBroken: false, isAttached: true, color: '#C0C0C0' }, // Silver
        { id: 'r4', type: PartTypeEnum.RADIO_TUNER, isBroken: false, isAttached: true, color: '#2f855a' },
        { id: 'r5', type: PartTypeEnum.RADIO_PSU, isBroken: false, isAttached: true, color: '#4a5568' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `radio-${Date.now()}`, name: 'Rádio Transistor Vintage', type: 'RADIO', parts };
};

const generateTelevision = (): Device => {
    const parts: DevicePart[] = [
        { id: 'tv1', type: PartTypeEnum.TV_CASING, isBroken: false, isAttached: true, color: '#2d3748' },
        { id: 'tv2', type: PartTypeEnum.TV_PANEL, isBroken: false, isAttached: true, color: '#1a202c' },
        { id: 'tv3', type: PartTypeEnum.TV_MAINBOARD, isBroken: false, isAttached: true, color: '#2f855a' },
        { id: 'tv4', type: PartTypeEnum.TV_PSU, isBroken: false, isAttached: true, color: '#a0aec0' },
        { id: 'tv5', type: PartTypeEnum.T_CON_BOARD, isBroken: false, isAttached: true, color: '#48bb78' },
    ];
    const partToBreakIndex = Math.floor(Math.random() * parts.length);
    parts[partToBreakIndex].isBroken = true;
    return { id: `television-${Date.now()}`, name: 'TV de LED Panaview', type: 'TELEVISION', parts };
};

const deviceGenerators = [generatePhone, generateConsole, generateController, generateRadio, generateTelevision];

const checkWinCondition = (device: Device | null): boolean => {
    if (!device) return false;
    const allAttached = device.parts.every(p => p.isAttached);
    const allFixed = device.parts.every(p => !p.isBroken);
    return allAttached && allFixed;
};


interface GameLogicState {
    money: number;
    workbenchParts: WorkbenchPart[];
    currentDevice: Device | null;
    repairedDevices: Device[];
    roundCompleted: boolean;
    sponsorshipActive: boolean;
    sellingItems: { part: PartType; price: number; id: string }[];
}

const initialState: GameLogicState = {
    money: INITIAL_MONEY,
    workbenchParts: [],
    currentDevice: null,
    repairedDevices: [],
    roundCompleted: false,
    sponsorshipActive: false,
    sellingItems: [],
};

export default function useGameLogic() {
    const [state, setState] = useState<GameLogicState>(initialState);

    useEffect(() => {
        if (state.sponsorshipActive) {
            const intervalId = setInterval(() => {
                setState(prevState => ({ ...prevState, money: prevState.money + 500 }));
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [state.sponsorshipActive]);

    const startNewRound = useCallback(() => {
        const randomGenerator = deviceGenerators[Math.floor(Math.random() * deviceGenerators.length)];
        setState(prevState => ({
            ...prevState,
            currentDevice: randomGenerator(),
            roundCompleted: false,
        }));
    }, []);

    const collectPaymentAndStartNewRound = useCallback((price: number) => {
        const randomGenerator = deviceGenerators[Math.floor(Math.random() * deviceGenerators.length)];
        setState(prevState => {
            if (!prevState.currentDevice) return prevState;
            return {
                ...prevState,
                money: prevState.money + price,
                repairedDevices: [...prevState.repairedDevices, prevState.currentDevice],
                currentDevice: randomGenerator(),
                roundCompleted: false,
            };
        });
    }, []);
    
    const buyPart = useCallback((item: StoreItem) => {
        let success = false;
        setState(prevState => {
            if (prevState.money >= item.price) {
                success = true;
                const newPart: WorkbenchPart = { id: `new-${item.id}-${Date.now()}`, type: item.id };
                return {
                    ...prevState,
                    money: prevState.money - item.price,
                    workbenchParts: [...prevState.workbenchParts, newPart],
                };
            }
            return prevState;
        });
        if (!success) {
            alert("Dinheiro insuficiente!");
        }
        return success;
    }, []);

    const craftPart = useCallback((item: StoreItem) => {
        const craftingCost = Math.floor(item.price * 0.75);
        let success = false;
        setState(prevState => {
            if (prevState.money >= craftingCost) {
                success = true;
                 const newPart: WorkbenchPart = { id: `new-${item.id}-${Date.now()}`, type: item.id };
                return {
                    ...prevState,
                    money: prevState.money - craftingCost,
                    workbenchParts: [...prevState.workbenchParts, newPart],
                };
            }
            return prevState;
        });
        if (!success) {
            alert("Dinheiro insuficiente para criar esta peça!");
        }
        return success;
    }, []);

    const sellPart = useCallback((partType: PartType, price: number) => {
        if (!partType || price <= 0) {
            console.error("Tentativa de venda inválida.", { partType, price });
            return false;
        }

        let success = false;
        const saleId = `${partType}-${Date.now()}`;
        
        setState(prevState => {
            const partIndex = prevState.workbenchParts.findIndex(p => p.type === partType);
            if (partIndex === -1) {
                return prevState;
            }
            success = true;
            const newWorkbenchParts = [...prevState.workbenchParts];
            newWorkbenchParts.splice(partIndex, 1);
            const newSellingItem = { part: partType, price, id: saleId };
            return {
                ...prevState,
                workbenchParts: newWorkbenchParts,
                sellingItems: [...prevState.sellingItems, newSellingItem],
            };
        });

        if (success) {
            setTimeout(() => {
                setState(prevState => ({
                    ...prevState,
                    money: prevState.money + price,
                    sellingItems: prevState.sellingItems.filter(item => item.id !== saleId),
                }));
            }, 2000);
        } else {
             alert("Peça não encontrada no inventário!");
        }
        return success;
    }, []);

    const togglePartAttachment = useCallback((partId: string) => {
        setState(prevState => {
            if (!prevState.currentDevice) return prevState;
            const newParts = prevState.currentDevice.parts.map(p => 
                p.id === partId ? { ...p, isAttached: !p.isAttached } : p
            );
            const newDevice = { ...prevState.currentDevice, parts: newParts };
            return {
                ...prevState,
                currentDevice: newDevice,
                roundCompleted: prevState.roundCompleted || checkWinCondition(newDevice),
            };
        });
    }, []);

    const installNewPart = useCallback((newPartId: string) => {
        setState(prevState => {
            const { currentDevice, workbenchParts } = prevState;
            if (!currentDevice) return prevState;
            
            const newPart = workbenchParts.find(p => p.id === newPartId);
            if (!newPart) return prevState;

            const brokenPartIndex = currentDevice.parts.findIndex(p => p.type === newPart.type && p.isBroken);
            if (brokenPartIndex === -1) {
                 alert("Não há uma peça quebrada correspondente para instalar esta peça nova.");
                return prevState;
            }

            const newWorkbenchParts = workbenchParts.filter(p => p.id !== newPartId);

            const newParts = [...currentDevice.parts];
            newParts[brokenPartIndex] = { ...newParts[brokenPartIndex], isBroken: false };
            
            const newDevice = { ...currentDevice, parts: newParts };
            
            return {
                ...prevState,
                workbenchParts: newWorkbenchParts,
                currentDevice: newDevice,
                roundCompleted: prevState.roundCompleted || checkWinCondition(newDevice),
            };
        });
    }, []);

    const signSponsorship = useCallback(() => {
        setState(prevState => {
            if (prevState.sponsorshipActive) return prevState;
            return { ...prevState, sponsorshipActive: true };
        });
    }, []);

    return {
        ...state,
        startNewRound,
        collectPaymentAndStartNewRound,
        buyPart,
        craftPart,
        sellPart,
        togglePartAttachment,
        installNewPart,
        signSponsorship,
    };
}
