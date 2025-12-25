
import type { StoreItem, Contract } from './types';
import { PartType } from './types';

export const INITIAL_MONEY = 2500;
export const REPAIRS_PER_CONTRACT = 5;

export const PARTS_CATALOG: StoreItem[] = [
  // Phone Parts
  { id: PartType.BACK_COVER, name: "Tampa da Bateria (Celular)", price: 351, brand: "Eggotchi", image: "blue" },
  { id: PartType.BATTERY, name: "Bateria de Celular", price: 557, brand: "Eggotchi", image: "gray" },
  { id: PartType.MOTHERBOARD, name: "Placa Lógica (Celular)", price: 780, brand: "Atari CX40", image: "green" },
  { id: PartType.SCREEN, name: "Tela de Cristal Líquido", price: 1250, brand: "Shanktsung", image: "black" },
  { id: PartType.CAMERA, name: "Módulo de Câmera", price: 980, brand: "Fotoflash", image: "purple" },
  
  // Console Parts
  { id: PartType.TOP_CASING, name: "Carcaça Superior (Console)", price: 800, brand: "G-Station", image: "white" },
  { id: PartType.DISK_DRIVE, name: "Leitor de Disco Blu-Ray", price: 1100, brand: "G-Station", image: "dark-gray" },
  { id: PartType.FAN, name: "Ventoinha de Exaustão", price: 450, brand: "G-Station", image: "black" },
  { id: PartType.PSU, name: "Fonte de Alimentação Interna", price: 950, brand: "G-Station", image: "gray" },
  { id: PartType.CONSOLE_MOTHERBOARD, name: "Placa-mãe (Console)", price: 1500, brand: "G-Station", image: "dark-green" },

  // Controller Parts
  { id: PartType.CONTROLLER_SHELL, name: "Carcaça (Controle)", price: 250, brand: "G-Pad", image: "black" },
  { id: PartType.CONTROLLER_BATTERY, name: "Bateria Interna (Controle)", price: 300, brand: "G-Pad", image: "gray" },
  { id: PartType.CONTROLLER_MOTHERBOARD, name: "Placa de Circuito (Controle)", price: 400, brand: "G-Pad", image: "green" },
  { id: PartType.JOYSTICK, name: "Módulo Analógico Joystick", price: 150, brand: "G-Pad", image: "dark-gray" },
  { id: PartType.BUTTONS_PAD, name: "Botões de Ação e D-Pad", price: 120, brand: "G-Pad", image: "multi-color" },
];

export const CONTRACTS_DATA: Contract[] = [
    {
        id: 'tucano-01',
        brand: 'TucanoCell',
        payment: 300,
        durationInRepairs: REPAIRS_PER_CONTRACT,
        description: 'Seja um parceiro oficial da TucanoCell, a marca de celulares que voa alto! Receba um bônus por cada período de contrato para garantir o melhor serviço para nossos clientes.',
        logoColor: 'bg-yellow-500',
    }
]
