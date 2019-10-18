import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { PharmacompanyService } from './pharmacompany.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-pharmacompany',
  templateUrl: './pharmacompany.component.html',
  providers: [PharmacompanyService, NotificationsComponent, dateFormatPipe]
})
export class PharmacompanyComponent implements OnInit {
  email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  closeResult: string;
  model: number[];
  selobj;
  compnytypemulList = [];
  divisionmulList = [];
  selectedItems = [];
  selectedItems1 = [];
  compnytypeSettings = {};
  divisionSettings = {};
  compnytypeList = [];
  divisionList = [];
  pcompnytype = [];
  pdivisiontype = [];
  compnytype = [];
  divisiontype = [];
  countries = [];
  states = [];
  cities = [];
  i;
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private router: Router, private userService: PharmacompanyService, private modalService: NgbModal, private notificationsComponent: NotificationsComponent) { }

  ngOnInit() {
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
   
   
    this.compnytypeSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select types",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
    this.divisionSettings = {
      maxHeight: 200,
      singleSelection: false,
      text: "Select division",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


    this.registerForm = this.formBuilder.group({

      phid: ['', []],

      pcompanytype: ['', []],
      phdivision: ['', []],
      dlno: ['', [Validators.required]],

      phindvdivision: ['', []],


      // pcompanytype: ['', [Validators.required, Validators.pattern("[a-zA-Z 0-9,.-]*")]],



      pshortname: ['', [Validators.pattern("[a-zA-Z 0-9,.-]*")]],

      pcompnytype: ['', []],


      pcompanysubtype: ['', []],

      pcompanyname: ['', []],

      // estdyear: ['', []],



      pemail: ['', [Validators.pattern(this.email)]],
      paddress1: ['', [Validators.required]],
      paddress2: ['', []],
      ppincode: ['', []],
      pcountry: ['', []],
      pstate: ['', []],
      pcity: ['', []],
      pcountrycode: ['', []],
      pcontactperson: ['', []],
      pdesignationid: ['', []],
      pmobileno: ['', [Validators.required]],
      pphoneno: ['', []],
      ppanno: ['', []],
      ptinno: ['', []],
      pgstno: ['', []],
      pieccode: ['', []],
      termsandconditions: ['', []],
      pipaddress: ['', []],
      platitude: ['', []],
      plongitude: ['', []],
      pcompanysocialid: ['', []],
      pfacebookid: ['', []],
      ptwitterid: ['', []],
      plinkedinid: ['', []],
      pwebsite: ['', []],
      panno: ['', []],
      paymenttype: ['', []],
      creditdays: ['', []],
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
      clientcdate: ['', []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      countryoforigin: [, []],
    });


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { this.compnytypeList = response, this.viewComptype() },
      errorCode => console.log(errorCode));

    this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
      errorCode => console.log(errorCode));

    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));

    $(document).ready(function () {
      //  $('#patienttallergies').toggle(
      //   $('#patienttconditions').toggle
      $('#comtype').click(function () {
        $('#type').show();
        $('#division').hide();
      });
      $('#comdivision').click(function () {
        $('#type').hide();
        $('#division').show();
      });
    });
  }
  onSubmit() {
    // var answer = confirm("Save data?");
    alert("op" + JSON.stringify(this.registerForm.value));
    this.registerForm.get('clientcdate').setValue(AppComponent.date);
    this.userService.savePhcompany(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveCtypeDivision(data), this.savevalid(data) },
      errorCode => console.log(errorCode));;
    setTimeout(() => {
      // this.router.navigate(['Manufacturer/ViewManufacturer']);
    }, 5000);

  }



  saveCtypeDivision(data: any) {

    if (data==1){


     

    this.compnytype = this.registerForm.get('pcompanytype').value;
    this.divisiontype = this.registerForm.get('phdivision').value;
    
    if (this.compnytype != null) {
      for (this.i = 0; this.i < this.compnytype.length; this.i++) {
        this.pcompnytype.push({ frmint1: this.compnytype[this.i].id, 
          locrefid: this.selobj.locrefid, locname: this.selobj.locname });
     

     
      }
    }
    if (this.divisiontype != null) {
      for (this.i = 0; this.i < this.divisiontype.length; this.i++) {
        this.pdivisiontype.push({ frmint1: this.divisiontype[this.i].id,
          locrefid: this.selobj.locrefid, locname: this.selobj.locname });
      }
    }
    this.userService.saveComptype(JSON.stringify(this.pcompnytype)).subscribe(data => { },
      errorCode => console.log(errorCode));
    this.userService.saveDivision(JSON.stringify(this.pdivisiontype)).subscribe(data => { },
      errorCode => console.log(errorCode));
    this.pcompnytype = [];
    this.pdivisiontype = [];
  }
  }

  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  saveIndvComptype(c) {
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('phindvdivision').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Save data?");

    if (answer) {
      this.userService.saveIndvComptype(JSON.stringify(frmdata)).subscribe(data => { c('Close click') },
        errorCode => console.log(errorCode));


      this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { this.compnytypeList = response, this.viewComptype1() },
        errorCode => console.log(errorCode));

    }

  }


  saveIndvDivision(c) {
    var frmdata = { frmint1: '', frmstr1: this.registerForm.get('phindvdivision').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    var answer = confirm("Save data?");

    if (answer) {
      this.userService.saveIndvDivision(JSON.stringify(frmdata)).subscribe(data => { c('Close click') },
        errorCode => console.log(errorCode));

      this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
        errorCode => console.log(errorCode));

    }

  }


  companyDropdown() {



    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

    this.userService.viewComptype(JSON.stringify(frmdata)).subscribe(response => { this.compnytypeList = response, this.viewComptype() },
      errorCode => console.log(errorCode));


  }




  divisionDropdown() {

    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

    this.userService.viewDivision(JSON.stringify(frmdata)).subscribe(response => { this.divisionList = response, this.viewDivision() },
      errorCode => console.log(errorCode));

  }



  viewState() {
    var frmdata = { frmint1: this.registerForm.get('pcountry').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }
  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('pstate').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }
  viewComptype() {
    for (this.i = 0; this.i < this.compnytypeList.length; this.i++) {
      this.compnytypemulList.push({ id: this.compnytypeList[this.i][0], itemName: this.compnytypeList[this.i][1] });
    }
  }


  viewComptype1() {
    for (this.i = 0; this.i <= this.compnytypeList.length; this.i++) {
      this.compnytypemulList.push({ id: this.compnytypeList[this.i][0], itemName: this.compnytypeList[this.i][1] });
    }
  }

  viewDivision() {
    for (this.i = 0; this.i <= this.divisionList.length; this.i++) {
      this.divisionmulList.push({ id: this.divisionList[this.i][0], itemName: this.divisionList[this.i][1] });
    }
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
