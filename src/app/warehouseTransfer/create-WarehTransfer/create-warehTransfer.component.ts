

import { AddwarehProduct } from '../addwarehProduct';
import { AddwarehTransfer } from '../addwarehTransfer';
import { Addstockvalue } from '../stockvalue';
import { DatawarehTransfer } from '../warehouseTransfer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder,FormArray } from '@angular/forms';



@Component({
  selector: 'app-create-warehTransfer',
  templateUrl: './create-warehTransfer.component.html',

})
export class CreateWarehTransferComponent implements OnInit {
    warehousetrans: FormGroup;
    warehousetransfer = new AddwarehTransfer;
    warehouseproducts = new AddwarehProduct;
    stockvalues = new Addstockvalue;
    warehouselist: any;
    storelist: any;
    companylist: any;
    hosplist: any;
    transrefid: any;
    stocklist: Array <any> = [];
    batchstockid: Array <any> = [];
    productviews: any;
   
    //products=[];
   // i;
    // batchno = this.warehouseproducts.batchno;
    //qty: any;
    //drugproductrefid: any;private fb: FormBuilder
    submitted = false;
  constructor(private dataWarehouse: DatawarehTransfer,private fb: FormBuilder) {

     let whstktrfno = new FormControl('', Validators.required);
     let transferdate = new FormControl('', Validators.required);
//     let TotalProduct = new FormControl('', Validators.required);
//     let TotalQty = new FormControl('', Validators.required);
//     let TotalBoxQty = new FormControl('', Validators.required);
//     let TotalStripQty = new FormControl('', Validators.required);
//     let TotalTabQty = new FormControl('', Validators.required);
     let tostorerefid = new FormControl('', Validators.required);
     let tohospitalrefid = new FormControl('', Validators.required);
     let tocompanyrefid = new FormControl('', Validators.required);
     let fromwarehouserefid = new FormControl('', Validators.required);
// warehouse product
     let whstktrfproid = new FormControl('', Validators.required);
     let drugproductrefid = new FormControl('', Validators.required);
     let batchno = new FormControl('', Validators.required);
     let qty = new FormControl('', Validators.required);
     let purchaseprice = new FormControl('', Validators.required);
     let sellingprice = new FormControl('', Validators.required);

// stock values
     let stockname = new FormControl('', Validators.required);
     let stockbatch = new FormControl('', Validators.required);
     let stockqty = new FormControl('', Validators.required);

     this.warehousetrans = new FormGroup({
     whstktrfno: whstktrfno,
     transferdate: transferdate,
     tostorerefid: tostorerefid,
     tohospitalrefid: tohospitalrefid,
     tocompanyrefid: tocompanyrefid,
     fromwarehouserefid: fromwarehouserefid,

// warehouse product
      whstktrfproid: whstktrfproid,
      drugproductrefid: drugproductrefid,
      batchno: batchno,
      qty: qty,
      purchaseprice: purchaseprice,
      sellingprice: sellingprice,
// stock value
      stockname: stockname,
      stockbatch: stockbatch,
      stockqty: stockqty,

      })
  }
     newWarehouse(): void {
      this.submitted = false;
      this.warehousetransfer = new AddwarehTransfer;
      this.warehouseproducts = new AddwarehProduct;
  }
     ngOnInit() {
      this.getwarehouselists();
      this.getstorelists();
      this.getcompanylists();
      this.gethospitallist();
      this.getviewproduct();
//    this.gettransrefid();
      this.getwarehousestocks();



  }
     
private save(): void {
 this.dataWarehouse.create(this.warehousetransfer);
 this.dataWarehouse.createpro(this.warehouseproducts);

  }
onSubmit() {
    this.submitted = true;                 // saving value
    this.save();

   alert(JSON.stringify(this.productviews));
  }
// add extra colums
 addFieldValue() {
        this.productviews.push(this.warehouseproducts)
    
    }
// delete colums
deleteFieldValue(index) {
        this.productviews.splice(index, 1);
    }
  // from access
  getwarehouselists() {
    this.dataWarehouse.getwarehouselists().then(warehouselist => this.warehouselist = warehouselist);
  }
// to store access
getstorelists() {
 this.dataWarehouse.getstorelists().then(storelist => this.storelist = storelist);

  }
// to company access
getcompanylists() {
this.dataWarehouse.getcompanylists().then(companylist => this.companylist = companylist);

}
// to hospital access
gethospitallist() {
 this.dataWarehouse.gethospitallist().then(hosplist => this.hosplist = hosplist);

}
// product display
getviewproduct() {
this.dataWarehouse.getviewproduct().then(productviews => this.productviews = productviews);
}

// warehouse stock list
getwarehousestocks() {
this.dataWarehouse.getwarehousestocks().then(stocklist => this.stocklist = stocklist);
}
getbatchstockid() {
 this.dataWarehouse.getbatchstockid(this.warehousetrans.get('stockname').value).subscribe(batchstockid => this.batchstockid = batchstockid);
 }


}
