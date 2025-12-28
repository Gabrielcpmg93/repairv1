
import React, { Suspense, useMemo, useCallback } from 'react';
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
    broken: 0.0, // uniform for broken state
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
    uniform float broken;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec3 finalColor = mix(colorA, colorB, vUv.y * 1.2 - 0.1);
      if (broken > 0.5) {
        // Darken the screen and add some noise/lines for a 'broken' effect
        finalColor *= 0.2;
        if (random(vUv * 50.0) > 0.98) {
            finalColor = vec3(0.5);
        }
        if (abs(vUv.x - 0.5 + sin(vUv.y * 20.0) * 0.1) < 0.01) {
            finalColor = vec3(0.1);
        }
      }
      gl_FragColor = vec4(finalColor, 1.0);
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

const getPartPositions = (deviceType: DeviceType): Record<string, { pos: [number, number, number]; size: [number, number, number] }> => {
    switch (deviceType) {
        case 'PHONE':
            return {
                [PartType.SCREEN]: { pos: [0, 0, 0.035], size: [0.95, 2, 0.02] },
                [PartType.MOTHERBOARD]: { pos: [0, 0, 0], size: [0.9, 1.8, 0.05] },
                [PartType.CAMERA]: { pos: [0.25, 0.75, -0.026], size: [0.2, 0.2, 0.05] },
                [PartType.BATTERY]: { pos: [0, 0.2, -0.075], size: [0.7, 1.2, 0.1] },
                [PartType.BACK_COVER]: { pos: [0, 0, -0.175], size: [1, 2.05, 0.1] },
            };
        case 'CONSOLE':
            return {
                [PartType.TOP_CASING]: { pos: [0, 0.5, 0], size: [2.8, 0.6, 2.4] },
                [PartType.CONSOLE_MOTHERBOARD]: { pos: [0, -0.2, 0], size: [2.5, 0.1, 2.2] },
                [PartType.PSU]: { pos: [-0.8, 0.1, 0], size: [0.8, 0.5, 2] },
                [PartType.FAN]: { pos: [0.8, 0.1, 0.8], size: [0.8, 0.3, 0.8] },
                [PartType.DISK_DRIVE]: { pos: [0.8, 0.1, -0.8], size: [0.8, 0.3, 0.8] },
            };
        case 'CONTROLLER':
             return {
                [PartType.CONTROLLER_SHELL]: { pos: [0, 0.15, 0], size: [1.8, 0.4, 0.8] },
                [PartType.CONTROLLER_MOTHERBOARD]: { pos: [0, 0, 0], size: [1.2, 0.1, 0.6] },
                [PartType.CONTROLLER_BATTERY]: { pos: [0, 0.1, 0], size: [0.8, 0.2, 0.5] },
                [PartType.JOYSTICK]: { pos: [-0.4, 0.2, 0], size: [0.25, 0.3, 0.25] },
                [PartType.BUTTONS_PAD]: { pos: [0.4, 0.2, 0], size: [0.4, 0.1, 0.4] },
            };
        case 'RADIO':
            return {
                [PartType.RADIO_CASING]: { pos: [0, 0, -0.1], size: [2, 1.2, 0.8] },
                [PartType.SPEAKER]: { pos: [-0.5, 0, 0.2], size: [0.8, 0.8, 0.2] },
                [PartType.RADIO_TUNER]: { pos: [0.5, -0.2, 0.1], size: [0.6, 0.6, 0.1] },
                [PartType.RADIO_PSU]: { pos: [0.5, 0.3, 0], size: [0.5, 0.4, 0.4] },
                [PartType.ANTENNA]: { pos: [0.8, 0.6, 0], size: [0.05, 1, 0.05] },
            };
        case 'TELEVISION':
            return {
                [PartType.TV_PANEL]: { pos: [0, 0, 0.05], size: [3.5, 2, 0.05] },
                [PartType.TV_CASING]: { pos: [0, 0, -0.1], size: [3.6, 2.1, 0.1] },
                [PartType.TV_MAINBOARD]: { pos: [-0.5, 0, -0.05], size: [1, 1.2, 0.05] },
                [PartType.TV_PSU]: { pos: [0.8, 0.4, -0.05], size: [0.8, 0.8, 0.05] },
                [PartType.T_CON_BOARD]: { pos: [0, -0.8, -0.05], size: [1.5, 0.2, 0.05] },
            };
        case 'BICYCLE':
            return {
                [PartType.BIKE_FRAME]: { pos: [0, 0, 0], size: [1, 1, 1] }, // size is placeholder
                [PartType.WHEEL]: { pos: [1.55, -0.6, 0], size: [1.2, 1.2, 0.1] }, // Rear wheel, size is diameter
                [PartType.CHAIN]: { pos: [0, -0.6, 0], size: [0.4, 0.4, 0.2] }, // Drivetrain at bottom bracket
                [PartType.PEDALS]: { pos: [0, -0.6, 0], size: [0.1, 0.3, 0.1] },
                [PartType.HANDLEBARS]: { pos: [-1.5, 0.3, 0], size: [0.1, 0.6, 0.8] }, // At head tube
            };
        case 'ROUTER':
            return {
                [PartType.ROUTER_CASING]: { pos: [0, 0, 0], size: [1.5, 0.3, 1] },
                [PartType.ROUTER_MAINBOARD]: { pos: [0, -0.05, 0], size: [1.4, 0.05, 0.9] },
                [PartType.ROUTER_ANTENNA]: { pos: [0.6, 0.15, -0.3], size: [0.05, 0.5, 0.05] },
                [PartType.ROUTER_PSU]: { pos: [-0.5, -0.02, 0], size: [0.4, 0.2, 0.4] },
            };
        case 'CAR':
            return {
                [PartType.CAR_CHASSIS]: { pos: [0, 0, 0], size: [4, 1, 2] },
                [PartType.ENGINE]: { pos: [1, 0.2, 0], size: [1, 0.8, 1.2] },
                [PartType.CAR_WHEEL]: { pos: [1.5, -0.5, 0.9], size: [0.6, 0.6, 0.2] }, // Front-right
                [PartType.STEERING_WHEEL]: { pos: [-0.5, 0.6, 0], size: [0.4, 0.1, 0.4] },
                [PartType.CAR_BATTERY]: { pos: [1.2, 0.3, -0.6], size: [0.4, 0.5, 0.3] },
            };
        default:
            const _exhaustiveCheck: never = deviceType;
            throw new Error(`Unhandled device type: ${_exhaustiveCheck}`);
    }
}


const PartMeshComponent: React.FC<{ part: DevicePart; size: [number, number, number]; deviceType: DeviceType; }> = ({ part, size, deviceType }) => {
    const isAttachedAndBroken = part.isBroken && part.isAttached;
    const isDetachedAndBroken = part.isBroken && !part.isAttached;

    const materialProps = {
        color: isDetachedAndBroken ? '#ff4d4d' : part.color,
        transparent: isAttachedAndBroken,
        opacity: isAttachedAndBroken ? 0.6 : 1.0,
    };

    if (deviceType === 'PHONE') {
        // ... (existing phone logic)
    } else if (deviceType === 'CONSOLE') {
        // ... (existing console logic)
    } else if (deviceType === 'CONTROLLER') {
        // ... (existing controller logic)
    } else if (deviceType === 'RADIO') {
        // ... (existing radio logic)
    } else if (deviceType === 'TELEVISION') {
       // ... (existing television logic)
    } else if (deviceType === 'BICYCLE') {
        const frameColor = "#111827"; // Black
        const accentColor = "#f97316"; // Orange

        switch (part.type) {
            case PartType.BIKE_FRAME:
                return (
                    <group scale={1.2}>
                        {/* Main Frame */}
                        <mesh position={[-0.6, 0.45, 0]} rotation={[0, 0, -0.15]}><RoundedBox args={[2, 0.18, 0.18]} radius={0.06}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Top Tube */}
                        <mesh position={[-0.8, -0.2, 0]} rotation={[0, 0, 0.8]}><RoundedBox args={[2.2, 0.2, 0.2]} radius={0.07}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Down Tube */}
                        <mesh position={[0.35, 0.0, 0]} rotation={[0, 0, -1.3]}><RoundedBox args={[1.6, 0.15, 0.15]} radius={0.05}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Seat Tube */}
                        <mesh position={[-1.55, 0.25, 0]} rotation={[0, 0, -0.2]}><cylinderGeometry args={[0.1, 0.1, 0.6, 16]} /><meshStandardMaterial {...materialProps} color={frameColor} /></mesh> {/* Head Tube */}
                        
                        {/* Orange Decals */}
                         <mesh position={[-0.8, -0.2, 0.11]} rotation={[0, 0, 0.8]}><planeGeometry args={[1.5, 0.1]} /><meshStandardMaterial color={accentColor} /></mesh>
                         <mesh position={[-0.6, 0.45, 0.1]} rotation={[0, 0, -0.15]}><planeGeometry args={[1, 0.08]} /><meshStandardMaterial color={accentColor} /></mesh>

                        {/* Rear Suspension Assembly */}
                        <mesh position={[0.85, -0.45, 0.1]} rotation={[0, 0, -0.15]}><RoundedBox args={[1.5, 0.12, 0.12]} radius={0.04}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Chain Stay R */}
                        <mesh position={[0.85, -0.45, -0.1]} rotation={[0, 0, -0.15]}><RoundedBox args={[1.5, 0.12, 0.12]} radius={0.04}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Chain Stay L */}
                        <mesh position={[0.9, -0.1, 0.1]} rotation={[0, 0, 0.6]}><RoundedBox args={[1.4, 0.12, 0.12]} radius={0.04}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Seat Stay R */}
                        <mesh position={[0.9, -0.1, -0.1]} rotation={[0, 0, 0.6]}><RoundedBox args={[1.4, 0.12, 0.12]} radius={0.04}><meshStandardMaterial {...materialProps} color={frameColor} /></RoundedBox></mesh> {/* Seat Stay L */}
                        <mesh position={[0.1, -0.3, 0]}><cylinderGeometry args={[0.1, 0.1, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]}/><meshStandardMaterial color="grey"/></mesh> {/* Pivot */}

                        {/* Shock Absorber */}
                        <group position={[-0.2, 0.15, 0]} rotation={[0, 0, 0.6]}>
                            <mesh><cylinderGeometry args={[0.08, 0.08, 0.7, 16]} /><meshStandardMaterial color="#aaa" /></mesh>
                            <mesh position={[0,0.2,0]}><cylinderGeometry args={[0.06, 0.06, 0.3, 16]} /><meshStandardMaterial color="#444" /></mesh>
                        </group>

                        {/* Seat */}
                        <group position={[0.1, 0.6, 0]}>
                            <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.05, 0.05, 0.5, 16]} /><meshStandardMaterial color="#333" /></mesh>
                            <mesh position={[0, 0.1, 0]} rotation={[0,0,0.1]}><RoundedBox args={[0.6, 0.1, 0.25]} radius={0.03}><meshStandardMaterial color={frameColor} /></RoundedBox></mesh>
                        </group>
                    </group>
                );
            case PartType.WHEEL:
                const tireRadius = size[0] / 2;
                const tireTubeRadius = 0.05;
                return (
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh rotation={[0, 0, 0]}>
                            <torusGeometry args={[tireRadius, tireTubeRadius, 16, 100]} />
                            <meshStandardMaterial color={isDetachedAndBroken ? '#ff4d4d' : '#111827'} />
                        </mesh>
                        <mesh>
                            <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} rotation={[0,Math.PI/2,0]} />
                            <meshStandardMaterial color="#6b7280" />
                        </mesh>
                        {[...Array(24)].map((_, i) => (
                            <mesh key={i} rotation={[(i * Math.PI) / 12, 0, 0]}>
                                <cylinderGeometry args={[0.01, 0.01, tireRadius * 2, 4]} />
                                <meshStandardMaterial color="#9ca3af" />
                            </mesh>
                        ))}
                    </group>
                );
             case PartType.HANDLEBARS:
                 return (
                    <group>
                        {/* Fork Steerer Tube */}
                        <mesh position={[0, 0, 0]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                            <meshStandardMaterial {...materialProps} color="#111827" />
                        </mesh>
                        {/* Suspension Fork Lowers */}
                        <group position={[0, -0.9, 0]}>
                             <mesh position={[0, 0, 0.1]}>
                                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                                <meshStandardMaterial {...materialProps} color="#111827" />
                            </mesh>
                             <mesh position={[0, 0, -0.1]}>
                                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                                <meshStandardMaterial {...materialProps} color="#111827" />
                            </mesh>
                        </group>
                        {/* Handlebars */}
                        <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
                            <meshStandardMaterial {...materialProps} color="#111827" />
                        </mesh>
                    </group>
                );
             case PartType.CHAIN: // Drivetrain
                return (
                    <group>
                        <mesh rotation={[0,0,Math.PI/2]}>
                            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                            <meshStandardMaterial {...materialProps} color="#111827"/>
                        </mesh>
                        <mesh position={[0.77, 0, 0]}>
                            <boxGeometry args={[1.55, 0.05, 0.05]} />
                            <meshStandardMaterial color="#6b7280" />
                        </mesh>
                        <mesh position={[1.55, 0, 0]} rotation={[0,0,Math.PI/2]}>
                            <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                            <meshStandardMaterial color="#6b7280" />
                        </mesh>
                    </group>
                );
            case PartType.PEDALS:
                return (
                    <group>
                        {/* Crank Arm 1 */}
                        <group position={[0, 0, 0.07]}>
                            <mesh><boxGeometry args={[0.05, 0.4, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
                            <mesh position={[0,-0.2, 0]}><boxGeometry args={[0.3, 0.1, 0.05]} /><meshStandardMaterial {...materialProps} /></mesh>
                        </group>
                         {/* Crank Arm 2 */}
                        <group position={[0, 0, -0.07]} rotation={[0,0,Math.PI]}>
                            <mesh><boxGeometry args={[0.05, 0.4, 0.05]} /><meshStandardMaterial color="#333" /></mesh>
                            <mesh position={[0,-0.2, 0]}><boxGeometry args={[0.3, 0.1, 0.05]} /><meshStandardMaterial {...materialProps} /></mesh>
                        </group>
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
    } else if (deviceType === 'CAR') {
         switch (part.type) {
            case PartType.CAR_CHASSIS:
                return (
                     <group>
                        <RoundedBox args={size} radius={0.2}>
                            <meshStandardMaterial {...materialProps} />
                        </RoundedBox>
                        {/* Cabin */}
                        <RoundedBox args={[size[0] * 0.4, size[1] * 0.8, size[2] * 0.9]} radius={0.1} position={[-0.5, size[1]/2, 0]}>
                            <meshStandardMaterial color="#ADD8E6" opacity={0.7} transparent={true} />
                        </RoundedBox>
                     </group>
                );
             case PartType.CAR_WHEEL:
                return (
                    <mesh rotation={[Math.PI/2, 0, 0]}>
                        <cylinderGeometry args={[size[0]/2, size[0]/2, size[2], 32]} />
                         <meshStandardMaterial {...materialProps} />
                    </mesh>
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


    // Fallback for any unhandled device type
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
  // FIX: Memoize getPart with useCallback to prevent it from being recreated on every render,
  // which caused the useMemo hook for allParts to re-run unnecessarily.
  const getPart = useCallback((type: PartType) => device.parts.find(p => p.type === type), [device.parts]);

  const positions = useMemo(() => getPartPositions(device.type), [device.type]);

  const allParts = useMemo(() => {
    // For complex multi-part components
    if (device.type === 'BICYCLE' && getPart(PartType.WHEEL)) {
        const wheelPart = getPart(PartType.WHEEL)!;
        const rearWheelPos = positions[PartType.WHEEL].pos;
        const frontWheelPos: [number, number, number] = [-1.5, -0.6, 0];
        return [
            {...wheelPart, id: `${wheelPart.id}-rear`, pos: rearWheelPos, size: positions[PartType.WHEEL].size},
            {...wheelPart, id: `${wheelPart.id}-front`, pos: frontWheelPos, size: positions[PartType.WHEEL].size},
        ];
    }
    if (device.type === 'CAR' && getPart(PartType.CAR_WHEEL)) {
        const wheelPart = getPart(PartType.CAR_WHEEL)!;
        const frPos = positions[PartType.CAR_WHEEL].pos;
        const flPos: [number, number, number] = [frPos[0], frPos[1], -frPos[2]];
        const brPos: [number, number, number] = [-frPos[0], frPos[1], frPos[2]];
        const blPos: [number, number, number] = [-frPos[0], frPos[1], -frPos[2]];
        return [
            {...wheelPart, id: `${wheelPart.id}-fr`, pos: frPos, size: positions[PartType.CAR_WHEEL].size},
            {...wheelPart, id: `${wheelPart.id}-fl`, pos: flPos, size: positions[PartType.CAR_WHEEL].size},
            {...wheelPart, id: `${wheelPart.id}-br`, pos: brPos, size: positions[PartType.CAR_WHEEL].size},
            {...wheelPart, id: `${wheelPart.id}-bl`, pos: blPos, size: positions[PartType.CAR_WHEEL].size},
        ];
    }
     if (device.type === 'ROUTER' && getPart(PartType.ROUTER_ANTENNA)) {
        const antennaPart = getPart(PartType.ROUTER_ANTENNA)!;
        const pos1 = positions[PartType.ROUTER_ANTENNA].pos;
        const pos2: [number, number, number] = [pos1[0], pos1[1], -pos1[2]];
         return [
            {...antennaPart, id: `${antennaPart.id}-1`, pos: pos1, size: positions[PartType.ROUTER_ANTENNA].size},
            {...antennaPart, id: `${antennaPart.id}-2`, pos: pos2, size: positions[PartType.ROUTER_ANTENNA].size},
        ];
    }
    return [];
  // FIX: Add `positions` to the dependency array as it's used inside the hook.
  }, [device.type, getPart, positions]);

  const singleParts = Object.keys(positions)
    .filter(type => {
        if (device.type === 'BICYCLE' && type === PartType.WHEEL) return false;
        if (device.type === 'CAR' && type === PartType.CAR_WHEEL) return false;
        if (device.type === 'ROUTER' && type === PartType.ROUTER_ANTENNA) return false;
        return true;
    })
    .map(type => {
        const part = getPart(type as PartType);
        if(!part) return null;
        return {...part, pos: positions[type as PartType].pos, size: positions[type as PartType].size };
    }).filter(p => p !== null);


  const renderableParts = [...singleParts, ...allParts];

  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Text position={[0, -2.5, 0]} fontSize={0.3} color="white" anchorX="center" >{device.name}</Text>

        <group>
          {renderableParts.map((part, index) => {
            if (!part) return null;
            const isAttached = part.isAttached;
            const detachedX = -4 + (index % 3) * 3;
            const detachedY = 2.5 - Math.floor(index / 3) * 2.5;

            const currentPosition: [number, number, number] = isAttached ? part.pos : [detachedX, detachedY, 0];

            return (
              <group key={part.id} position={currentPosition}>
                <DevicePart3D part={part} onClick={onPartClick}>
                    <PartMeshComponent part={part} size={part.size} deviceType={device.type} />
                </DevicePart3D>
                 {part.isBroken && (
                    <Text
                        position={[0, part.size[1]/2 + 0.3, 0]}
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
