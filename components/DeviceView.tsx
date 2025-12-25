
import React, { Suspense, useMemo } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox, shaderMaterial } from '@react-three/drei';
// FIX: Import DeviceType to resolve 'Cannot find name' error.
import { PartType, type Device, type DevicePart, type DeviceType } from '../types';
import { Color } from 'three';

// --- Custom Gradient Shader Material for the Phone Screen ---
const GradientMaterial = shaderMaterial(
  {
    colorA: new Color('#007cf0'), // Blue
    colorB: new Color('#c039a3'), // Magenta/Pink
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform vec3 colorA;
    uniform vec3 colorB;
    void main() {
      // A smooth vertical gradient
      gl_FragColor = vec4(mix(colorA, colorB, vUv.y * 1.2 - 0.1), 1.0);
    }
  `
);
extend({ GradientMaterial });
// --- End of Shader Material ---

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

const getPartPositions = (deviceType: 'PHONE' | 'CONSOLE' | 'CONTROLLER'): Record<string, { pos: [number, number, number]; size: [number, number, number] }> => {
    switch (deviceType) {
        case 'PHONE':
            // FIX: Adjusted Z-positions to prevent visual clipping/Z-fighting.
            // Parts are layered correctly from front to back.
            return {
                [PartType.SCREEN]: { pos: [0, 0, 0.035], size: [0.95, 2, 0.02] }, // Front-most
                [PartType.MOTHERBOARD]: { pos: [0, 0, 0], size: [0.9, 1.8, 0.05] }, // Center
                [PartType.BATTERY]: { pos: [0, 0.2, -0.075], size: [0.7, 1.2, 0.1] }, // Behind motherboard
                [PartType.CAMERA]: { pos: [0.25, 0.75, -0.05], size: [0.2, 0.2, 0.05] }, // Behind motherboard
                [PartType.BACK_COVER]: { pos: [0, 0, -0.175], size: [1, 2.05, 0.1] }, // Back-most
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
        default:
            const _exhaustiveCheck: never = deviceType;
            throw new Error(`Unhandled device type: ${_exhaustiveCheck}`);
    }
}


const PartMeshComponent: React.FC<{ part: DevicePart; size: [number, number, number]; deviceType: DeviceType; }> = ({ part, size, deviceType }) => {
    const materialProps = {
        color: part.isBroken && !part.isAttached ? '#ff4d4d' : part.color,
        transparent: true,
        opacity: part.isBroken && part.isAttached ? 0.6 : 1.0,
    };

    if (deviceType === 'PHONE') {
        switch (part.type) {
            case PartType.SCREEN:
                return (
                    <group>
                        <RoundedBox args={size} radius={0.08}>
                            {/* @ts-ignore */}
                            <gradientMaterial attach="material" />
                        </RoundedBox>
                        {/* Notch */}
                        <mesh position={[0, size[1] / 2 - 0.05, 0.015]}>
                            <boxGeometry args={[0.4, 0.06, 0.08]} />
                            <meshStandardMaterial color="black" />
                        </mesh>
                    </group>
                );
            case PartType.BACK_COVER:
                return (
                    <group>
                        <RoundedBox args={size} radius={0.1}>
                            <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
                        </RoundedBox>
                        {/* Side Buttons */}
                        <mesh position={[-size[0] / 2 - 0.01, 0.4, 0]}>
                            <boxGeometry args={[0.02, 0.15, 0.1]} />
                            <meshStandardMaterial color="#222" />
                        </mesh>
                        <mesh position={[-size[0] / 2 - 0.01, 0.1, 0]}>
                            <boxGeometry args={[0.02, 0.3, 0.1]} />
                            <meshStandardMaterial color="#222" />
                        </mesh>
                        <mesh position={[size[0] / 2 + 0.01, 0.3, 0]}>
                            <boxGeometry args={[0.02, 0.3, 0.1]} />
                            <meshStandardMaterial color="#222" />
                        </mesh>
                    </group>
                );
            default:
                return (
                    <mesh>
                        <boxGeometry args={size} />
                        <meshStandardMaterial {...materialProps} />
                    </mesh>
                );
        }
    }

    // Default for Console and Controller
    return (
        <mesh>
            <boxGeometry args={size} />
            <meshStandardMaterial {...materialProps} />
        </mesh>
    );
};


interface DeviceViewProps {
  device: Device;
  onPartClick: (id: string) => void;
}

const DeviceView: React.FC<DeviceViewProps> = ({ device, onPartClick }) => {
  const getPart = (type: PartType) => device.parts.find(p => p.type === type);

  const positions = useMemo(() => getPartPositions(device.type), [device.type]);

  return (
    <Canvas camera={{ position: [0, 2, 4.5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Text position={[0, -2.5, 0]} fontSize={0.3} color="white" anchorX="center" >{device.name}</Text>

        <group>
          {Object.keys(positions).map((type, index) => {
            const { pos, size } = positions[type as PartType];
            const part = getPart(type as PartType);
            if (!part) return null;

            const isAttached = part.isAttached;
            const detachedX = -4 + (index % 3) * 3;
            const detachedY = 2.5 - Math.floor(index / 3) * 2.5;

            const currentPosition: [number, number, number] = isAttached ? pos : [detachedX, detachedY, 0];

            return (
              <group key={part.id} position={currentPosition}>
                <DevicePart3D part={part} onClick={onPartClick}>
                    <PartMeshComponent part={part} size={size} deviceType={device.type} />
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
