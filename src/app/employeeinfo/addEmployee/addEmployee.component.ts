import { Component, OnInit, ViewChild, Input, ElementRef, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../emp.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { window } from 'rxjs/operator/window';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

  $: any;

  public imagePath;
  

  returnValid: any;
  departmentarr = [];
  subdepartmentarr = [];
  divsionarr = [];
  subdivsionarr = [];



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
  closeResult: string;
  boolval: boolean;
  boolval1: boolean;
  boolval2: boolean;
  boolval3: boolean;

//Employee Phot declare
  imgURL: any;
  message: string;
  ephoto: File;
  showimage: boolean=false;
  showeyeslash: boolean=false;
  showeye: boolean=true;
  imageresponse: any;

  // Employee Sign Declare
  signimgURL: any;
  signmessage: string;
  signphoto: File;
  signshowimage: boolean=false;
  signshoweyeslash: boolean=false;
  signshoweye: boolean=true;
  signresponse: any;

  constructor(private addEmployee: EmployeeService, private router: Router, formBuilder: FormBuilder,
    private notificationsComponent: NotificationsComponent, private modalService: NgbModal) {
    let companyid = new FormControl();
    let branchid = new FormControl();
    let storerefid = new FormControl();
    //let employeecode = new FormControl();
    let emptitle = new FormControl();
    let empfirstname = new FormControl('', [Validators.required, Validators.pattern(textPattern)]);
    let emplastname = new FormControl('', Validators.pattern(textPattern));
    let employeemode = new FormControl();
    let employeetype = new FormControl();
    let department = new FormControl();
    let subdepartment = new FormControl();
    let division = new FormControl();
    let subdivision = new FormControl();

    let desgination = new FormControl('', Validators.pattern(textPattern));
    let joiningdate = new FormControl('', Validators.required);
    let empsalary = new FormControl();
    let dob = new FormControl();
    let age = new FormControl();
    let mobileno = new FormControl('', Validators.required);
    let bloodgroup = new FormControl('', Validators.required);
    let allowlogin = new FormControl();
    let gender = new FormControl();
    let email = new FormControl('', Validators.pattern(pattern));
    let compemail = new FormControl('', Validators.pattern(pattern));
    let pancard = new FormControl('');
    let status = new FormControl();
    let aadharcard = new FormControl();
    let storerecheckfid = new FormControl();
    let passport = new FormControl();
    let emphoto = new FormControl();
    let warehouserefid = new FormControl();
    let hospitalrefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let createdby = new FormControl();
    let clientcdate = new FormControl();
    let departmentname = new FormControl();
    let subdepartmentname = new FormControl();
    let divisionname = new FormControl();
    let subdivisionname = new FormControl();

    let deptrefid = new FormControl();
    let subdeptrefid = new FormControl();
    let divisionid = new FormControl();
    let subdivisionid = new FormControl();

  
    this.myForm = new FormGroup({


      departmentname: departmentname,
      subdepartmentname: subdepartmentname,
      divisionname: divisionname,
      subdivisionname: subdivisionname,


      deptrefid: deptrefid, subdeptrefid: subdeptrefid, divisionid: divisionid, subdivisionid: subdivisionid,



      companyid: companyid,
      branchid: branchid,
      storerefid: storerefid,
     // employeecode: employeecode,
      emptitle: emptitle,
      empfirstname: empfirstname,
      emplastname: emplastname,
      employeemode: employeemode,
      employeetype: employeetype,

      department: department,
      subdepartment: subdepartment,
      division: division,
      subdivision: subdivision,

      desgination: desgination,
      joiningdate: joiningdate,
      empsalary: empsalary,
      dob: dob,
      age: age,
      mobileno: mobileno,
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
      createdby: createdby,
      clientcdate: clientcdate,
      emphoto: emphoto
    });


  }

  ngOnInit() {


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };


    this.myForm.get('companyid').setValue('opt1');
    this.myForm.get('branchid').setValue('opt1');
    this.myForm.get('locname').setValue('opt1');
    this.myForm.get('locrefid').setValue('opt1');

    this.myForm.get('department').setValue("0");
    this.myForm.get('subdepartment').setValue("0");
    this.myForm.get('division').setValue("0");
    this.myForm.get('subdivision').setValue("0");



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


    // $(document).ready(function () {

    //   $("#viewimg").click(function () {

    //     $("#imgdisplay").show();
    //     $("#hideimg").show();

    //   });

    //   $("#hideimg").click(function () {

    //     $("#imgdisplay").hide();
    //     $("#hideimg").hide();

    //   });

    // });


    this.getDepartment();


  }/* Ng oninit  end*/



  isexistvalidation(c): Boolean {


    this.addEmployee.isExist(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname, this.selobj.locrefid, this.myForm.get('departmentname').value).subscribe(data => {
      this.boolval = data


      if (!data) {
        var frmdata = {
          departmentname: this.myForm.get('departmentname').value, companyrefid: this.selobj.companyid,

          branchrefid: this.selobj.branchrefid,

          locname: this.selobj.locname,

          locrefid: this.selobj.locrefid
          , clientcdate: AppComponent.date



        };


        this.addEmployee.saveDepartment(JSON.stringify(frmdata)).subscribe(data => { this.getDepartment(), c('Close click') },
          errorCode => console.log(errorCode));

        // this.drugservice.saveGenericname(this.drugForm.get('addgeneric').value).subscribe(data => { c('Close click') },
        //   errorCode => console.log(errorCode));

      }
      else {

        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }


    })
    return this.boolval;
  }



  isexistvalidation1(c): Boolean {


    this.addEmployee.isExist1(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('subdepartmentname').value).subscribe(data => {
        this.boolval1 = data;

        if (!data) {

          var frmdata = {

            deptrefid: this.myForm.get('department').value,

            subdepartmentname: this.myForm.get('subdepartmentname').value,

            companyrefid: this.selobj.companyid,

            branchrefid: this.selobj.branchrefid,

            locname: this.selobj.locname,

            locrefid: this.selobj.locrefid
            , clientcdate: AppComponent.date



          };




          this.addEmployee.saveSubDepartment(JSON.stringify(frmdata)).subscribe(data => { this.getSubDepartment(), c('Close click') },
            errorCode => console.log(errorCode));

        }


        else {

          c('Close click')
          this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Sub Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });


        }


      })
    return this.boolval1;
  }



  isexistvalidation2(c): Boolean {


    this.addEmployee.isExist2(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname, this.selobj.locrefid, this.myForm.get('divisionname').value).subscribe(data => {
      this.boolval2 = data;

      if (!data) {




        var frmdata = {

          deptrefid: this.myForm.get('department').value,
          subdeptrefid: this.myForm.get('subdepartment').value,
          divisionname: this.myForm.get('divisionname').value,
          companyrefid: this.selobj.companyid,
          branchrefid: this.selobj.branchrefid,
          locname: this.selobj.locname,
          locrefid: this.selobj.locrefid,
          clientcdate: AppComponent.date

        };




        this.addEmployee.saveDivision(JSON.stringify(frmdata)).subscribe(data => { this.getDivision(), c('Close click') },
          errorCode => console.log(errorCode));


      }

      else {

        c('Close click')
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });


      }




    })
    return this.boolval2;




  }




  isexistvalidation3(c): Boolean {


    this.addEmployee.isExist3(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('subdivisionname').value).subscribe(data => {
        this.boolval3 = data;

        if (!data) {

          var frmdata = {

            deptrefid: this.myForm.get('department').value,




            subdeptrefid: this.myForm.get('subdepartment').value,

            divisionrefid: this.myForm.get('division').value,

            subdivisionname: this.myForm.get('subdivisionname').value,


            companyrefid: this.selobj.companyid,

            branchrefid: this.selobj.branchrefid,

            locname: this.selobj.locname,

            locrefid: this.selobj.locrefid
            , clientcdate: AppComponent.date



          };




          this.addEmployee.saveSubDivision(JSON.stringify(frmdata)).subscribe(data => { this.getSubDivision(), c('Close click') },
            errorCode => console.log(errorCode));



        }

        else {

          c('Close click')
          this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Department already exist!....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });


        }




      })
    return this.boolval3;
  }






  saveDepartment(c) {


    this.isexistvalidation(c);


    //debugger;
    c('Close click')

    // var frmdata = { frmint1: '', frmstr1: this.drugForm.get('addgeneric').value, createdby: '', 
    // locrefid: this.selobj.locrefid, locname: this.selobj.locname };

  }



  saveSubDepartment(c) {

    this.isexistvalidation1(c);

  }



  saveDivision(c) {

    this.isexistvalidation2(c)

  }



  //   saveDivision(c) {

  //     this.returnValid = this.isexistvalidation2();
  //     if (this.returnValid == false) {
  //     

  //       var frmdata = {

  //         deptrefid: this.myForm.get('department').value,
  //         subdeptrefid: this.myForm.get('subdepartment').value,
  //         divisionname: this.myForm.get('divisionname').value,
  //         companyrefid: this.selobj.companyid,
  //         branchrefid: this.selobj.branchrefid,
  //         locname: this.selobj.locname,
  //         locrefid: this.selobj.locrefid,
  //         clientcdate: AppComponent.date

  //       };
  //       this.addEmployee.saveDivision(JSON.stringify(frmdata)).subscribe(data => { c('Close click') },
  //         errorCode => console.log(errorCode));
  // }  }




  saveSubDivision(c) {


    this.isexistvalidation3(c);


  }



//Employee Image Validation & Preview

  fileChange(event: any) {

    this.message="";
  
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
  
       //Check & Print Type Error Message
       var mimeType = event.target.files[0].type;
       if (mimeType.match(/image\/*/) == null) {
         this.showimage=false;
         this.message = "Only images are supported.";
          return;
       }
      
  
      if (event.target.files[0].size < 500000) {
  
      // Fill file variable with the file content
      this.ephoto = event.target.files[0];
  
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
  
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.ephoto); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
  
    }
  
    else{
      this.message = "Max Image Size 500KB Only & Check File Format";
    }
  
  
  }
   
  }
  

  imageshow(){
    this.showimage=true;
    this.showeyeslash=true;
    this.showeye=false;
  }

  hide(){
    this.showimage=false;
    this.showeyeslash=false;
    this.showeye=true;
  }

  reset(){

    //this.myForm.get('emphoto').setValue("");
    (<HTMLInputElement>document.getElementById("imagefile")).value = '';
    this.imgURL = '';
    this.showimage=false;
    this.showeyeslash=false;
    this.showeye=true;
    this.message='';
  }
 
  /* Employee Image End */


  //Employee Signature Save


  signChange(event: any) {

    this.signmessage="";
  
    // when the load event is fired and the file not empty
    if(event.target.files && event.target.files.length > 0) {
  
       //Check & Print Type Error Message
       var mimeType = event.target.files[0].type;
       if (mimeType.match(/image\/*/) == null) {
         this.signshowimage=false;
         this.signmessage = "Only images are supported.";
          return;
       }
      
  
      if (event.target.files[0].size < 500000) {
  
      // Fill file variable with the file content
      this.signphoto = event.target.files[0];
  
    
      // Instantiate an object to read the file content
      let reader = new FileReader();
  
        //To read Encrypted file and send url to display in html
        reader.readAsDataURL(this.signphoto); 
        reader.onload = (_event) => { 
          this.signimgURL = reader.result; 
        }
        this.savesignimage();
    }
  
    else{
      this.signmessage = "Max Image Size 500KB Only & Check File Format";
    }
  
  
  }
   
  }


  
  signshow(){
    this.signshowimage=true;
    this.signshoweyeslash=true;
    this.signshoweye=false;
  }

  signhide(){
    this.signshowimage=false;
    this.signshoweyeslash=false;
    this.signshoweye=true;
  }

  signreset(){

    //this.myForm.get('emphoto').setValue("");
    (<HTMLInputElement>document.getElementById("signfile")).value = '';
    this.signimgURL = '';
    this.signshowimage=false;
    this.signshoweyeslash=false;
    this.signshoweye=true;
    this.signmessage='';
  }

  //Employee Sign Image End

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


      if (AppComponent.locrefID1 == 1) {
        this.myForm.get('locname').setValue('1');
      } else if (AppComponent.locrefID1 == 2) {
        this.myForm.get('locname').setValue('2');
      } else if (AppComponent.locrefID1 == 3) {
        this.myForm.get('locname').setValue('3');
      }

    }
  }


  getFirm() {

    // if (AppComponent.usertype == "\"SuperAdmin\" ") {  //selva

    if (this.myForm.get('locname').value == 1) {
      this.addEmployee.getShop(this.myForm.get('branchid').value).subscribe(data => { this.firms = data },
        err => {
          console.log('Error Occured Get Shop');
        });
    }

    if (this.myForm.get('locname').value == 2) {
      this.addEmployee.getWareHouse(this.myForm.get('branchid').value).subscribe(data => { this.firms = data },
        err => {
          console.log('Error Occured Get Warehouse');
        });
    }

    if (this.myForm.get('locname').value == 3) {
      this.addEmployee.getHospital(this.myForm.get('branchid').value).subscribe(data => { this.firms = data },
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





  getDepartment() {



    this.addEmployee.getDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid).subscribe(data => this.departmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });

  }




  getSubDepartment() {




    this.addEmployee.getSubDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('department').value).subscribe(data => this.subdepartmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });

  }

  getDivision() {

    this.addEmployee.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.myForm.get('department').value, this.myForm.get('subdepartment').value).subscribe(data => this.divsionarr = data,
        err => {
          console.log('Error Occured Get getDivision');
        });



  }


  getSubDivision() {
    this.addEmployee.getSubDivision(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.myForm.get('department').value, this.myForm.get('subdepartment').value,
      this.myForm.get('division').value).subscribe(data => this.subdivsionarr = data,
        err => {
          console.log('Error Occured Get getSubDivision');
        });



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





  searchwithcodefordept(event, deptmodel) {

    if (event == 'dept') {

      this.department(deptmodel);
    }
    else {
      return;
    }



  }


  department(deptmodel) {

    this.modalService.open(deptmodel).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


  }


  searchwithcodeforsubdept(event, subdeptmodel) {

    if (event == 'subdept') {

      this.subdepartment(subdeptmodel);
    }
    else {
      return;
    }



  }


  subdepartment(subdeptmodel) {

    this.modalService.open(subdeptmodel).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


  }


  searchwithcodefordivision(event, divsionmodel) {

    if (event == 'division') {

      this.divsion(divsionmodel);
    }
    else {
      return;
    }



  }


  divsion(divsionmodel) {

    this.modalService.open(divsionmodel).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


  }


  searchwithcodeforsubdivsion(event, subdivsionmodel) {

    if (event == 'subdivision') {

      this.subdivsion(subdivsionmodel);
    }
    else {
      return;
    }



  }


  subdivsion(subdivsionmodel) {

    this.modalService.open(subdivsionmodel).result.then(

      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });


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

    this.myForm.get('deptrefid').setValue(this.myForm.get('department').value);
    this.myForm.get('subdeptrefid').setValue( this.myForm.get('subdepartment').value);
    this.myForm.get('divisionid').setValue(this.myForm.get('division').value);
    this.myForm.get('subdivisionid').setValue(this.myForm.get('subdivision').value);

    this.addEmployee.createEmployee(JSON.stringify(this.myForm.value)).subscribe(
      (result: any) => {
        let re = result.res;
        if (re == true) {

          this.saveempimage();
          
          this.imageresponse=this.saveempimage();
          alert("Image Response"+this.imageresponse);
          
          if(this.imageresponse==true){
           
            this.savesignimage();
            
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA & IMAGE SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            this.router.navigate(['Employee/ViewEmployee']);
          }
          else{

            this.notificationsComponent.addToast({ title: 'Warning Message', msg: 'DATA ONLY SAVED & IMAGE UNSAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'warning' });
            this.router.navigate(['Employee/ViewEmployee']);
          }
         

        }

        else{
          this.notificationsComponent.addToast({ title: 'Error Message', msg: ' DATA NOT SAVED....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

        }


      });

  }

  saveempimage(){

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("empfile", this.ephoto);
   
    // Launch post request Service Call
    this.addEmployee.saveimage(body).subscribe( (data) => { 
      let re = data.res; alert("Emp imgres"+re); return re;});

 }

 savesignimage(){

  // Instantiate a FormData to store form fields and encode the file
  let body = new FormData();
  // Add file content to prepare the request
  body.append("signfile", this.signphoto);
 
  // Launch post request Service Call
  this.addEmployee.savesignimage(body).subscribe( (data) => { 
    let re = data.res; alert("Signres"+re); return re;});

}

  // Popup Modal Open Code


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  opendept(dept) {

    this.modalService.open(dept).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensubdept(subdept) {

    this.modalService.open(subdept).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }


  opendivision(division) {

    this.modalService.open(division).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  opensubdivision(subdivision) {

    this.modalService.open(subdivision).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }




}






