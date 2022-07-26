import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { MapRoutingModule } from "./map.routing.module";

const moduleComponents = [MapComponent]
const moduleImports = [MapRoutingModule]

@NgModule({
    declarations: [...moduleComponents],
    imports: [CommonModule, ...moduleImports],
    exports: [...moduleImports]
})
export class MapModule { }