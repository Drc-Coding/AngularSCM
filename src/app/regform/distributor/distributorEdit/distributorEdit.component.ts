import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DistributorEditService } from './distributorEdit.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './distributorEdit.component.html',
  providers: [DistributorEditService, NotificationsComponent]
})
export class DistributorEditComponent implements OnInit {
  email  =   "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  registerForm: FormGroup;
  id: number;
  private sub: any;
  allergies = [];
  countries = [];
  states = [];
  cities = [];
  phcompany = [];
  i;
  selobj;
  mulSettings = {};
  mulList = [];
  mulservList = [];
  mulservtype = [];
  multype = [];
  mulselservlist = [];
  mulsellist = [];
  constructor(private formBuilder: FormBuilder, private userService: DistributorEditService ,private router: Router,private modalService: NgbModal, private route: ActivatedRoute, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {

    this.mulSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select Types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.registerForm = this.formBuilder.group({
      id: ['', []],
      distributorname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      dshortname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      dcompnaytype: ['', []],
      dcompnaysubtype: ['', []],
      estdyear: ['', []],
      email: ['', [Validators.email]],
      address1: ['', [Validators.required]],
      address2: ['', []],
      pincode: ['', []],
      country: ['', []],
      state: ['', []],
      city: ['', []],
      countrycode: ['', []],
      contactperson: ['', []],
      designationid: ['', []],
      mobileno: ['', [Validators.required]],
      phoneno: ['', []],
      panno: ['', []],
      tinno: ['', []],
      gstno: ['', []],
      ieccode: ['', []],
      termsandconditions: ['', []],
      dipaddress: ['', []],
      aadharno: ['', []],
      paymenttype: ['', []],
      bankname: ['', []],
      bankbranch: ['', []],
      accountnumber: ['', []],
      ifsccode: ['', []],
      swiftcode: ['', []],
      misccode: ['', []],
      ipaddress: ['', []],
      macid: ['', []],
      ostype: ['', []],
      browsertype: ['', []],
      rating: ['', []],
      comments: ['', []],
      createddate: ['', []],
      clientmdate: ['', []],
      modifiedby: ['', []],
      clientcdate: ['', []],
      
      modifieddate: ['', []],
      
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      status: ['', []],
      distributortypeid: ['', []],
      phcompanyid: [, []],
      phcompany: [, []],
      creditdays: [, []],
      leadtime: [, []]
    });
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var distid = {distributorid: this.id};
    this.userService.viewDistributorEdit(JSON.stringify(frmdata)).subscribe(data => { this.registerForm.patchValue(data) },
      errorCode => console.log(errorCode));
     this.userService.viewDisttype(JSON.stringify(frmdata)).subscribe(response => { this.allergies = response },
     errorCode => console.log(errorCode));
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
    this.userService.viewDstPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulservList = data, this.viewPharmaCompany() },
      errorCode => console.log(errorCode));
    this.userService.viewDistEditPhCompanies(JSON.stringify(frmdata)).subscribe(data => { this.mulselservlist = data, this.viewEditPharmaCompany() },
      errorCode => console.log(errorCode));
      this.userService.geteditstate(JSON.stringify(distid)).subscribe(data => { this.states = data, this.viewState() },
      errorCode => console.log(errorCode));
      this.userService.geteditcity(JSON.stringify(distid)).subscribe(data => { this.cities = data, this.viewCity() },
      errorCode => console.log(errorCode));
      // this.userService.getdisttype(JSON.stringify(distid)).subscribe(data => { this.allergies = data},
      // errorCode => console.log(errorCode));
  }



  onSubmit() {
   // var answer = confirm("Save data?");
 
      
 this.registerForm.get('clientmdate').setValue(AppComponent.date);
 this.registerForm.get('modifiedby').setValue(AppComponent.userID);
      this.userService.saveDistributor(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
        setTimeout(() => {
          this.router.navigate(['Distributor/ViewDistributor']);
        }, 2000);
    
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  viewState() {
    var frmdata = { frmint1: this.registerForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }
  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }
  viewPharmaCompany() {
    for (this.i = 0; this.i < this.mulservList.length; this.i++) {
      this.mulList.push({ id: this.mulservList[this.i][0], itemName: this.mulservList[this.i][1] });
    }
  }
  viewEditPharmaCompany() {
    for (this.i = 0; this.i < this.mulselservlist.length; this.i++) {
      this.mulsellist.push({ id: this.mulselservlist[this.i][0], itemName: this.mulselservlist[this.i][1] });
    }
  }
  saveDistPhcompany(data: any) {
    this.multype = this.registerForm.get('phcompany').value;
    if (this.multype != null) {
      for (this.i = 0; this.i < this.multype.length; this.i++) {
        this.mulservtype.push({ frmint1: this.multype[this.i].id, locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      }
    }
    this.multype = [];
    this.mulservtype = [];
  }
  deleteDistributor() {
    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Delete data?");
    if (answer) {
      this.userService.deleteDistributor(JSON.stringify(frmdata)).subscribe(data => {this.router.navigate(['/Distributor/ViewDistributor']) },
        errorCode => console.log(errorCode));
    }
  }
}