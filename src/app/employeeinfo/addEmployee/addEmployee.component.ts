import { Component, OnInit, ViewChild, Input, ElementRef, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../emp.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { window } from 'rxjs/operator/window';

const textPattern = "[a-zA-Z ]*";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

declare var $: any;

@Component({
  selector: 'app-addEmployee',
  templateUrl: './addEmployee.component.html',
  providers: [EmployeeService, NotificationsComponent]

})

export class addEmployeeComponent implements OnInit {
  
  $:any;

  public imagePath;
  imgURL: any;
  public message: string;

  myForm: FormGroup;
  submitted = false;
  companies = [];
  branches = [];
  firms = [];
  flag: boolean = false;
  images: string[][];

  
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  selobj: any;
  errors: any;
  @Input() fileExt: string = "JPG, GIF, PNG";
  constructor(private addEmployee: EmployeeService, private router: Router, formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    let companyid = new FormControl();
    let branchid = new FormControl();
    let storerefid = new FormControl();
    let employeecode = new FormControl();
    let emptitle = new FormControl();
    let empfirstname = new FormControl('', [Validators.required,Validators.pattern(textPattern)]);
    let emplastname = new FormControl('', Validators.pattern(textPattern));
    let employeemode = new FormControl();
    let employeetype = new FormControl();
    let department = new FormControl('', Validators.pattern(textPattern));
    let division = new FormControl('', );
    let desgination = new FormControl('', Validators.pattern(textPattern));
    let joiningdate = new FormControl('', Validators.required);
    let empsalary = new FormControl();
    let dob = new FormControl();
    let age=new FormControl();
    let mobileno = new FormControl('', Validators.required);
    let bloodgroup = new FormControl('', Validators.required);
    let allowlogin = new FormControl();
    let gender = new FormControl();
    let email = new FormControl('', Validators.pattern(pattern));
    let compemail = new FormControl('', Validators.pattern(pattern));
    let pancard = new FormControl('', );
    let status = new FormControl();
    let aadharcard = new FormControl('', Validators.pattern(textnumbers));
    let storerecheckfid = new FormControl();
    let passport = new FormControl();
    let emphoto=new FormControl();
    let warehouserefid = new FormControl();
    let hospitalrefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let createdby = new FormControl();
    let clientcdate= new FormControl();

    this.myForm = new FormGroup({
      companyid: companyid,
      branchid: branchid,
      storerefid: storerefid,
      employeecode: employeecode,
      emptitle: emptitle,
      empfirstname: empfirstname,
      emplastname: emplastname,
      employeemode: employeemode,
      employeetype: employeetype,
      department: department,
      division: division,
      desgination: desgination,
      joiningdate: joiningdate,
      empsalary: empsalary,
      dob: dob,
      age:age,
      mobileno:mobileno,
      bloodgroup: bloodgroup,
      allowlogin: allowlogin,
      gender: gender,
      email: email,
      compemail: compemail,
      pancard: pancard,
      aadharcard: aadharcard,
      passport: passport,
      locname: locname,
      locrefid: locrefid,
      createdby:createdby,
      clientcdate:clientcdate,
      emphoto:emphoto
    });


  }

  ngOnInit() {

    this.myForm.get('companyid').setValue('opt1');
    this.myForm.get('branchid').setValue('opt1');
    this.myForm.get('locname').setValue('opt1');
    this.myForm.get('locrefid').setValue('opt1');

    if (AppComponent.usertype == "\"SuperAdmin\" ") {  
      this.addEmployee.getCompany().subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    } else {     
      this.addEmployee.getCompanyByLogin(AppComponent.companyID).subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    }


  /* Image Preview if eye icon click */


  $(document).ready(function () {

    $("#viewimg").click(function () {

      $("#imgdisplay").show();
      $("#hideimg").show();

    });

    $("#hideimg").click(function () {

      $("#imgdisplay").hide();
      $("#hideimg").hide();

    });

  });

  }/* Ng oninit  end*/


  /*Employee Image PreView */

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  reset() {
    this.myForm.get('emphoto').setValue("");
    this.imgURL='';
    $("#hideimg").hide();
  }


  /* Image End */


  getBranche() {
   
      this.addEmployee.getBranche(this.myForm.get('companyid').value).subscribe(data => { this.branches = data },
        err => {
          console.log('Error Occured Get Branches');
        });
        this.myForm.get('branchid').setValue('opt1');
        this.myForm.get('locname').setValue('opt1');
        this.myForm.get('locrefid').setValue('opt1');
   
  }

  getLoc() {
    if (AppComponent.usertype == "\"SuperAdmin\" ") { 
    
    }
     else {      
     
    
     if(AppComponent.locrefID1==1){
       this.myForm.get('locname').setValue('1');
     }else if(AppComponent.locrefID1==2){
      this.myForm.get('locname').setValue('2');
     }else if(AppComponent.locrefID1==3){
      this.myForm.get('locname').setValue('3');
    }

  }
}


  getFirm() {
   
   // if (AppComponent.usertype == "\"SuperAdmin\" ") {  //selva
      
      if(this.myForm.get('locname').value==1){   
       this.addEmployee.getShop(this.myForm.get('branchid').value).subscribe(data => { this.firms = data },
      err => {
        console.log('Error Occured Get Shop');
      });
    }

    if(this.myForm.get('locname').value==2){        
    this.addEmployee.getWareHouse(this.myForm.get('branchid').value).subscribe(data => { this.firms = data },
      err => {
        console.log('Error Occured Get Warehouse');
      });
    }

    if(this.myForm.get('locname').value==3){         
    this.addEmployee.getHospital(this.myForm.get('branchid').value).subscribe(data => { this.firms = data  },
      err => {
        console.log('Error Occured Get Hospital');
      });
    }
  /*  }else{
      
      
      if(this.myForm.get('locname').value==1){  

        this.addEmployee.getUserShop(AppComponent.locrefID1).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });
     
      }
      if(this.myForm.get('locname').value==2){  
        this.addEmployee.getUserWareHouse(AppComponent.locrefID1).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });

      }
      if(this.myForm.get('locname').value==2){  
        this.addEmployee.getUserHospital(AppComponent.locrefID1).subscribe(data => { this.firms = data },
          err => {
             console.log('Error Occured Get Warehouse');
          });
      }
    }*/

  }



  onSubmit() {                       
    this.submitted = true;
    this.flag = this.employeeValidation();
    if (this.flag == true) {
     /* this.addEmployee.isExistEmployee(this.myForm.get('empfirstname').value).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'EMPLOYEE NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        } else {*/
          this.myForm.get('createdby').setValue(AppComponent.userID);
          this.myForm.get('clientcdate').setValue(AppComponent.date);
          this.createRecord();
      /*  }
      });*/

    }
   
  
  }


  private employeeValidation(): boolean {
    if (this.myForm.get('companyid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COMPANY IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } else if (this.myForm.get('branchid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'BRANCH  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } else if (this.myForm.get('locname').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'LOCATION NAME IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }  
    else if (this.myForm.get('locrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'FIRM  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } 
    return true;
  }




  private createRecord(): void {
    this.addEmployee.createEmployee(JSON.stringify(this.myForm.value)).subscribe(
      (result: any) => {
      let re = result.res;  
      if (re == true) {
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
       this.router.navigate(['Employee/ViewEmployee']);
     }, 2000);
 
      }
    
    
    });
   
  }
 
}

  
  



