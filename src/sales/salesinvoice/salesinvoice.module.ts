import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { ImageViewerModule } from "ngx-image-viewer";


import {SharedModule} from '../../shared/shared.module';
import { salesinvoiceRoutes } from './salesinvoice.routing';

import { slsInvSaveComponent } from './slsInvSave/slsInvSave.component'  ;

import { slsInvEditComponent } from './slsInvEdit/slsInvEdit.component'  ;

import { slsInvViewComponent } from './slsInvView/slsInvView.component'  ;

    import { CategoryPipe } from   './slsInvView/slsInvView.pipe'; 

import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';
@NgModule({
  imports: [
    CommonModule, DxDataGridModule,

    ImageViewerModule.forRoot({
      btnClass: 'default', // The CSS class(es) that will apply to the buttons
      zoomFactor: 0.1, // The amount that the scale will be increased by
      containerBackgroundColor: 'transparent', // The color to use for the background. This can provided in hex, or rgb(a).
      wheelZoom: false , // If true, the mouse wheel can be used to zoom in
      allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
      allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
      btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
        zoomIn: 'fa fa-plus',
        zoomOut: 'fa fa-minus',
        rotateClockwise: 'fa fa-repeat',
        rotateCounterClockwise: 'fa fa-undo',
        next: 'fa fa-arrow-right',
        prev: 'fa fa-arrow-left',
        fullscreen: 'fa fa-arrows-alt',
      },
      btnShow: {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: true,
        rotateCounterClockwise: true,
        next: true,
        prev: true
      }
    }) ,

    

    DxSparklineModule,
    DxTemplateModule,  
    RouterModule.forChild(salesinvoiceRoutes),
   SharedModule
  ],
  declarations: [slsInvSaveComponent, slsInvEditComponent, slsInvViewComponent,CategoryPipe]
})

export class   salesinvoiceModule {}
