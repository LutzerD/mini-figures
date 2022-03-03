import { Observable } from 'rxjs';
import * as THREE from 'three';
import { Scene } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Space3D } from './space3D';

//Ideally the options / files would be from a server, but this is just a MVP so meh
class Miniature {
  addTo(space3D: Space3D): boolean {
    if (!this.model) return false;
    space3D.add(this.model);
    return true;
  }

  colorAndScale() {
    let i = 0;
    const colors = ['red', 'blue', 'green', 'white', 'orange', 'pink'];
    const model = this.model;

    model.scale.set(this.scale.x,this.scale.y,this.scale.z);
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = new THREE.MeshBasicMaterial({
          color: colors[i++],
        });

        child.material = material;
        child.scale.set(this.scale.x,this.scale.y,this.scale.z);
      }
    });
  }

  onLoad: Observable<null>;

  private model!: THREE.Group;
  constructor(
    objUrl: string,
    private scale: THREE.Vector3,
  ) // cameraPosition: THREE.Vector3,
  {
    this.onLoad = new Observable((subscriber) => {
      const loader = new OBJLoader();
      loader.load(objUrl, (object: THREE.Group) => {
        //Could add errors incase it didn't load
        this.model = object;
        this.colorAndScale();
        subscriber.next();
      });
    });
  }
}

//Exported as a function so it can be loaded on demand
export const GeneStealerModel = () =>
  new Miniature(
    'assets/textures/genestealer-mesh.obj',
    new THREE.Vector3(10, 10, 10)
  );
