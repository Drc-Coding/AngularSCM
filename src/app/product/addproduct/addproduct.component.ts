
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'app/product/product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { NotificationsComponent } from '../../notifications/notifications.component';

import {AppComponent} from '../../app.component';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  providers: [NotificationsComponent]
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup;
  country: any;
  productid: String;
  submitted = false;
  flag: boolean = false;
  constructor(private productService: ProductService, private location: Location, private router: Router, private notificationsComponent: NotificationsComponent) {

    const countryid = new FormControl();
    const productname = new FormControl('', Validators.required);
    const productcode = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();

    this.productForm = new FormGroup({

      clientcdate: clientcdate,
      createdby: createdby,
      countryid: countryid,
      productname: productname,

      productcode: productcode

    });

  }

  ngOnInit() {
    this.productForm.get('countryid').setValue('opt1');
    this.productService.getcountry().then(country => this.country = country);
  }

  private save(): void {
    this.productService.createProduct(JSON.stringify(this.productForm.value));
    this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'PRODUCT IS SAVED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
    this.ngOnInit();
    this.productForm.reset();
  }


  onSubmit() {
    this.submitted = true;
    this.flag = this.productValidation();
    if (this.flag == true) {
      this.productForm.get('clientcdate').setValue(AppComponent.date);
      this.productForm.get('createdby').setValue(AppComponent.userID);

      let cid: any = this.productForm.get('countryid').value;
      let pname: any = this.productForm.get('productname').value;
      this.productService.isExistProduct(cid, pname).subscribe(data => {
        if (data == false) {
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PRODUCT NAME IS ALREDY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }
        else {
          this.save();
        }
      });

    }
  }


  private productValidation(): boolean {
    if (this.productForm.get('countryid').value == "opt1" && this.productForm.get('countryid').value == "NOT FOUND") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COUNTRY NAME IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.productForm.get('productname').value.length > 3) {
      var sub = this.productForm.get('productname').value.substr(0, 3);
      this.productForm.get('productcode').setValue(sub.toUpperCase());
    } else {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'PLEASE ENTER ABOVE THREE CHARACTER', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    return true;
  }


  view(): void {
    this.router.navigateByUrl('/Product/ViewProduct');
  }


}
