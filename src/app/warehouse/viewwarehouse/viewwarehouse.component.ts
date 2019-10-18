import { Addwarehouse } from '../addwarehouse';
import { Datawarehouse } from '../warehouse.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewwarehouse',
  templateUrl: './viewwarehouse.component.html',

})
export class ViewwarehouseComponent implements OnInit {
warehouseview: Addwarehouse[];
  selectedWarehouse: Addwarehouse;
  constructor(private dataService: Datawarehouse) { }
 getwarehouse() {
     this.dataService.getwarehouse().then(warehouseview => this.warehouseview = warehouseview);
  }
  ngOnInit() {
    this.getwarehouse();
  }
   onSelect(cust: Addwarehouse): void {
    this.selectedWarehouse = cust;
  }

}
