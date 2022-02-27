import { Component } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.sass'],
})
export class ModelDisplayComponent {
  constructor(private planetService: PlanetService) {
    this.loadGeneStealer();
  }

  i = 0;
  j = 0;
  k = 0;
  loadGeneStealer() {
    const loader = new OBJLoader();

    loader.load(
      // resource URL
      'assets/textures/genestealer-mesh.obj',
      // called when resource is loaded
      (object) => {
        console.log(object.position);
        let i = 0;
        const colors = ['red', 'blue', 'green', 'white', 'orange', 'pink'];

        object.scale.set(10, 10, 10);
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = new THREE.MeshBasicMaterial({
              color: colors[i++],
            });

            child.material = material;
            child.scale.set(10, 10, 10);
          }
        });

        this.planetService.add(object);

        // this.planetService.beforeAnimation(() => {
        //   object.traverse((child) => {
        //     if (child instanceof THREE.Mesh) {
        //       child.rotation.x += 0.005; //Math.floor(Math.random() * 50) / 1000;
        //       child.rotation.y += 0.01; //Math.floor(Math.random() * 10) / 100;
        //     }
        //   });
        // });
      }
    );
  }

  loadBox() {
    const texture = new THREE.TextureLoader().load('assets/crate.gif');
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const mesh = new THREE.Mesh(geometry, material);
    this.planetService.add(mesh);
    mesh.translateZ(Math.floor(Math.random() * 100));
    console.log(mesh.position);
    this.planetService.beforeAnimation(() => {
      console.log();
      mesh.rotation.x += 0.005; //Math.floor(Math.random() * 50) / 1000;
      mesh.rotation.y += 0.01; //Math.floor(Math.random() * 10) / 100;
    });
  }
}
