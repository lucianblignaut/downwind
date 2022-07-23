import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { NavbarComponent } from "./navbar.component";
import { LayoutModule } from '@angular/cdk/layout'

const moduleComponents = [NavbarComponent, SearchbarComponent]
const moduleImports = [CommonModule, RouterModule, MaterialModule, LayoutModule]

@NgModule({
    declarations: [...moduleComponents],
    imports: [...moduleImports],
    exports: [...moduleImports, ...moduleComponents]
})
export class NavbarModule { }