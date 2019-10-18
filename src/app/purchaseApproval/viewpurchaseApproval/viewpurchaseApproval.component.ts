import {Component, OnInit,Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {providers} from 'ng2-toasty';
import {viewpurchaseApprovalService} from './viewpurchaseApproval.services';
import {Router} from '@angular/router';
import '../../../assets/echart/echarts-all.js';
@Component({
  selector: 'app-viewpurchaseApproval',
  templateUrl: './viewpurchaseApproval.component.html',
  providers: [viewpurchaseApprovalService]
})
 
export class viewpurchaseApprovalComponent implements OnInit {
  @Input() searchText;
  data: Array<any>;
  sessiondetails=[];
  lineChartOption: any;
  constructor(private viewsessionPurc: viewpurchaseApprovalService, private router: Router) {
    this.data = new Array<any>();
  }  
  ngOnInit() {    
  }
  
}