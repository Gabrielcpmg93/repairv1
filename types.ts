
export type GameState = 'MENU' | 'PLAYING' | 'COMPUTER' | 'SETTING_PRICE' | 'DELIVERING' | 'SPONSORSHIP' | 'REPAIR_HISTORY';
export type DeviceType = 'PHONE' | 'CONSOLE' | 'CONTROLLER' | 'RADIO' | 'TELEVISION' | 'BICYCLE' | 'ROUTER' | 'CAR';

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

  // Bicycle Parts
  BIKE_FRAME = 'Quadro de Bicicleta',
  WHEEL = 'Roda de Bicicleta',
  CHAIN = 'Corrente',
  PEDALS = 'Pedais',
  HANDLEBARS = 'Guidão',

  // Router Parts
  ROUTER_CASING = 'Carcaça do Roteador',
  ROUTER_MAINBOARD = 'Placa Principal do Roteador',
  ROUTER_ANTENNA = 'Antena do Roteador',
  ROUTER_PSU = 'Fonte do Roteador',

  // Car Parts
  CAR_CHASSIS = 'Chassi do Carro',
  ENGINE = 'Motor',
  CAR_WHEEL = 'Roda de Carro',
  STEERING_WHEEL = 'Volante',
  CAR_BATTERY = 'Bateria de Carro',
}

export interface DevicePart {
  id: string;
  type: PartType;
  isBroken: boolean;
  isAttached: boolean;
  color: string;
}

export interface WorkbenchPart {
  id:string;
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
