import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";
import { MapComponent } from "./map.component";
import { MapRoutingModule } from "./map.routing.module";

const moduleComponents = [MapComponent]
const moduleImports = [MapRoutingModule, GoogleMapsModule]

@NgModule({
    declarations: [...moduleComponents],
    imports: [CommonModule, ...moduleImports],
    exports: [...moduleImports]
})
export class MapModule { }