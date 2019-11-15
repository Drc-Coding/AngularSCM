
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BarcodeService } from '../barcode.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { empty } from 'rxjs/Observer';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { NgxBarcodeModule } from 'ngx-barcode';

@Component({
  selector: 'app-addBarcode',
  templateUrl: './addBarcode.component.html',
  providers: [NotificationsComponent,NgxBarcodeModule],
  styles:[]
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
  barcodeimg:any;
 


//BarCode Details
  elementType = 'svg';
  value = '';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1.5;
  height = 50;
  displayValue = true;
  // fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 5;
  marginTop = 5;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  
  constructor(private barcodeService: BarcodeService, private location: Location, private router: Router, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder) {

    this.barcodeForm = this.formBuilder.group({
      product: ['', []],
      pcode: ['', []],
      mfbarcode: ['', []],
     //supplier code
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
   this.barcodeForm.get('product').setValue('opt1');
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

      this.barcodeService.getproduct(searchValue, AppComponent.companyID,AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
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
    this.barcodeService.genBarcode(JSON.stringify(varbar)).subscribe(data =>( this.value = data[0]));
    // this.notificationsComponent.addToast({ title: 'Generate BarCode', msg: 'Generate BarCode Successfully', timeout: 2000, themee: 'default', position: 'top-right', type: 'success' });
  }
    
//Barcode coding
    get values(): string[] {
      return this.value.split('\n');
    }
    codeList: string[] = [
      '', 'CODE128',
      'CODE128A', 'CODE128B', 'CODE128C',
      'UPC', 'EAN8', 'EAN5', 'EAN2',
      'CODE39',
      'ITF14',
      'MSI', 'MSI10', 'MSI11', 'MSI1010', 'MSI1110',
      'pharmacode',
      'codabar'
    ];





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




