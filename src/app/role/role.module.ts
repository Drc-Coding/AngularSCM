import { SharedModule } from '../shared/shared.module';
import { RoleService } from './role.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleRoutes } from './role.routing';
import { RoleComponent } from './role.component';
import { AddroleComponent } from './addrole/addrole.component';
import { ViewroleComponent } from './viewrole/viewrole.component';
import { RoledetailsComponent } from './roledetails/roledetails.component';
import { CategoryPipe } from './viewrole/viewrole.pipe';
import { viewAssignComponent } from './viewAssignRole/viewAssignRole.component';
import { roleAssignPipe } from './viewAssignRole/viewassignModule.pipe'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RoleRoutes),
    SharedModule,
  ],
  declarations: [RoleComponent, AddroleComponent, ViewroleComponent, RoledetailsComponent, CategoryPipe, viewAssignComponent, roleAssignPipe],
  providers: [RoleService]
})

export class RoleModule { }