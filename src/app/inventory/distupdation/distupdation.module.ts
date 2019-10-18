import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';





import {SharedModule} from '../../shared/shared.module';
import { distupdationRoutes } from './distupdation.routing';
import { distupdationSaveComponent } from './distupdationSave/distupdationSave.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(distupdationRoutes),
   SharedModule
  ],
  declarations: [distupdationSaveComponent]
})

export class distupdationModule {}
