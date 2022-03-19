import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { GUI } from 'dat.gui';
import { WindowResizeService } from 'src/app/common/window-resize.service';
import { GeneStealerModel } from '../miniatures';
import { Space3D } from '../space3D';

@Component({
  selector: 'app-miniature-display',
  templateUrl: './miniature-display.component.html',
  styleUrls: ['./miniature-display.component.scss'],
})
export class MiniatureDisplayComponent implements AfterViewInit {
  private _interactable: boolean = false;
  @Input()
  public get interactable(): boolean {
    return this._interactable;
  }
  public set interactable(value: boolean) {
    this._interactable = value;
    this.miniatureSpace?.setInteractable(value);
  }

  constructor(private windowResizeService: WindowResizeService) {}

  miniatureSpace!: Space3D;
  @ViewChild('container') miniatureContainer!: ElementRef;
  ngAfterViewInit(): void {
    this.miniatureSpace = new Space3D(
      this.miniatureContainer.nativeElement,
      this.windowResizeService
    );

    this.miniatureSpace.setInteractable(this.interactable);
    const geneStealer = GeneStealerModel();
    geneStealer.onLoad.subscribe(() => {
      geneStealer.addTo(this.miniatureSpace);
      this.miniatureSpace.animate();
    });
  }

  addGuiFolder() {
    const params = {
      clipIntersection: true,
      planeConstant: 0,
      showHelpers: false,
    };

    const gui = new GUI();

    gui
      .add(params, 'clipIntersection')
      .name('clip intersection')
      .onChange((value) => {
        this.miniatureSpace.animate();
      });

    gui
      .add(params, 'planeConstant', -1, 1)
      .step(0.01)
      .name('plane constant')
      .onChange((value) => {
        this.miniatureSpace.animate();
      });

    gui
      .add(params, 'showHelpers')
      .name('show helpers')
      .onChange((value) => {
        this.miniatureSpace.animate();
      });
  }
}
