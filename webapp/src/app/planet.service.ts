import { HostListener, Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { SceneService } from './scene.service';
import { tap } from 'rxjs/operators';
import { AnimationFrameService } from './animation-frame.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Injectable({
  providedIn: 'root',
})
export class PlanetService {
  addPlanet() {
    const texture = new THREE.TextureLoader().load('assets/crate.gif');

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  scrollAboutY(angleRadians: number) {
    const camera = this.camera;
    const pi = Math.PI;
    angleRadians += pi / 2;

    var x = camera.position.x,
      y = camera.position.y,
      z = camera.position.z;

    const radius = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
    camera.position.x = radius * Math.cos(angleRadians);
    camera.position.z = radius * Math.sin(angleRadians);
    camera.lookAt(this.scene.position);
    console.log(camera.position, radius);
  }

  add(obj: any) {
    this.scene.add(obj);
  }

  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  constructor(private animationFrameService: AnimationFrameService) {
    const { camera, renderer, scene } = this;
    camera.position.z = 80;
    camera.position.x = 80;
    camera.position.y = 80;
    console.log(camera.position);
    // const look = new THREE.Vector3(0, 80, 80);
    // camera.lookAt(look);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const e = document
      .querySelector('.view-container')
      ?.appendChild(renderer.domElement) as any;
    e.className += 'model-scene';

    // const controls = new OrbitControls(this.camera, renderer.domElement);
    // fromEvent(controls, 'change').subscribe(() => this.animate()); // use only if there is no animation loop

    animationFrameService
      .every()
      .pipe(tap((x: any) => this.preAnimationFuncs.forEach((func) => func())))
      .subscribe(() => this.animate());
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private preAnimationFuncs: Array<() => void> = [];

  beforeAnimation(func: () => void) {
    this.preAnimationFuncs.push(func); //TODO: this will be leaky... need to account for when someone wants to unsubscribe.
  }

  private animate() {
    this.renderer.render(this.scene, this.camera);
    // console.log(this.camera.position);
  }
}
