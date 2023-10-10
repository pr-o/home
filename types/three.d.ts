export declare type ImageMaterialType = JSX.IntrinsicElements['shaderMaterial'] & {
  scale?: number[];
  imageBounds?: number[];
  color?: Color;
  map: THREE.Texture;
  zoom?: number;
  grayscale?: number;
};
