import { NgModule } from "@angular/core";
import { MobileSearchbarComponent } from "../mobile-searchbar/mobile-searchbar.component";

const moduleComponents = [MobileSearchbarComponent]
const moduleImports = []

@NgModule({
    declarations: [...moduleComponents],
    imports: [...moduleImports],
    exports: [...moduleComponents, ...moduleImports]
})
export class MobileNavModule { }