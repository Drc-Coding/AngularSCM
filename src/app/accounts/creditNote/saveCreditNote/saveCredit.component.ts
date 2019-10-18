
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {saveCreditService} from  './saveCredit.service'


@Component({
  selector: 'app-saveCredit',
  templateUrl: './saveCredit.component.html',
  providers: [saveCreditService]
 
})
export class saveCreditComponent     {


 

}