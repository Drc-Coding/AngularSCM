
import { AddwarehProduct } from '../addwarehProduct';
import { Component, OnInit, Input } from '@angular/core';
import { DatawarehTransfer } from '../warehouseTransfer.service';
import { AddwarehTransfer } from '../addwarehTransfer';

@Component({
  selector: 'warehouse-detTransfer',
  templateUrl: './warehouse-detTransfer.component.html',
  
})
export class WarehouseDetTransferComponent  {
 @Input() warehousetrans: AddwarehTransfer;

  // for product view
warehouseproducts = new AddwarehProduct;
 productviews: any;
  selectedwarehtrans: AddwarehTransfer;
  submitted = false;
  constructor(private dataWarehouse: DatawarehTransfer) { }

onSubmit(): void {
    this.submitted = true;
    // this.save();
  //  this.dataService.update(this.warehouse);
  }
delete(): void {
    this.dataWarehouse.delete(this.warehousetrans.whstktrfid).then(() => this.goBack());
  }
  getviewproduct() {
this.dataWarehouse.getviewproduct().then(productviews => this.productviews = productviews);
}
 goBack(): void {
    window.location.replace('');
  }
}
