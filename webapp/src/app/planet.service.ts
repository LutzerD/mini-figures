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
    camera.position.z = 400;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(this.camera, renderer.domElement);
    fromEvent(controls, 'change').subscribe(() => this.animate()); // use only if there is no animation loop

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
  }
}
