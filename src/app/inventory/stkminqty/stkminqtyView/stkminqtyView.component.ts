
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { stkminqtyViewService } from './stkminqtyView.service';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-stkminqtyView',
  templateUrl: './stkminqtyView.component.html',
  providers: [stkminqtyViewService]

})
export class stkminqtyViewComponent implements OnInit {




  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";


  registerForm: FormGroup;

  pharmacomp = [];

  selobj;


  hdFlag : number;
  gifFail: boolean=true;



  constructor(private userService: stkminqtyViewService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, companyid: AppComponent.companyID, branchid:AppComponent.branchID };


    this.registerForm = this.formBuilder.group({
      minstockflag: [, []]
    });



   this.registerForm.get('minstockflag').setValue("1")

   this.viewAll();


  }
 
 

 
  viewAll() {

    if (this.registerForm.get('minstockflag').value == 1) {


      this.hdFlag =1;
      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };
     
     
      setTimeout(() => {
      this.userService.viewStkMinQtyAll(JSON.stringify(frmdata)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));

        this.gifFail=false;
      },3000);
    }


    else if (this.registerForm.get('minstockflag').value == 2) {
      this.hdFlag =2;
   


      var frmdata1 = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, 
      companyrefid:this.selobj.companyid, locname: this.selobj.locname, branchrefid:this.selobj.branchid };

      setTimeout(() => {
      this.userService.viewStkNewQtyAll(JSON.stringify(frmdata1)).subscribe(data => { this.data = data },
        errorCode => console.log(errorCode));

        this.gifFail=false;
      },3000);
    }

  }


}