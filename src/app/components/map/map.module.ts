import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";
import { MapComponent } from "./map.component";
import { MapRoutingModule } from "./map.routing.module";
import { MapStateFeatureModule } from "./state/map.state";

const moduleComponents = [MapComponent]
const moduleImports = [MapRoutingModule, GoogleMapsModule, MapStateFeatureModule]

@NgModule({
    declarations: [...moduleComponents],
    imports: [CommonModule, ...moduleImports],
    exports: [...moduleImports]
})
export class MapModule { }