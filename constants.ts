
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
  { id: PartType.DISK_DRIVE, name: "Leitor de Disco / Cartucho", price: 1100, brand: "Nintari", image: "dark-gray" },
  { id: PartType.FAN, name: "Ventoinha de Exaustão", price: 450, brand: "Nintari", image: "black" },
  { id: PartType.PSU, name: "Fonte de Alimentação Interna", price: 950, brand: "Nintari", image: "gray" },
  { id: PartType.CONSOLE_MOTHERBOARD, name: "Placa-mãe (Nintari-S)", price: 1500, brand: "Nintari", image: "dark-green" },

  // Controller Parts
  { id: PartType.CONTROLLER_SHELL, name: "Carcaça (Controle Nintari)", price: 250, brand: "Nintari", image: "white" },
  { id: PartType.CONTROLLER_BATTERY, name: "Bateria Interna (Controle)", price: 300, brand: "Nintari", image: "gray" },
  { id: PartType.CONTROLLER_MOTHERBOARD, name: "Placa de Circuito (Controle)", price: 400, brand: "Nintari", image: "green" },
  { id: PartType.JOYSTICK, name: "Módulo Analógico Joystick", price: 150, brand: "Nintari", image: "dark-gray" },
  { id: PartType.BUTTONS_PAD, name: "Botões de Ação e D-Pad", price: 120, brand: "Nintari", image: "multi-color" },

  // Radio Parts
  { id: PartType.RADIO_CASING, name: "Carcaça de Rádio Vintage", price: 400, brand: "Sonosonic", image: "brown" },
  { id: PartType.SPEAKER, name: "Alto-falante 10W", price: 250, brand: "Sonosonic", image: "black" },
  { id: PartType.ANTENNA, name: "Antena Telescópica", price: 100, brand: "SignalMax", image: "gray" },
  { id: PartType.RADIO_TUNER, name: "Placa Sintonizadora AM/FM", price: 350, brand: "Sonosonic", image: "green" },
  { id: PartType.RADIO_PSU, name: "Fonte de Alimentação de Rádio", price: 200, brand: "Voltz", image: "dark-gray" },

  // Television Parts
  { id: PartType.TV_CASING, name: "Carcaça Traseira de TV LED", price: 600, brand: "Panaview", image: "black" },
  { id: PartType.TV_PANEL, name: "Painel de LED 42 pol.", price: 1800, brand: "Panaview", image: "black" },
  { id: PartType.TV_MAINBOARD, name: "Placa Principal de TV", price: 900, brand: "Panaview", image: "dark-green" },
  { id: PartType.TV_PSU, name: "Fonte de Alimentação de TV", price: 750, brand: "Voltz", image: "gray" },
  { id: PartType.T_CON_BOARD, name: "Placa T-Con (Controladora)", price: 450, brand: "Panaview", image: "green" },

  // Bicycle Parts
  { id: PartType.BIKE_FRAME, name: "Quadro de Bicicleta", price: 1200, brand: "PedalMaster", image: "blue" },
  { id: PartType.WHEEL, name: "Roda com Pneu", price: 350, brand: "PedalMaster", image: "black" },
  { id: PartType.CHAIN, name: "Corrente", price: 150, brand: "GearShift", image: "gray" },
  { id: PartType.PEDALS, name: "Par de Pedais", price: 120, brand: "PedalMaster", image: "dark-gray" },
  { id: PartType.HANDLEBARS, name: "Guidão", price: 200, brand: "PedalMaster", image: "gray" },

  // Router Parts
  { id: PartType.ROUTER_CASING, name: "Carcaça de Roteador", price: 150, brand: "ConnectNet", image: "white" },
  { id: PartType.ROUTER_MAINBOARD, name: "Placa Principal de Roteador", price: 450, brand: "ConnectNet", image: "green" },
  { id: PartType.ROUTER_ANTENNA, name: "Antena Wi-Fi", price: 80, brand: "SignalMax", image: "black" },
  { id: PartType.ROUTER_PSU, name: "Fonte de Roteador", price: 120, brand: "Voltz", image: "dark-gray" },

  // Car Parts
  { id: PartType.CAR_CHASSIS, name: "Chassi de Carro", price: 3500, brand: "AutoForm", image: "red" },
  { id: PartType.ENGINE, name: "Motor V4", price: 5000, brand: "AutoForm", image: "dark-gray" },
  { id: PartType.CAR_WHEEL, name: "Roda de Carro", price: 600, brand: "GripTire", image: "black" },
  { id: PartType.STEERING_WHEEL, name: "Volante", price: 400, brand: "AutoForm", image: "black" },
  { id: PartType.CAR_BATTERY, name: "Bateria de Carro", price: 700, brand: "Voltz", image: "gray" },
];
