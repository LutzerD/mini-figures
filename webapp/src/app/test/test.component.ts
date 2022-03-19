import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'dat.gui';
import { GeneStealerModel } from '../miniatures/miniatures';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass'],
})
export class TestComponent implements OnInit {
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    200
  );
  stats = Stats();

  init() {
    const { renderer, scene, camera, params } = this;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true;
    document.body.appendChild(renderer.domElement);

    camera.position.set(0,0,6);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => this.render()); // use only if there is no animation loop
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;

    const light = new THREE.HemisphereLight(0xffffff, 0x080808, 1.5);
    light.position.set(-1.25, 1, 1.25);
    scene.add(light);

    const clipPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
    ];

    // helpers
    const helpers = new THREE.Group();
    helpers.add(new THREE.PlaneHelper(clipPlanes[0], 2, 0xff0000));
    helpers.add(new THREE.PlaneHelper(clipPlanes[1], 2, 0x00ff00));
    helpers.add(new THREE.PlaneHelper(clipPlanes[2], 2, 0x0000ff));
    helpers.visible = params.showHelpers;
    scene.add(helpers);

    // gui
    const gui = new GUI();

    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(camera.position, 'x', -10, 10).listen();
    cameraFolder.add(camera.position, 'y', -10, 10).listen();
    cameraFolder.add(camera.position, 'z', -10, 10).listen();
    cameraFolder.open();

    gui
      .add(params, 'showHelpers')
      .name('show helpers')
      .onChange((value) => {
        helpers.visible = value;
        this.render();
      });

    //

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      this.render();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
    this.stats.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
  
  params = {
    clipIntersection: true,
    planeConstant: 0,
    showHelpers: true,
  };


  constructor() {
    this.init();
    this.render();

    document.body.appendChild(this.stats.dom);

    this.animate();

    const geneStealer = GeneStealerModel();
    geneStealer.onLoad.subscribe(() => {
      this.scene.add(geneStealer.model)
      this.animate();
    });
  }

  ngOnInit(): void {}
}
