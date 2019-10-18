import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { saveDistProdComponent } from './saveDistProd/saveDistProd.component';
import { editDistProdComponent } from './editDistProd/editDistProd.component';
import { viewDistProdComponent } from './viewDistProd/viewDistProd.component';

import { viewDistWiseProdComponent } from './viewDistWiseProd/viewDistWiseProd.component';

import {SharedModule} from '../../shared/shared.module';
import { distprodRoutes } from './distprod.routing';

   import { CategoryPipe } from   './viewDistProd/viewDistProd.pipe'; 


import { DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule } from 'devextreme-angular';

import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
      DxDataGridModule,
    DxTemplateModule,
    DxSparklineModule,

    RouterModule.forChild(distprodRoutes),
   SharedModule
  ],
  declarations: [  saveDistProdComponent ,editDistProdComponent,viewDistProdComponent   ,viewDistWiseProdComponent ]
})

export class distprodModule {}
