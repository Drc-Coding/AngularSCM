import { DoctorService } from '../doctor.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'viewDoctor',
  templateUrl: './viewDoctor.component.html',
  styleUrls: ['./viewDoctor.component.css'],
  providers: [NotificationsComponent]
})
export class DoctorlistComponent implements OnInit {

  
 // @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;


  public data: any;
  public rowsOnPage: number = 20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  gifFail: boolean=true;
  constructor(private router: Router, private doctorService: DoctorService, private notificationsComponent: NotificationsComponent) { }

  
  ngOnInit(): void {
    setTimeout(() => {
    this.doctorService.viewDoctor(AppComponent.companyID, AppComponent.branchID).subscribe(data => this.data = data,
      err => {
        console.log('Error Occured On view Doctor()');
      });
      this.gifFail=false;
    },3000);
  }


  public scrollRight(): void {
    document.querySelector('div.middle').scrollLeft += 150;
   // alert(get);
    //get.nativeElement.scrollBy({ left: (get.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(get): void {
    document.querySelector('div.middle').scrollLeft -= 150;
    //get.nativeElement.scrollBy({ left: (get.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  deleteDoctor(id: any) {
         
    var answer = confirm("Delete data?");
    if (answer) {
    this.doctorService.deleteDoctor(id).subscribe(data => {
      if (data == 1) {
        this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA DELETED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
      else {
        this.ngOnInit();
      }
    });
  }
}

}
