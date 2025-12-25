import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
// FIX: Import `PartType` as a value to access its enum members, while keeping Device and DevicePart as type-only imports.
import { PartType, type Device, type DevicePart } from '../types';

interface DevicePart3DProps {
  part: DevicePart;
  onClick: (id: string) => void;
  children: React.ReactNode;
}

const DevicePart3D: React.FC<DevicePart3DProps> = ({ part, onClick, children }) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick(part.id);
  };
  
  return (
    <group onClick={handleClick}>
      {children}
    </group>
  );
};

// FIX: Add an explicit return type to ensure TypeScript can correctly infer the object shape for destructuring `pos` and `size` properties later.
const getPartPositions = (deviceType: 'PHONE' | 'CONSOLE' | 'CONTROLLER'): Record<string, { pos: [number, number, number]; size: [number, number, number] }> => {
    switch (deviceType) {
        case 'PHONE':
            return {
                [PartType.SCREEN]: { pos: [0, 0, 0.05], size: [1, 2, 0.1] },
                [PartType.MOTHERBOARD]: { pos: [0, 0, 0], size: [0.9, 1.8, 0.1] },
                [PartType.BATTERY]: { pos: [0, 0.2, -0.1], size: [0.7, 1.2, 0.2] },
                [PartType.CAMERA]: { pos: [0.25, 0.7, -0.05], size: [0.2, 0.2, 0.1] },
                [PartType.BACK_COVER]: { pos: [0, 0, -0.25], size: [1.05, 2.05, 0.1] },
            };
        case 'CONSOLE':
            return {
                [PartType.CONSOLE_MOTHERBOARD]: { pos: [0, -0.2, 0], size: [2.5, 0.1, 2.5] },
                [PartType.PSU]: { pos: [-0.8, 0.1, 0], size: [0.8, 0.5, 2] },
                [PartType.FAN]: { pos: [0.8, 0.1, 0.8], size: [0.8, 0.3, 0.8] },
                [PartType.DISK_DRIVE]: { pos: [0.8, 0.1, -0.8], size: [0.8, 0.3, 0.8] },
                [PartType.TOP_CASING]: { pos: [0, 0.5, 0], size: [2.6, 0.4, 2.6] },
            };
        case 'CONTROLLER':
             return {
                [PartType.CONTROLLER_MOTHERBOARD]: { pos: [0, 0, 0], size: [1.2, 0.1, 0.6] },
                [PartType.CONTROLLER_BATTERY]: { pos: [0, 0.1, 0], size: [0.8, 0.2, 0.5] },
                [PartType.JOYSTICK]: { pos: [-0.4, 0.2, 0], size: [0.25, 0.3, 0.25] },
                [PartType.BUTTONS_PAD]: { pos: [0.4, 0.2, 0], size: [0.4, 0.1, 0.4] },
                [PartType.CONTROLLER_SHELL]: { pos: [0, 0.15, 0], size: [1.8, 0.4, 0.8] },
            };
        // FIX: Added an exhaustive check for the switch statement. This improves type safety and allows TypeScript to correctly infer the return type, resolving destructuring errors for 'pos' and 'size'.
        default:
            const _exhaustiveCheck: never = deviceType;
            throw new Error(`Unhandled device type: ${_exhaustiveCheck}`);
    }
}

interface DeviceViewProps {
  device: Device;
  onPartClick: (id: string) => void;
}

const DeviceView: React.FC<DeviceViewProps> = ({ device, onPartClick }) => {
  const getPart = (type: PartType) => device.parts.find(p => p.type === type);

  const positions = useMemo(() => getPartPositions(device.type), [device.type]);

  const PartMesh: React.FC<{part: DevicePart, size: any}> = ({ part, size }) => (
    <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
            color={part.isBroken && !part.isAttached ? '#ff4d4d' : part.color}
            transparent
            opacity={part.isBroken && part.isAttached ? 0.6 : 1.0}
            polygonOffset
            polygonOffsetFactor={-1}
        />
    </mesh>
  );

  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Text position={[0, -2.5, 0]} fontSize={0.3} color="white" anchorX="center" >{device.name}</Text>

        <group>
          {Object.entries(positions).map(([type, { pos, size }], index) => {
            const part = getPart(type as PartType);
            if (!part) return null;

            const isAttached = part.isAttached;
            const detachedX = -4 + (index % 3) * 3;
            const detachedY = 2.5 - Math.floor(index / 3) * 2.5;

            const currentPosition: [number, number, number] = isAttached ? pos : [detachedX, detachedY, 0];

            return (
              <group key={part.id} position={currentPosition}>
                <DevicePart3D part={part} onClick={onPartClick}>
                    <PartMesh part={part} size={size} />
                </DevicePart3D>
                 {part.isBroken && (
                    <Text
                        position={[0, size[1]/2 + 0.3, 0]}
                        fontSize={0.25}
                        color="red"
                        anchorX="center"
                        anchorY="middle"
                        rotation={[-Math.PI / 4, 0, 0]}
                    >
                        QUEBRADO!
                    </Text>
                 )}
              </group>
            );
          })}
        </group>

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
};

export default DeviceView;