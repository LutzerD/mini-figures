import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimationFrameService {
  animationFrameSubject = new Subject<void>();
  every() {
    return this.animationFrameSubject.asObservable();
  }

  constructor() {
    const animate = () => {
      requestAnimationFrame(() => {
        this.animationFrameSubject.next();
        animate();
      });
    };
    animate();
  }
}
