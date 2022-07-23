import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openNav = false
  openSidenav(value: boolean) {
    this.openNav = value
  }
}
