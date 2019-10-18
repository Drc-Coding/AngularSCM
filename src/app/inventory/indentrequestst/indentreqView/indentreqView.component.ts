
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {indentreqViewService} from './indentreqView.service'  ;
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-patientedit',
  templateUrl: './indentreqView.component.html',
  providers: [indentreqViewService]
})
export class indentreqViewComponent implements OnInit {




  pharmacomp = [];
  
  selobj ;
    constructor(private userService: indentreqViewService) {}
  
    ngOnInit() {
  
  
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      //this.selobj  = {   userid  :currentUser.userid , locrefid  :currentUser.locrefid , locname  :currentUser.locname    , companyid  :currentUser.companyid   }  ;
    
      
             this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID , locname  :1    , companyid  :AppComponent.companyID   }  ;
      this.viewAll() ;
  
    }
  
  
  
      viewAll() {
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.phcompanyView(JSON.stringify(frmdata)).subscribe(data => this.pharmacomp = data,
        errorCode => console.log(errorCode));

      }



}