import { Component, OnInit } from '@angular/core';
import { BarcodeService } from '../barcode.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-viewBarcode',
  templateUrl: './barcodelist.component.html'
})
export class ViewListBarcode implements OnInit {
  product: any;
  country: any;
  states: any;
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private barcodeService: BarcodeService, private router: Router) {
  }
  getBarcode() {
    if (AppComponent.usertype == "\"SuperAdmin\" ") {
      setTimeout(() => {
      this.barcodeService.superViewProduct().then(product => { this.data = product});
      },3000);
    } 
    else {
      setTimeout(() => {
      this.barcodeService.viewProduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).then(product => this.data = product);
      },3000);
    }
  }
  ngOnInit(): void {
    this.getBarcode();
  }
}
