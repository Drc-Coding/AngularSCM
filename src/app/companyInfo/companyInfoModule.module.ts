import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CompanyRoutes} from './companyInfoModule.routing';
import {CompanyComponent} from './companyInfoModule.component';
import {AddcompanyComponent} from './addCompany/addCompany.component';
import {viewcompanyComponent} from './viewCompany/viewCompany.view.component';  
import {companyeditComponent} from './editCompany/editCompany.component';
import { CategoryPipe } from './viewCompany/viewCompany.view.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    SharedModule, 
  ],
  declarations: [CompanyComponent,AddcompanyComponent,viewcompanyComponent,companyeditComponent,CategoryPipe]
})

export class CompanyModule {}