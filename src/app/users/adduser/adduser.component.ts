import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
import {AppComponent } from '../../app.component';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers: [NotificationsComponent]
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean;
  public reFlag: boolean = false;
  companylist = [];
  country = [];
  product = [];
  domain = [];
  rolelist = [];
  data = [];
  subdomain = [];
  edition = [];
  employee = [];
  distributorrefid = [];
  emailPattern = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  constructor(private userService: UsersService, private notificationsComponent: NotificationsComponent, private router: Router) {
    const countryrefid = new FormControl();
    const productrefid = new FormControl();
    const domainrefid = new FormControl();
    const subdomainrefid = new FormControl();
    const companyrefid = new FormControl();
    const status = new FormControl();
    const rolerefid = new FormControl();
    const editionrefid = new FormControl();
    const username = new FormControl();
    const password = new FormControl();
    const usertype = new FormControl();
    const emprefid = new FormControl();
    const isadmin = new FormControl();
    const isactive = new FormControl();
    const cuserrefid = new FormControl();
    const emailid = new FormControl('', Validators.pattern(this.emailPattern));
    const phoneno = new FormControl();
    const distributorid= new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();


    this.userForm = new FormGroup({

      clientcdate : clientcdate,
      createdby : createdby,

      countryrefid: countryrefid,
      productrefid: productrefid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      companyrefid: companyrefid,
      rolerefid: rolerefid,
      username: username,
      editionrefid: editionrefid,
      password: password,
      emprefid: emprefid,
      isadmin: isadmin,
      isactive: isactive,
      emailid: emailid,
      phoneno: phoneno,
      distributorid: distributorid
    });
  }

  ngOnInit() {
    //SET DROPDOWN PLACEHOLDER     
    this.setDropHolder();
    this.userForm.get('companyrefid').setValue('0');
    this.userForm.get('isadmin').setValue('0');
    this.userForm.get('isactive').setValue('0');

    this.userService.getCompanylist().then(data => { this.companylist = data })
  }
  setDropHolder() {
    this.userForm.get('countryrefid').setValue('0');
    this.userForm.get('productrefid').setValue('0');
    this.userForm.get('domainrefid').setValue('0');
    this.userForm.get('subdomainrefid').setValue('0');
    this.userForm.get('rolerefid').setValue('0');
    this.userForm.get('emprefid').setValue('0');
    this.userForm.get('editionrefid').setValue('0');
    this.userForm.get('distributorid').setValue('0');
  }
  getuserData() {
    this.setDropHolder();
    this.userService.getuserCountry(this.userForm.get('companyrefid').value).subscribe(data => {
      this.country = data;
    },
      err => {
        console.log('Error Occured On getuserCountry()');
      });

    this.userService.getuserProduct(this.userForm.get('companyrefid').value).subscribe(data => {
      this.product = data;
    },
      err => {
        console.log('Error Occured On getuserProduct()');
      });

    this.userService.getuserDomain(this.userForm.get('companyrefid').value).subscribe(data => {
      this.domain = data;
    },
      err => {
        console.log('Error Occured On getuserDomain()');
      });

    this.userService.getusersubDomain(this.userForm.get('companyrefid').value).subscribe(data => {
      this.subdomain = data;
    },
      err => {
        console.log('Error Occured On getusersubDomain()');
      });

    this.userService.getuserEdition(this.userForm.get('companyrefid').value).subscribe(data => {
      this.edition = data;
    },
      err => {
        console.log('Error Occured On getuserEdition()');
      });

    this.userService.getemployeelist(this.userForm.get('companyrefid').value).then(data => { this.employee = data });

    this.userService.getRolelist(this.userForm.get('companyrefid').value).subscribe(data => {
      this.rolelist = data, err => {
        console.log('Error Occured On getRolelist()')
      }
    });
  
  this.userService.Distinfo(this.userForm.get('companyrefid').value).subscribe(data => this.distributorrefid = data)
  }
  onSubmit(): any {
    this.reFlag = this.userValidation();
    if (this.reFlag == true) {

      this.userForm.get('clientcdate').setValue(AppComponent.date);
      this.userForm.get('createdby').setValue(AppComponent.userID);


      this.userService.createUser(JSON.stringify(this.userForm.value)).subscribe(data => {
        if (data == true) {
          this.userService.createLogin(JSON.stringify(this.userForm.value)).subscribe(data => {
            if (data == true) {
              this.userForm.reset();
              this.ngOnInit();
              this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            } else {
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          });
        }
        else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      }, err => {
        console.log('Error Occured On createlogin()');
      });
    }
  }

  userValidation(): boolean {
    if (this.userForm.get('companyrefid').value == '0' || this.userForm.get('companyrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Company..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('countryrefid').value == '0' || this.userForm.get('countryrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Country..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('productrefid').value == '0' || this.userForm.get('productrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Product..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('domainrefid').value == '0' || this.userForm.get('domainrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Domain..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('subdomainrefid').value == '0' || this.userForm.get('subdomainrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your SUb-Domaine..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('editionrefid').value == '0' || this.userForm.get('editionrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Edition..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('rolerefid').value == '0' || this.userForm.get('rolerefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Role..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('username').value == '' || this.userForm.get('username').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Enter UserName..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('password').value == '' || this.userForm.get('password').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter User Password..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    
    if (this.userForm.get('emailid').value == '' || this.userForm.get('emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Email..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.userForm.get('phoneno').value == '' || this.userForm.get('phoneno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Phone Number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  viewUserinfo() {
    this.router.navigate(['User/ViewUser']);
  }
}