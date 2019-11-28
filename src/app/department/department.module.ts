import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { DepartmentComponent } from "./department.component";
import { SavedeptComponent } from "./savedept/savedept.component";
import { ViewdeptComponent } from "./viewdept/viewdept.component";
import { DepartmentRouting } from "./department.routing";
import { DepartmentService } from "./department.service";

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DepartmentRouting),
      SharedModule, 
    
    ],
    declarations: [DepartmentComponent,SavedeptComponent,ViewdeptComponent],
    providers: [NotificationsComponent,DepartmentService]
    
  })
  export class DepartmentModule{
      
}