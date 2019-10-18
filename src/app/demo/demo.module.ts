
import { SharedModule } from '../shared/shared.module';
import { DemoComponent } from './demo.component';
import { DemoRoutes } from './demo.routing';
import { Service } from './demo.service';
import { DemosampleComponent } from './demosample/demosample.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forChild(DemoRoutes),
    SharedModule
    
  ],
  declarations: [DemoComponent, DemosampleComponent],
  providers: [Service]
})
export class DemoModule { }
platformBrowserDynamic().bootstrapModule(DemoModule);