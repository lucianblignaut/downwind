import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';

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
  constructor(private breakpoint: BreakpointService) { }

  ngOnInit(): void {
    //listen for the viewport becoming smaller than 1194px
    this.breakpoint.handset$.subscribe((result: boolean) => {
      this.isHandset = result
      this.handset.emit(result)
    })
  }

  openNav() {
    this.sidenavOpened = true
    this.openSidenav.emit(true)
  }

  closeNav() {
    this.sidenavOpened = false
    this.openSidenav.emit(false)
  }

}
