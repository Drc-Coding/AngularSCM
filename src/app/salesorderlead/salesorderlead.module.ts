import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { SalesorderleadRoutes } from "./salesorderlead.routing";
import { SalesorderleadComponent } from "./salesorderlead.component";
import { CategoryPipe } from "./salesorderlead.pipe";
import { SoleadrecordComponent } from './soleadrecord/soleadrecord.component';
import { ConvertsalesComponent } from './convertsales/convertsales.component';
import { SalesorderleadService } from "./salesorderlead.service";
import { NotificationsComponent } from "../notifications/notifications.component";
import { RecordCategoryPipe } from "./soleadrecord/soleadrecord.pipe";



@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(SalesorderleadRoutes),
      SharedModule,   
    ],
    declarations: [SalesorderleadComponent,CategoryPipe, SoleadrecordComponent, ConvertsalesComponent,RecordCategoryPipe],
    providers: [SalesorderleadService, NotificationsComponent]
  })

  export class SalesorderleadModule{
      
  }