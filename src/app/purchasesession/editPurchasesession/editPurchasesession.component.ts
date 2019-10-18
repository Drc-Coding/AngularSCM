import {Component, OnInit,Input,Output,AfterViewInit,ViewChild,ElementRef,ViewChildren, QueryList } from '@angular/core';
import {FormBuilder, FormControl, Validators,FormArray} from "@angular/forms";
import {editInvoicesessionService} from './editPurchasesession.services';
import {providers} from 'ng2-toasty';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';

import { error } from 'util';
import { DxDataGridComponent } from "devextreme-angular";
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers='^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-editPurchasesession',
  templateUrl: './editPurchasesession.component.html',
  styleUrls: ['./editPurchasesession.component.css'],
  providers: [editInvoicesessionService]
}) 

export class editInvoicesessionComponent implements OnInit {
  purchaseSession : any;
  sid:string;
  constructor(private invoiceService: editInvoicesessionService, private route: ActivatedRoute,private formBuilder: FormBuilder,private router: Router) {
    this.purchaseSession=this.formBuilder.group({
     
    });
  }

  ngOnInit() {
    this.sid = this.route.snapshot.paramMap.get('id');
    
  }
 
   
}

