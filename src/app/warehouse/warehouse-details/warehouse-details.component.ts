import { Addwarehouse } from '../addwarehouse';
import { Datawarehouse } from '../warehouse.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'warehouse-details',
  templateUrl: './warehouse-details.component.html',

})
export class WarehouseDetailsComponent  {
 @Input() warehouse: Addwarehouse;
  selectedwarehouse: Addwarehouse;
  submitted = false;
  constructor(private dataService: Datawarehouse) { }

//  ngOnInit() {
//  }
  delete(): void {
    this.dataService.delete(this.warehouse.warehouseid).then(() => this.goBack());
  }
onSubmit(): void {
    this.submitted = true;
    // this.save();
    this.dataService.update(this.warehouse);
  }
  goBack(): void {
    window.location.replace('');
  }
}
