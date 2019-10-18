import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {empRoutes} from './emp.routing';
import {empComponent} from './emp.component';
import {addEmployeeComponent} from './addEmployee/addEmployee.component';
import {editEmployeeComponent} from'./editEmployee/editEmployee.component';
import {viewEmployeeComponent} from'./viewEmployee/viewEmployee.component';
import {CategoryPipe}from '../employeeinfo/viewEmployee/employee-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(empRoutes),
    SharedModule
  ],
  declarations: [empComponent,addEmployeeComponent,viewEmployeeComponent,editEmployeeComponent,CategoryPipe]
})

export class empModule {}
