import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MobileSearchbarComponent } from "../mobile-searchbar/mobile-searchbar.component";
import { MobileNavComponent } from "./mobile-nav.component";

const moduleComponents = [MobileSearchbarComponent, MobileNavComponent]
const moduleImports = [RouterModule, CommonModule]

@NgModule({
    declarations: [...moduleComponents],
    imports: [...moduleImports],
    exports: [...moduleComponents, ...moduleImports]
})
export class MobileNavModule { }