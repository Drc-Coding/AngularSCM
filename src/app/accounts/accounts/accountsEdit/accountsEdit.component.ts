
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';



@Component({
  selector: 'app-accountsEdit',
  templateUrl: './accountsEdit.component.html',
 
})
export class accountsEditComponent implements OnInit {

  selobj;


  constructor() {}

  ngOnInit() {


    this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;

  }



}