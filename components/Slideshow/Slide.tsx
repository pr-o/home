'use client';

import { gsap } from 'gsap';
import {
  Clock,
  Scene,
  TextureLoader,
  Texture,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  MeshPhongMaterial,
  Vector2,
} from 'three';
import Scrollbar from 'smooth-scrollbar';
import { getRatio } from '@/lib/three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export interface OnClickTileDetail {
  target: Slide | null;
  open: boolean;
}

export default class Slide {
  scene: Scene;
  anchorElement: HTMLAnchorElement;
  mainImage: HTMLImageElement;
  detailsElement: HTMLDivElement;
  images: Array<Texture> = [];
  sizes: any;
  offset: any;
  vertexShader: string;
  fragmentShader: string;
  clock: any;
  mouse: any;
  delta = 0;
  hasClicked = false;
  selected = false;
  isZoomed: any = false;
  loader: any;
  mesh: any;
  uniforms: any;
  scroll = 0;
  scrollbar: any;
  prevScroll = 0;
  isHovering = false;
  detailView = false;
  font: any;
  titleMesh: any;
  subtitleMesh: any;

  constructor(
    $el: any,
    scene: any,
    imagePaths: Array<string | null>,
    fragmentShader: string,
    vertexShader: string
  ) {
    this.scene = scene;
    this.anchorElement = $el.querySelector('a');
    this.mainImage = $el.querySelector('img');
    this.detailsElement = $el.querySelector('#details');

    this.loader = new TextureLoader();
    this.sizes = new Vector2(0, 0);
    this.offset = new Vector2(0, 0);

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    this.clock = new Clock();
    this.mouse = new Vector2(0, 0);

    this.bindEvent();

    this.preload(imagePaths, () => {
      this.init();
    });
  }

  bindEvent() {
    window.addEventListener('mousemove', (e) => {
      this.onMouseMove(e);
    });
    window.addEventListener('resize', () => {
      this.onResize();
    });

    this.anchorElement.addEventListener('mouseenter', () => {
      this.onMouseEnter();
    });
    this.anchorElement.addEventListener('mouseleave', () => {
      this.onMouseLeave();
    });

    this.scrollbar = Scrollbar.get(document.querySelector('#scrollarea') as HTMLElement);

    this.scrollbar.addListener((scroll: any) => {
      this.onScroll(scroll);
    });
  }

  onMouseEnter() {
    if (!this.mesh) return;

    gsap.to(this.uniforms.u_progressHover, {
      value: 1,
      duration: 1,
      ease: 'power2.inout',
      onUpdate: () => {
        this.isHovering = true;
      },
    });
  }

  onMouseLeave() {
    if (!this.mesh) return;

    gsap.to(this.uniforms.u_progressHover, {
      value: 0,
      duration: 1,
      ease: 'power2.inout',
      onComplete: () => {
        this.isHovering = false;
      },
    });
  }

  onMouseMove = (event: MouseEvent) => {
    gsap.to(this.mouse, {
      duration: 0.5,
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  getBounds() {
    const { width, height, left, top } = this.mainImage.getBoundingClientRect();

    if (!this.sizes.equals(new Vector2(width, height))) {
      this.sizes.set(width, height);
    }

    if (
      !this.offset.equals(
        new Vector2(
          left - window.innerWidth / 2 + width / 2,
          -top + window.innerHeight / 2 - height / 2
        )
      )
    ) {
      this.offset.set(
        left - window.innerWidth / 2 + width / 2,
        -top + window.innerHeight / 2 - height / 2
      );
    }
  }

  onScroll({ offset, limit }: any) {
    if (this.hasClicked) return;
    this.scroll = offset.x / limit.x;
  }

  preload(imagePaths: Array<string | null>, allImagesLoadedCallback: any) {
    let loadedCounter = 0;
    const toBeLoadedNumber = imagePaths.length;
    const preloadImage = (imagePath: any, anImageLoadedCallback: any) => {
      const texture = this.loader.load(imagePath, anImageLoadedCallback);
      texture.center.set(0.5, 0.5);
      this.images.push(texture);
    };

    imagePaths.forEach((path: any, i: number) => {
      preloadImage(path, () => {
        loadedCounter += 1;
        if (loadedCounter === toBeLoadedNumber) {
          allImagesLoadedCallback();
        }
      });
    });
  }

  init() {
    const [texture, hoverTexture, shape] = this.images;

    this.getBounds();

    this.uniforms = {
      u_alpha: { value: 1 },
      u_map: { type: 't', value: texture },
      u_ratio: { value: getRatio(this.sizes, texture.image) },
      u_hovermap: { type: 't', value: hoverTexture },
      u_hoverratio: { value: getRatio(this.sizes, hoverTexture.image) },
      u_shape: { value: shape },
      u_mouse: { value: this.mouse },
      u_progressHover: { value: 0.0 },
      u_progressClick: { value: 0.0 },
      u_time: { value: this.clock.getElapsedTime() },
      u_res: { value: new Vector2(window.innerWidth, window.innerHeight) },
    };

    const geometry = new PlaneGeometry(1, 1);

    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      transparent: true,
      defines: {
        PI: Math.PI,
        PR: window.devicePixelRatio.toFixed(1),
      },
    });

    this.mesh = new Mesh(geometry, material);

    this.mesh.position.x = this.offset.x;
    this.mesh.position.y = this.offset.y;

    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);

    this.scene.add(this.mesh);
  }

  onResize() {
    this.getBounds();

    if (!this.mesh) return;

    this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
    this.uniforms.u_res.value.set(window.innerWidth, window.innerHeight);
  }

  move() {
    if (!this.mesh || this.isZoomed || this.hasClicked) return;

    this.getBounds();

    gsap.set(this.mesh.position, {
      x: this.offset.x,
      y: this.offset.y,
    });

    gsap.to(this.mesh.scale, {
      x: this.sizes.x - this.delta,
      y: this.sizes.y - this.delta,
      z: 3,
      duration: 1,
    });
  }

  update() {
    this.delta = Math.abs((this.scroll - this.prevScroll) * 2000);

    if (!this.mesh) return;

    this.move();

    this.prevScroll = this.scroll;

    if (!this.isHovering) return;
    this.uniforms.u_time.value += this.clock.getDelta();
  }
}
