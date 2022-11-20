import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public handset$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private observer: BreakpointObserver) { this.startObserve() }

  startObserve(): void {
    //listen for the viewport becoming smaller than 1194px
    this.observer.observe(['(max-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.handset$.next(true)
      }
    })
    //listen for the viewport becoming larger than 1194px
    this.observer.observe(['(min-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.handset$.next(false)
      }
    })
  }

}
