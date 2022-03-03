import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  private windowResizeSubject = new Subject<void>();
  windowResizeEvents = this.windowResizeSubject.asObservable();
  
  windowResized() {
    this.windowResizeSubject.next();
  }
}
