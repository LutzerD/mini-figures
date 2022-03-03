import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollEventsService {
  scrolled(event: MouseEvent) {
    const scrollTop = window.scrollY;
    var screenHeight = screen.height;

    const screenHeights = scrollTop / screenHeight;

    this.scrollSubject.next(screenHeights);
  }

  private scrollSubject = new Subject<number>();
  scrollEvents = this.scrollSubject.asObservable();
}
