import { SharedModule } from '../shared/shared.module';
import { AdddamagestockComponent } from './adddamagestock/adddamagestock.component';
import { DamagestockComponent } from './damagestock.component';
import { DamagestockRoutes } from './damagestock.routing';
import { DamagestockService } from './damagestock.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {viewDamageComponent} from './viewdamagestock/viewdamagestock.component';
import {EditdamagestockComponent} from './editdamagestock/editdamagestock.component';
import { RouterModule } from '@angular/router';
import { CategoryPipe } from './viewdamagestock/viewdamagestock.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewdamagestockhqComponent } from './viewdamagestockhq/viewdamagestockhq.component';
import { ViewhqComponent } from './viewhq/viewhq.component';



@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(DamagestockRoutes),
      SharedModule,
      NgxPaginationModule      
    ],
    declarations: [DamagestockComponent, AdddamagestockComponent,viewDamageComponent,EditdamagestockComponent,CategoryPipe, ViewdamagestockhqComponent, ViewhqComponent],
    providers: [DamagestockService]
  })
  
  export class DamagestockModule { }