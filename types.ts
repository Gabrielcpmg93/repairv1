
export type GameState = 'MENU' | 'PLAYING' | 'COMPUTER' | 'SETTING_PRICE' | 'DELIVERING' | 'SPONSORSHIP' | 'REPAIR_HISTORY';
export type DeviceType = 'PHONE' | 'CONSOLE' | 'CONTROLLER' | 'RADIO' | 'TELEVISION';

export enum PartType {
  // Phone Parts
  SCREEN = 'Tela',
  BATTERY = 'Bateria',
  BACK_COVER = 'Tampa Traseira',
  MOTHERBOARD = 'Placa-mãe de Celular',
  CAMERA = 'Câmera',
  
  // Console Parts
  PSU = 'Fonte de Alimentação',
  FAN = 'Ventoinha',
  CONSOLE_MOTHERBOARD = 'Placa-mãe de Console',
  DISK_DRIVE = 'Leitor de Disco',
  TOP_CASING = 'Carcaça Superior',
  
  // Controller Parts
  CONTROLLER_SHELL = 'Carcaça do Controle',
  CONTROLLER_BATTERY = 'Bateria de Controle',
  CONTROLLER_MOTHERBOARD = 'Placa-mãe de Controle',
  JOYSTICK = 'Joystick',
  BUTTONS_PAD = 'Botões de Ação',

  // Radio Parts
  RADIO_CASING = 'Carcaça de Rádio',
  SPEAKER = 'Alto-falante',
  ANTENNA = 'Antena',
  RADIO_TUNER = 'Sintonizador de Rádio',
  RADIO_PSU = 'Fonte de Rádio',

  // Television Parts
  TV_PANEL = 'Painel de LED',
  TV_MAINBOARD = 'Placa Principal de TV',
  TV_PSU = 'Fonte de TV',
  T_CON_BOARD = 'Placa T-Con',
  TV_CASING = 'Carcaça de TV',
}

export interface DevicePart {
  id: string;
  type: PartType;
  isBroken: boolean;
  isAttached: boolean;
  color: string;
}

export interface WorkbenchPart {
  id: string;
  type: PartType;
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  parts: DevicePart[];
}

export interface StoreItem {
    id: PartType;
    name: string;
    price: number;
    brand: string;
    image: string; // A simple representation, could be a color or icon name
}