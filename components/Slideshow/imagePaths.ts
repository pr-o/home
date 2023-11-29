const IMAGES_DIR = '/images/scratchCards';

export const imagePaths = [
  '1-1.jpg',
  '2-1.jpg',
  '3-1.jpg',
  '4-1.jpg',
  '5-1.jpg',
  '6-1.jpg',
  '7-1.jpg',
  '8-1.jpg',
  '9-1.jpg',
].map((path) => `${IMAGES_DIR}/${path}`);

export const hoverImagePaths = [
  '1-2.jpg',
  '2-2.jpg',
  '3-2.jpg',
  '4-2.jpg',
  '5-2.jpg',
  '6-2.jpg',
  '7-2.jpg',
  '8-2.jpg',
  '9-2.jpg',
].map((path) => `${IMAGES_DIR}/${path}`);

export const fragmentShaderNames = [
  'trippyShader',
  'gooeyShader',

  'shapeShader',
  'waveShader',

  'revealShader',
  'trippyShader',
  'waveShader',
  'gooeyShader',
  'revealShader',
];

export const shapeImagePaths = [
  null,
  null,
  'sung-cursive.jpeg',
  null,
  null,
  null,
  null,
  null,
  null,
].map((path) => (path ? `${IMAGES_DIR}/${path}` : null));
