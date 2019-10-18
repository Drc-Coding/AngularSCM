
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {accountsViewService} from './accountsView.service';

@Component({
  selector: 'app-patientedit',
  templateUrl: './accountsView.component.html',
  providers: [accountsViewService]

 
})
export class accountsViewComponent implements OnInit {



    dataall = []; 
  
    selobj ;
    constructor(private userService: accountsViewService) {}
  
    ngOnInit() {
  
  
      this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;
      this.viewAll() ;
  
    }
  
  
  
     viewAll() {
  
      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewAll(JSON.stringify(frmdata)).subscribe(data => this.dataall = data,
        errorCode => console.log(errorCode));
  
    }
  

}