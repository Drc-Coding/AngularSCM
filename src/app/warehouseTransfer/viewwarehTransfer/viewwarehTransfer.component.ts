
import { Component, OnInit } from '@angular/core';
import { AddwarehTransfer } from '../addwarehTransfer';
import { DatawarehTransfer } from '../warehouseTransfer.service';

@Component({
  selector: 'app-viewwarehTransfer',
  templateUrl: './viewwarehTransfer.component.html',
})
export class ViewwarehTransferComponent implements OnInit {
warehouseview: AddwarehTransfer[];
selectedwarehtrans: AddwarehTransfer;
  constructor(private dataService: DatawarehTransfer) { }

  ngOnInit() {

  }
   onSelect(cust: AddwarehTransfer): void {
    this.selectedwarehtrans = cust;
  }

}
