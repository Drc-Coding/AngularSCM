import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SalesorderleadRoutes } from "app/salesorderlead/salesorderlead.routing";
import { SharedModule } from "app/shared/shared.module";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { TrackingComponent } from "./tracking/tracking.component";
import { StatusService } from "./trackstatus.service";
import {CategoryPipe} from "./tracking/tracking.pipe"

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SalesorderleadRoutes),
      SharedModule, 
    
    ],
    declarations: [TrackingComponent,CategoryPipe],
    providers: [NotificationsComponent,StatusService]
  })
  export class StatusModule{
      
}