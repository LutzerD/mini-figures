import { fromEvent } from 'rxjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WindowResizeService } from '../common/window-resize.service';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

//I wish I could start component names with a number, so this could all say 3DSpace
//I could make this a service so you don't have to pass in windowResizeService to the constructor, but then if something needs two Space3D's that's weird use of services
export class Space3D {
  private renderer = new THREE.WebGLRenderer({ antialias: true });
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  
  constructor(containerElement: HTMLElement, windowResizeService?: WindowResizeService) {  
    //Set up renderer and camera
    this.resetCamera();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    const containerBoundingRect = containerElement.getBoundingClientRect();
    this.renderer.setSize(containerBoundingRect.width, containerBoundingRect.height);
    
    
    //Allows for the camera to move in the 3d space with the mouse, when interactable=true
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    fromEvent(controls, 'change').subscribe(() => {
      if (!this.interactable) {
        return;
      }
      this.animate();
    });
    
    //Allows the Space3D to adjust when window is resized 
    windowResizeService?.windowResizeEvents.subscribe(()=>this.onWindowResize()) 
    
    containerElement.appendChild(this.domElement)
  }

  add(obj: THREE.Object3D) {
    this.scene.add(obj);
    this.animate()
  }

  //Allows for the camera to move in the 3d space with the mouse, when interactable=true
  private interactable = false;
  setInteractable(isInteractable:boolean) {
    this.interactable = isInteractable;
  }

  resetCamera() {
    this.camera.lookAt(this.scene.position);
    this.camera.position.z = 300;
  }

  get domElement(): HTMLElement {
    return this.renderer.domElement;
  }

  //Re-adjusts camera / renderer to screen size
  //If you want to recalculate size of contents / projection / etc. on window resize, this needs to be called
  onWindowResize() { 
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.animate()
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
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

        this.add(object);
      }
    );
  }
}
