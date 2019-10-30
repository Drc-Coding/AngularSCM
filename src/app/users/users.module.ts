import { SharedModule } from '../shared/shared.module';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddusermodulesComponent } from './addusermodules/addusermodulescomponent';
import { AdduseraccessComponent } from './adduseraccess/adduseraccess.component';
import { userView } from './viewUser/viewUser.component';
import { userViewmodule } from './viewUserModules/viewUserModules.component';
import { userViewAccess } from './viewUserAccess/viewUserAccess.component';
import { CategoryPipe } from './viewUser/viewUser.component.pipe';
import { CategoryPipe1 } from './viewUserModules/viewUserModules.view.pipe';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    RouterModule.forChild(UsersRoutes),
    SharedModule
  ],
  declarations: [UsersComponent, AdduserComponent, AddusermodulesComponent, AdduseraccessComponent, userView, userViewmodule, userViewAccess, CategoryPipe, CategoryPipe1],
  providers: [UsersService]
})

export class UsersModule { }