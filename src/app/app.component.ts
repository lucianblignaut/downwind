import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }
  openNav = false
  isMobile = false

  openSidenav(value: boolean) {
    this.openNav = value
  }
  isHandset(value: boolean) {
    this.isMobile = value
  }
}
