
export type GameState = 'MENU' | 'PLAYING' | 'COMPUTER' | 'SETTING_PRICE' | 'DELIVERING' | 'CONTRACTS';
export type DeviceType = 'PHONE' | 'CONSOLE' | 'CONTROLLER';

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
}

export interface DevicePart {
  id: string;
  type: PartType;
  isBroken: boolean;
  isAttached: boolean;
  color: string;
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

export interface Contract {
    id: string;
    brand: string;
    payment: number;
    durationInRepairs: number;
    description: string;
    logoColor: string;
}
