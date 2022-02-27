import { HostListener, Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  public clipPlanes = [
    new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
  ];

  public params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: false,
  };

  add(obj: any) {
    // this.contentGroup.add(obj);
    this.scene.add(obj);
    this.render();
  }

  contentGroup = new THREE.Group();

  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    200
  );
  private renderer = new THREE.WebGLRenderer({ antialias: true });

  constructor() {
    this.init();
    this.render();
  }

  init() {
    const renderer = this.renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    this.camera.position.set(-1.5, 2.5, 3.0);

    const controls = new OrbitControls(this.camera, renderer.domElement);
    fromEvent(controls, 'change').subscribe(() => this.render()); // use only if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x080808, 1.5);
    light.position.set(-1.25, 1, 1.25);
    this.scene.add(light);

    // helpers
    const helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(this.clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(this.clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(this.clipPlanes[2], 2, 0x0000ff));
    helpers.visible = false;
    this.scene.add(helpers);
    this.scene.add(this.contentGroup);

    // gui
    const gui = new GUI();

    gui
      .add(this.params, 'clipIntersection')
      .name('clip intersection')
      .onChange((value: any) => {
        const children = this.contentGroup.children;

        for (let i = 0; i < children.length; i++) {
          (children[i] as any).material.clipIntersection = value;
        }

        this.render();
      });

    gui
      .add(this.params, 'planeConstant', -1, 1)
      .step(0.01)
      .name('plane constant')
      .onChange((value: any) => {
        for (let j = 0; j < this.clipPlanes.length; j++) {
          this.clipPlanes[j].constant = value;
        }
        this.render();
      });

    gui
      .add(this.params, 'showHelpers')
      .name('show helpers')
      .onChange((value: any) => {
        helpers.visible = value;

        this.render();
      });

    //
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
