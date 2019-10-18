
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {daybookViewService} from './daybookView.service'  ;
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

@Component({
  selector: 'app-daybookView',
  templateUrl: './daybookView.component.html',
 
  providers: [daybookViewService]
})
export class daybookViewComponent implements OnInit {



  
  
    constructor() {}
  
    ngOnInit() {
  
  
  
    }
  
  

  


}