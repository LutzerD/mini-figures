import { Component, HostListener } from '@angular/core';
import { ScrollEventsService } from './common/scroll-events.service';
import { WindowResizeService } from './common/window-resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //This could probably be turned into a directive that selects the <body>
  @HostListener('window:scroll', ['$event']) 
  onScroll() {
    this.scrollEventsService.scrolled();
  }
  
  //This could probably be turned into a directive that selects the <body>
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowResizeService.windowResized()
  }

  constructor(private scrollEventsService: ScrollEventsService, private windowResizeService: WindowResizeService) {}
}
