import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'app/app.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsertaskModule } from './usertask.module';

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.css']
})
export class UsertaskComponent implements OnInit {
 



  usertaskForm: FormGroup;



  constructor() { }
  
  


ngOnInit() {

  this.usertaskForm.get('companyrefid').setValue(AppComponent.companyID);
  this.usertaskForm.get('branchrefid').setValue(AppComponent.branchID);
  this.usertaskForm.get('locname').setValue(AppComponent.locrefID);
  this.usertaskForm.get('locrefid').setValue(AppComponent.shopID);   

  const companyrefid = new FormControl();
  //const samplename = new FormControl('', Validators.required);
  const branchrefid = new FormControl();
  const locname = new FormControl();
  const locrefid = new FormControl();

  this.usertaskForm = new FormGroup({

    companyrefid: companyrefid,
  
    branchrefid: branchrefid,
    locname: locname,
    locrefid: locrefid

   
  });

}
}