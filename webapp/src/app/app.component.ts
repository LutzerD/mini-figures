import { Component, HostListener } from '@angular/core';
import { ScrollEventsService } from './scroll-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    this.scrollEventsService.scrolled(event);
  }

  constructor(private scrollEventsService: ScrollEventsService) {}

  title = 'webapp';
}
