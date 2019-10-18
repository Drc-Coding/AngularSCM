import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {BranchRoutes} from './branchInfoModule.routing';
import {BranchComponent} from './branchInfoModule.component';
import {AddbranchComponent} from './addBranch/addBranch.component';
import {viewbranchComponent} from './viewBranch/viewBranch.view.component';  
import {brancheditComponent} from './editBranch/editBranch.component';
import {CategoryPipe} from '../branchInfo/viewBranch/branch-list.pipe';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BranchRoutes),
    SharedModule, 
  ],
  declarations: [BranchComponent,AddbranchComponent,viewbranchComponent,brancheditComponent,CategoryPipe]
})

export class BranchModule {}