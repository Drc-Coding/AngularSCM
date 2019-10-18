import { DataStocks } from '../stocks.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from 'app/app.component';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  providers: [NotificationsComponent]
})
export class ViewstocksComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public sortBy: string = "";
  public sortOrder: string = "desc";

  stockForm: FormGroup;
  bindvalue: any;
  @Input() filterQuery;
  drugsearch=true;
  formsearch= false;
  gifFail = true;
  indx: any;

  
  constructor(private service: DataStocks, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) { 

    this.stockForm = this.formBuilder.group({

      drugsearch:[,[]],
      formsearch:[,[]]
    });

  }

  ngOnInit() {

   
    this.stockForm.get('drugsearch').setValue(true);
    this.indx=0;

    //alert(AppComponent.distributorid);
    if (AppComponent.shopID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {this.data = data} , err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);

    } if (AppComponent.warehouseID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);
    } if (AppComponent.hospitalID != 0) {
      setTimeout(() => {
      this.service.viewStock(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.data = data, err => {
        console.log("Error occured on viewStock()");
      });
      this.gifFail = false;
    },2000);
  }
  }

  deleteStock(id: any) {
    if (confirm('Are You sure Want to delete Stock')) {
      this.service.deleteStocks(id).subscribe(data => {
        if (data == 1) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Stock Deleted Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.ngOnInit();
        }
      });
    }
  }

  check(event, id: number) {

    if (event.target.checked) {
      
    if (id == 0) {
      this.stockForm.get('formsearch').setValue(false);
      this.drugsearch=true;
      this.formsearch=false;
      this.indx=0;
      this.filterQuery ="";
    }

    else if( id == 1) {
      this.stockForm.get('drugsearch').setValue(false);
      this.formsearch=true;
      this.drugsearch=false;
      this.indx=2;
      this.filterQuery ="";
    }

  }
    

  }


  
  getvalue(getval : any) {

    this.bindvalue = getval.textContent;
    this.filterQuery =this.bindvalue;
  
    }

    
}
