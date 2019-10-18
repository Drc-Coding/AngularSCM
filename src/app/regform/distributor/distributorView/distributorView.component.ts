
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {DistributorViewService}  from  './distributorView.service'
import {Router, ActivatedRoute} from '@angular/router';
import 'jquery';
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-patientview',
  templateUrl: './distributorView.component.html',
  providers: [DistributorViewService]
})
export class DistributorViewComponent implements OnInit {



   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  testArray2 = [];



  statusCode: number;

  selobj ;

  testArray = [{id: 1, name: 'Test 1'}, {id: 2, name: 'Test 2'}, {id: 3, name: 'Test 3'}];


  constructor(private userService: DistributorViewService) {

  }

  ngOnInit() {


      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

   
    this.viewAll() ;


  }







  deleteArticle(articleId: number) {

    var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.patientDelete(JSON.stringify(frmdata)).subscribe(data => console.log(JSON.stringify(data)),
      errorCode => console.log(errorCode));


  }

  viewAll() {

    var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.patientView(JSON.stringify(frmdata)).subscribe(data => this.data = data,
      errorCode => console.log(errorCode));



  }






}
