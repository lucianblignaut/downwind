import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSidenavModule } from '@angular/material/sidenav'

const modules = [MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule]

@NgModule({
    imports: [...modules],
    exports: [...modules]
})
export class MaterialModule { }