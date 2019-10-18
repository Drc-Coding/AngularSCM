

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from '../../../app.component';


import {viewDistProdService} from './viewDistProd.service';


@Component({
  selector: 'app-patientedit',
  templateUrl: './viewDistProd.component.html',
  providers: [viewDistProdService,NgbDropdownConfig]

})
export class viewDistProdComponent {




   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  

    datall = [];
  
  selobj ;


    constructor(private userService: viewDistProdService) {}
  
    ngOnInit() {

      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

    
      this.myFunc() ;
  
    }
  
    
  
  
      myFunc() {
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewDistProdAll(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));
  
  
   
    }

}
