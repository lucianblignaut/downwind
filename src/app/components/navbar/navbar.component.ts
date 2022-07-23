import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isHandset = false
  sidenavOpened = false
  @Output() openSidenav = new EventEmitter<boolean>()
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe(['(max-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isHandset = true
      }
    })
    this.responsive.observe(['(min-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isHandset = false
      }
    })
  }

  openNav() {
    this.sidenavOpened = true
    this.openSidenav.emit(this.sidenavOpened)
  }

  closeNav() {
    this.sidenavOpened = false
    this.openSidenav.emit(this.sidenavOpened)
  }

}
