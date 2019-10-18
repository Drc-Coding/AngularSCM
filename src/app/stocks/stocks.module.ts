import { SharedModule } from '../shared/shared.module';
import { warehousestockRoutes } from './stocks.routing';
import { DataStocks } from './stocks.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateStocksComponent } from './create-stocks/create-stocks.component';
import { editStockComponent } from './edit-stocks/edit-stocks.component';
import { ViewstocksComponent } from './viewstocks/viewstocks.component';
import { CategoryPipe } from './viewstocks/viewstocks.component.pipe'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(warehousestockRoutes),
    SharedModule
  ],
  declarations: [CreateStocksComponent, editStockComponent, ViewstocksComponent, CategoryPipe],
  providers: [DataStocks]
})
export class StocksModule { }
