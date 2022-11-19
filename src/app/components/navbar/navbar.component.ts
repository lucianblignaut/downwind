import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  //will determine whether the viewport is for a handset or not
  isHandset = false
  //will be used to set classes depending on whether the sidenav is opened or closed
  sidenavOpened = false
  //will emit true if sidenav should be opened and false if it should be closed
  @Output() openSidenav = new EventEmitter<boolean>()

  @Output() handset = new EventEmitter<boolean>()
  //will remove the header shadow if the sidenav is opened
  @Input() hideShadow: boolean = false
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    //listen for the viewport becoming smaller than 1194px
    this.responsive.observe(['(max-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isHandset = true
        this.handset.emit(true)
      }
    })
    //listen for the viewport becoming larger than 1194px
    this.responsive.observe(['(min-width: 1194px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isHandset = false
        this.handset.emit(false)
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
