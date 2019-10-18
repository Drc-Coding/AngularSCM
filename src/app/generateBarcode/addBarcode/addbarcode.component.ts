
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BarcodeService } from '../barcode.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-addBarcode',
  templateUrl: './addBarcode.component.html',
  providers: [NotificationsComponent]
})
export class AddBarcodeComponent implements OnInit {
  characters = [];
  pbarcode = [];
  barcodeForm: any;
  products: any;
  productid: String;
  submitted = false;
  flag: boolean = false;
  prcode: any;
  
  constructor(private barcodeService: BarcodeService, private location: Location, private router: Router, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder) {

    this.barcodeForm = this.formBuilder.group({
      product: ['', []],
      pcode: ['', []],
      mfbarcode: ['', []],
      spcode: ['', []],
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
    });

  }

  ngOnInit() {



    this.barcodeForm.get('product').setValue('opt1');
    this.barcodeForm.get('pcode').setValue("Product code");
    // this.barcodeService.getSuperProduct().then(data => this.products = data);

    this.barcodeForm.get('product').setValue('opt1');
    //  this.barcodeService.getproduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).then(data => this.products = data);


  }

  getProduct(searchValue: string) {
    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      this.barcodeService.getSuperProduct(searchValue).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
    } else {

      this.barcodeService.getproduct(searchValue, AppComponent.companyID,
        AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
          this.characters = [];
          for (let i = 0; i < data.length; i++) {
            this.characters.push({ value: data[i][0], label: data[i][1] });
          }
        });

    }
  }




  getCode() {
    this.barcodeForm.get('pcode').setValue(this.barcodeForm.get('product').value);
  }


  // Raja
  generatebarcode() {
    
let varbar={product:this.barcodeForm.get('product').value,companyid:AppComponent.companyID,locrefid:AppComponent.locrefID1}
    this.barcodeService.genBarcode(JSON.stringify(varbar)).subscribe(data => this.barcodeForm.get('spcode').setValue(data[0]));
    this.notificationsComponent.addToast({ title: 'Generate BarCode', msg: 'Generate BarCode Successfully', timeout: 2000, themee: 'default', position: 'top-right', type: 'success' });
  
    // this.barcodeService.genBarcode(JSON.stringify(varbar)).subscribe(data => {this.barcodeForm.get('mfbarcode').setValue(data[0]),alert(data)});
  
}
  
  // mbarcode(barcode: any) {
  //   this.barcodeService.getMbarcode(barcode, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
  //     this.pbarcode = [];
  //     for (let i = 0; i < data.length; i++) {
  //       this.pbarcode.push({ value: data[i][0], label: data[i][1] });
  //     }
  //   });
  // }



  // onSubmit() {



  //   this.registerForm.get('clientcdate').setValue(AppComponent.date);
  // this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(    data => {
  //   this.savevalid(data)
  //   },

  // errorCode => console.log(errorCode) );  


  private save(): void {
    this.barcodeForm.get('companyid').setValue(AppComponent.companyID);
    this.barcodeForm.get('branchid').setValue(AppComponent.branchID);
    this.barcodeForm.get('locname').setValue(AppComponent.locRefName1);
    this.barcodeForm.get('locrefid').setValue(AppComponent.locrefID1);

    this.barcodeService.createBarcode(JSON.stringify(this.barcodeForm.value)).subscribe(
      data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'BARCODE IS SAVED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          
          this.barcodeForm.reset();
          
          
          this.router.navigate(['AssignBarcode/ViewBarcode']);
        }

      }
      
    );
  }


  onSubmit() {
    this.save();
  }

}




