
import { DataHospitalform } from '../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'viewHospital',
  templateUrl: './viewHospital.component.html',
  providers: [NotificationsComponent]
})
export class viewHospitalComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private dataService: DataHospitalform, private notificationsComponent: NotificationsComponent) { }

  ngOnInit(): void {
    this.dataService.gethospitals(AppComponent.companyID, AppComponent.branchID).then(data => { this.data = data },
      err => {
        console.log('Error Occured on gethospitals()');
      });
  }

  deleteHospital(id: any) {
    this.dataService.deleteHospital(id).subscribe(data => {
      if (data == 1) {
        this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA DELETED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
        
      }
      err => {
        console.log('Error Occured on deleteHospital()');
      }
    });
  }

}
