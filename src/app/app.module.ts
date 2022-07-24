import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from './components/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MobileNavModule } from './components/mobile-nav/mobile-nav.module';

@NgModule({
  declarations: [
    AppComponent,
    MobileNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    MobileNavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
