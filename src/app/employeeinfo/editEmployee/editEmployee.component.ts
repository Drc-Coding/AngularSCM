
import { EmployeeService } from '../emp.services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';

const textPattern = "[a-zA-Z ]*";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  declare var $:any;

@Component({
  selector: 'app-employeeEdit',
  templateUrl: './editEmployee.component.html',
  providers: [EmployeeService, NotificationsComponent]
})
export class editEmployeeComponent implements OnInit {


  selobj: any;

  $:any;

  public imagePath;
  imgURL: any;
  public message: string;


  private empValue: any;
  id: number;
  locname:  number;
  countries: any;
  submitted = false;
  states = [];
  companies = [];
  branches = [];
  firms = [];
  employeeEdit: FormGroup;
  flag: boolean = false;
  departmentarr: any;
  subdepartmentarr: any;
  divsionarr: any;
  subdivsionarr: any;
  constructor(private employeeServices: EmployeeService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {
    let id = new FormControl();
    let companyid = new FormControl();
    let branchid = new FormControl();
    let shopid = new FormControl();
    let employeecode = new FormControl();
    let emptitle = new FormControl();
    let empfirstname = new FormControl('',[Validators.required,Validators.pattern(textPattern)]);
    let emplastname = new FormControl('',Validators.pattern(textPattern));
    let employeemode = new FormControl();
    let employeetype = new FormControl();
    let department = new FormControl('', Validators.pattern(textPattern));
    let division = new FormControl('', );
    let desgination = new FormControl('', Validators.pattern(textPattern));
    let joiningdate = new FormControl('', Validators.required);
    let empsalary = new FormControl();
    let dob = new FormControl();
    let age = new FormControl();
    let mobileno=new FormControl('',Validators.required);
    let bloodgroup = new FormControl('', Validators.required);
    let allowlogin = new FormControl();
    let gender = new FormControl();
    let email = new FormControl('', Validators.pattern(pattern));
    let compemail = new FormControl('',Validators.pattern(pattern));
    let pancard = new FormControl('', );
    let status = new FormControl();
    let aadharcard = new FormControl('', Validators.pattern(textnumbers));
    let passport = new FormControl();
    let emphoto = new FormControl();
    let warehouserefid = new FormControl();
    let hospitalrefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let modifiedby = new FormControl();
    let clientmdate = new FormControl();
    let subdepartment = new FormControl();
   let subdivision = new FormControl();

    this.employeeEdit = new FormGroup({
      id: id,
      companyid: companyid,
      branchid: branchid,
      shopid: shopid,
      employeecode: employeecode,
      emptitle: emptitle,
      empfirstname: empfirstname,
      emplastname: emplastname,
      employeemode: employeemode,
      employeetype: employeetype,
      
      department: department,
      subdepartment: subdepartment,
      subdivision:subdivision,
      division: division,
     
      desgination: desgination,
      joiningdate: joiningdate,
      empsalary: empsalary,
      dob: dob,
      age: age,
      mobileno:mobileno,
      bloodgroup: bloodgroup,
      allowlogin: allowlogin,
      gender: gender,
      email: email,
      compemail: compemail,
      pancard: pancard,
      aadharcard: aadharcard,
      passport: passport,
      emphoto:emphoto,
      locname: locname,
      locrefid: locrefid,
      modifiedby: modifiedby,
      clientmdate: clientmdate
    });
   

  }

  ngOnInit() {



this.employeeEdit.get('department').setValue('0');
this.employeeEdit.get('subdepartment').setValue('0');
this.employeeEdit.get('subdivision').setValue('0');
this.employeeEdit.get('division').setValue('0');


this.selobj = {
  userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
  companyid: AppComponent.companyID
  , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
  , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
};



    if (AppComponent.usertype == "\"SuperAdmin\" ") {               
      this.employeeServices.getCompany().subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    } else {              
      this.employeeServices.getCompanyByLogin(AppComponent.companyID).subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    }



    this.empValue = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });


    this.employeeServices.employeeEdit(this.id).subscribe(data => { this.employeeEdit.patchValue(data) },
      err => {
        console.log('Error occured in shop edit ');
      });

      
     

    //get Employee Company
    this.employeeServices.getEmpCompany(this.id).subscribe(data => this.companies = data,
      err => {
        console.log('Error occured in Company edit ');
      });


    //get Employee Branch 
    this.employeeServices.getEmpBranch(this.id).subscribe(data => {this.branches =data},
      err => {
        console.log('Error occured in Branch edit ');
      });

   

        this.employeeServices.getEditEmpFirm(this.id).subscribe(data => { this.firms = data},
          err => {
            console.log('Error Occured Get Shop');
          });
    
          if (AppComponent.usertype == "\"SuperAdmin\" ") {               
            this.employeeServices.getCompany().subscribe(data => this.companies = data,
              err => {
                console.log('Error Occured ');
              });
          } else {              
            this.employeeServices.getCompanyByLogin(AppComponent.companyID).subscribe(data => this.companies = data,
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
this. getDepartment();

  }  /* Ng Oninit End */


  getDepartment() {



    this.employeeServices.getDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid).subscribe(data => this.departmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });

  }




  getSubDepartment() {




    this.employeeServices.getSubDepartment(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.employeeEdit.get('department').value).subscribe(data => this.subdepartmentarr = data,
        err => {
          console.log('Error Occured Get getDepartment');
        });

  }

  getDivision() {

    this.employeeServices.getDivision(this.selobj.companyid, this.selobj.branchrefid, this.selobj.locname,
      this.selobj.locrefid, this.employeeEdit.get('department').value, this.employeeEdit.get('subdepartment').value).subscribe(data => this.divsionarr = data,
        err => {
          console.log('Error Occured Get getDivision');
        });



  }


  getSubDivision() {
    this.employeeServices.getSubDivision(this.selobj.companyid, this.selobj.branchrefid,
      this.selobj.locname, this.selobj.locrefid, this.employeeEdit.get('department').value, this.employeeEdit.get('subdepartment').value,
      this.employeeEdit.get('division').value).subscribe(data => this.subdivsionarr = data,
        err => {
          console.log('Error Occured Get getSubDivision');
        });



  }







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
    this.employeeEdit.get('emphoto').setValue("");
    this.imgURL='';
    $("#hideimg").hide();
  }


  /* Image End */



  //get Branch
  getBranch() {
    if (AppComponent.usertype == "\"SuperAdmin\" ") { 
    this.employeeServices.getBranch(this.employeeEdit.get('companyid').value).subscribe(data => this.branches = data,
      err => {
        console.log('Error occured in Company edit ');
      });
      this.employeeEdit.get('branchid').setValue('opt1');
      this.employeeEdit.get('locname').setValue('opt1');
      this.employeeEdit.get('locrefid').setValue('opt1');
    }else{
      this.employeeServices.getEmpBranch(AppComponent.branchID).subscribe(data => this.branches = data,
        err => {
          console.log('Error occured in Branch edit ');
        });
        this.employeeEdit.get('branchid').setValue('opt1');
        this.employeeEdit.get('locname').setValue('opt1');
        this.employeeEdit.get('locrefid').setValue('opt1');
    }
  }

  getLoc() {
    if (AppComponent.usertype == "\"SuperAdmin\" ") { 
    
    }
     else {      
     
    
     if(AppComponent.locrefID1==1){
       this.employeeEdit.get('locname').setValue('1');
     }else if(AppComponent.locrefID1==2){
      this.employeeEdit.get('locname').setValue('2');
     }else if(AppComponent.locrefID1==3){
      this.employeeEdit.get('locname').setValue('3');
    }

  }
}

getFirm() {
   
  if (AppComponent.usertype == "\"SuperAdmin\" ") {
    
    if(this.employeeEdit.get('locname').value==1){   
     this.employeeServices.getShop(this.employeeEdit.get('branchid').value).subscribe(data => { this.firms = data },
    err => {
      console.log('Error Occured Get Shop');
    });
  }

  if(this.employeeEdit.get('locname').value==2){        
  this.employeeServices.getWareHouse(this.employeeEdit.get('branchid').value).subscribe(data => { this.firms = data },
    err => {
      console.log('Error Occured Get Warehouse');
    });
  }

  if(this.employeeEdit.get('locname').value==3){         
  this.employeeServices.getHospital(this.employeeEdit.get('branchid').value).subscribe(data => { this.firms = data  },
    err => {
      console.log('Error Occured Get Hospital');
    });
  }
  }else{   
    if(this.employeeEdit.get('locname').value==1){  

      this.employeeServices.getUserShop(AppComponent.locRefName).subscribe(data => { this.firms = data },
        err => {
           console.log('Error Occured Get Warehouse');
        });
   
    }
    if(this.employeeEdit.get('locname').value==2){  
      this.employeeServices.getUserWareHouse(AppComponent.locRefName).subscribe(data => { this.firms = data },
        err => {
           console.log('Error Occured Get Warehouse');
        });

    }
    if(this.employeeEdit.get('locname').value==2){  
      this.employeeServices.getUserHospital(AppComponent.locRefName).subscribe(data => { this.firms = data },
        err => {
           console.log('Error Occured Get Warehouse');
        });
    }

    
  }

}

  onSubmit() {
    this.submitted = true;
    this.flag = this.employeeValidation();   
    if (this.flag == true) {
    
      this.updateEmployee();
      this.employeeEdit.reset();
      this.employeeEdit.get('companyid').setValue('opt1');
      this.employeeEdit.get('branchid').setValue('opt1');
      this.employeeEdit.get('locname').setValue('opt1');
      this.employeeEdit.get('locrefid').setValue('opt1');
    }
   
  
  }

  private employeeValidation(): boolean {
    if (this.employeeEdit.get('companyid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COMPANY IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.employeeEdit.get('branchid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'BRANCH  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.employeeEdit.get('locname').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'FIRM  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }if (this.employeeEdit.get('locrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'FIRM  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;

    }
    return true;
  }

  private updateEmployee(): void {
    this.employeeEdit.get('modifiedby').setValue(AppComponent.userID);
    this.employeeEdit.get('clientmdate').setValue(AppComponent.date);
    this.employeeServices.updateEmployee(JSON.stringify(this.employeeEdit.value));
    this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA UPDATED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
    setTimeout(() => {
   this.router.navigate(['Employee/ViewEmployee']);
 }, 2000);

    
  }

}
