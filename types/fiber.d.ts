import { ReactThreeFiber } from 'react-three-fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      simulationMaterial: ReactThreeFiber.Object3DNode<
        SimulationMaterial,
        typeof SimulationMaterial
      >;
    }
  }
}
