import {Component, OnInit,Input,Output,AfterViewInit,ViewChild,ElementRef,ViewChildren, QueryList } from '@angular/core';
import {FormBuilder, FormControl, Validators,FormArray} from "@angular/forms";
import {editpurchaseApprovalService} from './editpurchaseApproval.services';
import {providers} from 'ng2-toasty';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';

import { error } from 'util';
import { DxDataGridComponent } from "devextreme-angular";
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers='^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-editpurchaseApproval',
  templateUrl: './editpurchaseApproval.component.html',
  styleUrls: ['./editpurchaseApproval.component.css'],
  providers: [editpurchaseApprovalService]
}) 

export class editpurchaseApprovalComponent implements OnInit {
  purchaseSession : any;
  sid:string;
  constructor(private invoiceService: editpurchaseApprovalService, private route: ActivatedRoute,private formBuilder: FormBuilder,private router: Router) {
    this.purchaseSession=this.formBuilder.group({
     
    });
  }

  ngOnInit() {
    this.sid = this.route.snapshot.paramMap.get('id');
    
  }
 
   
}

