import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarModule } from './components/navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { MobileNavModule } from './components/mobile-nav/mobile-nav.module';
import { MapModule } from './components/map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'
import { MapStateFeatureModule } from './components/map/state/map.state';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './components/map/state/map.effects';

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
    MobileNavModule,
    MapModule,
    HttpClientModule,
    MapStateFeatureModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([MapEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
