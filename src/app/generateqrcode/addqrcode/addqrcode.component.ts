import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { QRcodeService } from '../generateqrcode.service';
import { Router } from '@angular/router';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-addqrcode',
  templateUrl: './addqrcode.component.html',
  styleUrls: ['./addqrcode.component.css'],
  providers:[NotificationsComponent,QRcodeService]
})
export class AddqrcodeComponent implements OnInit {
   QRcodeForm:any;
   characters=[];
   barcodeimg:any;
  
   public QrCode: string = null;
  constructor(private formbuilder:FormBuilder, private notification:NotificationsComponent, private qrcodeservice:QRcodeService, private router:Router,
    private appcomponent:AppComponent) {
    this.QRcodeForm = this.formbuilder.group({
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

    // this.myAngularxQrCode = 'Your ';
   }

  ngOnInit() {

    this.QRcodeForm.get('product').setValue('opt1');
    this.QRcodeForm.get('pcode').setValue("Product code");
   this.QRcodeForm.get('product').setValue('opt1');

  }



  getProduct(searchValue: string) {
    
    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      this.qrcodeservice.getSuperProduct(searchValue).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
    } else {

      this.qrcodeservice.getproduct(searchValue, AppComponent.companyID,AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
          this.characters = [];
          for (let i = 0; i < data.length; i++) {
            this.characters.push({ value: data[i][0], label: data[i][1] });
          }
        });

    }
  }




  getCode() {
    this.QRcodeForm.get('pcode').setValue(this.QRcodeForm.get('product').value);
  }


  generateqrrcode() {
    
    let varbar={product:this.QRcodeForm.get('product').value,companyid:AppComponent.companyID,locrefid:AppComponent.locrefID1}
    this.qrcodeservice.genbarcodekey(JSON.stringify(varbar)).subscribe(data =>(this.QrCode = data[0]));
    //  this.notification.addToast({ title: 'Generate BarCode', msg: 'Generate BarCode Successfully', timeout: 2000, themee: 'default', position: 'top-right', type: 'success' });
  }
  // name = 'Angular';

  // elementType : 'url' | 'canvas' | 'img' = 'url';
  // value : string = 'facebook.com';




  private save(): void {
    this.QRcodeForm.get('companyid').setValue(AppComponent.companyID);
    this.QRcodeForm.get('branchid').setValue(AppComponent.branchID);
    this.QRcodeForm.get('locname').setValue(AppComponent.locRefName1);
    this.QRcodeForm.get('locrefid').setValue(AppComponent.locrefID1);

    this.qrcodeservice.createBarcode(JSON.stringify(this.QRcodeForm.value)).subscribe(
      data => {
        if (data == true) {
         
          this.notification.addToast({ title: 'SUCESS MESSAGE', msg: 'QR Code is Saved Successfully.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          
          this.QRcodeForm.reset();
          
         
          // this.router.navigate(['AssignBarcode/ViewBarcode']);
        }

      }
      
    );
  }


  onSubmit() {
    this.save();
  }

}
