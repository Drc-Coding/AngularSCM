import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { viewInvoicesessionService } from './viewPurchasesession.services';
import { Router } from '@angular/router';
import '../../../assets/echart/echarts-all.js';
import { AppComponent } from '../../app.component';
/*
@Author AJith Kumar
 */
@Component({
  selector: 'app-viewPurchasesession',
  templateUrl: './viewPurchasesession.component.html',
  providers: [viewInvoicesessionService]
})

export class viewInvoicesessionComponent implements OnInit {
  @Input() searchText;
  data: Array<any>;
  sessiondetails = [];
  ChartOption: any = [];
  constructor(private viewsessionPurc: viewInvoicesessionService, private router: Router) {
    this.data = new Array<any>();
  }
  ngOnInit() {
    if (AppComponent.shopID != 0) {
      this.viewsessionPurc.viewsessionPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.shopID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewsessionPurchase()');
        }
      );
    }
    if (AppComponent.hospitalID != 0) {
      this.viewsessionPurc.viewsessionPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.hospitalID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewsessionPurchase()');
        }
      );
    }
    if (AppComponent.warehouseID != 0) {
      this.viewsessionPurc.viewsessionPurchase(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID, AppComponent.warehouseID).subscribe(data => { this.data = data },
        error => {
          console.log('Error ocuured On viewsessionPurchase()');
        }
      );
    }

    this.viewsessionPurc.viewChart().subscribe(data => { this.ChartOption = data; },
      error => {
        console.log('Error ocuured On viewChart()');
      }
    );

  }
  openMyModal(event, id: any) {
    this.viewsessionPurc.viewSessionDetails(id).subscribe(data => {
      this.sessiondetails = data;
      if (data != null) {
        document.querySelector("#" + event).classList.add('md-show');
      }
      else {
        alert('Data Not Avilable..');
      }
    },
      err => {
        console.log("Error Occured On viewSessionDetails()");
      }
    );

  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


  public piechart = false;
  type4; data4;
  showChart() {
    this.piechart = true;
    let tot: any = this.ChartOption[0][0];
    let pen: any = this.ChartOption[0][1];
    let clo: any = this.ChartOption[0][2];
    this.type4 = 'pie';
    this.data4 = {
      labels: [
        'pending',
        'close',
        'Total Session'
      ],
      datasets: [{
        data: [pen, clo, tot],
        backgroundColor: [
          '#ffbf00',
          '#ff1a1a',
          '#01C0C8'
        ],
        hoverBackgroundColor: [
          '#ffbf00',
          '#ff1a1a',
          '#0dedf7'
        ]
      }]
    };
  }
}

/* <div class="col-md-12 col-lg-4" *ngIf="piechart">
<app-card>
    <h2>Purchase Session</h2>
    <chart [type]="type4" [data]="data4"></chart>
</app-card>
</div> 

 <input type="submit" class="btn btn-success btn-round button" (click)="showChart()" value="Show Chart" style="right: 50px; position: absolute;margin: 10px;">


*/