
import type { StoreItem } from './types';
import { PartType } from './types';

export const INITIAL_MONEY = 2500;

export const SPONSORSHIP_DEAL = {
    brand: 'Quantum Core',
    paymentPerSecond: 500,
    description: 'Faça uma parceria com a Quantum Core, líder em computação de ponta, e receba um fluxo de renda constante para financiar sua oficina.',
    logoColor: 'bg-indigo-500',
};

export const PARTS_CATALOG: StoreItem[] = [
  // Phone Parts
  { id: PartType.BACK_COVER, name: "Tampa da Bateria (Celular)", price: 351, brand: "Eggotchi", image: "blue" },
  { id: PartType.BATTERY, name: "Bateria de Celular", price: 557, brand: "Eggotchi", image: "gray" },
  { id: PartType.MOTHERBOARD, name: "Placa Lógica (Celular)", price: 780, brand: "Atari CX40", image: "green" },
  { id: PartType.SCREEN, name: "Tela de Cristal Líquido", price: 1250, brand: "Shanktsung", image: "black" },
  { id: PartType.CAMERA, name: "Módulo de Câmera", price: 980, brand: "Fotoflash", image: "purple" },
  
  // Console Parts
  { id: PartType.TOP_CASING, name: "Carcaça Superior (Nintari-S)", price: 800, brand: "Nintari", image: "white" },
  { id: PartType.DISK_DRIVE, name: "Conector de Cartucho", price: 1100, brand: "Nintari", image: "dark-gray" },
  { id: PartType.FAN, name: "Ventoinha de Exaustão", price: 450, brand: "Nintari", image: "black" },
  { id: PartType.PSU, name: "Fonte de Alimentação Interna", price: 950, brand: "Nintari", image: "gray" },
  { id: PartType.CONSOLE_MOTHERBOARD, name: "Placa-mãe (Nintari-S)", price: 1500, brand: "Nintari", image: "dark-green" },

  // Controller Parts
  { id: PartType.CONTROLLER_SHELL, name: "Carcaça (Controle Nintari)", price: 250, brand: "Nintari", image: "white" },
  { id: PartType.CONTROLLER_BATTERY, name: "Bateria Interna (Controle)", price: 300, brand: "Nintari", image: "gray" },
  { id: PartType.CONTROLLER_MOTHERBOARD, name: "Placa de Circuito (Controle)", price: 400, brand: "Nintari", image: "green" },
  { id: PartType.JOYSTICK, name: "Módulo Analógico Joystick", price: 150, brand: "Nintari", image: "dark-gray" },
  { id: PartType.BUTTONS_PAD, name: "Botões de Ação e D-Pad", price: 120, brand: "Nintari", image: "multi-color" },
];
