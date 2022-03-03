import { Component } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { PlanetService } from '../planet.service';
import { ScrollEventsService } from '../scroll-events.service';

@Component({
  selector: 'app-model-display',
  templateUrl: './model-display.component.html',
  styleUrls: ['./model-display.component.sass'],
})
export class ModelDisplayComponent {
  constructor(
    private planetService: PlanetService,
    private scrollService: ScrollEventsService
  ) {
    this.loadGeneStealer();
    this.scrollService.scrollEvents.subscribe((heightPercent) =>
      this.scrolled(heightPercent)
    );

    this.planetService.beforeAnimation(() => {
      const scrollTop = window.scrollY;
      var screenHeight = screen.height;

      const screenHeights = scrollTop / screenHeight;
      const intialOffset = 0;
      const span = 1.5;
      if (screenHeights > intialOffset && screenHeights < span + intialOffset) {
        const percent = (screenHeights - intialOffset) / span;
        this.planetService.scrollAboutY(percent * 2 * Math.PI);
      } else {
        this.planetService.scrollAboutY(0);
      }
    });
  }

  scrolled(screenHeights: number) {
    if (screenHeights > 0.5 && screenHeights < 1.5) {
      const percent = (screenHeights - 1) / 1;
      this.planetService.scrollAboutY(percent * 2 * Math.PI);
    }
  }
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
