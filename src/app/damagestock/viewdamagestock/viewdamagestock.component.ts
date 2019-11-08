import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { providers } from 'ng2-toasty';
import { DamagestockService } from '../damagestock.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-viewdamagestock',
  templateUrl: './viewdamagestock.component.html',
  providers: [DamagestockService]
})

export class viewDamageComponent implements OnInit {
  @Input() searchText;
  data: Array<any>;
  eid: any;
  number;
  gifFail: boolean=true;

  constructor(private viewdama: DamagestockService, private router: Router) {
    this.data = new Array<any>();
  }
  
  ngOnInit() {

    setTimeout(() => {
    this.viewdama.viewDamage(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.data = data },
      error => {
        console.log('Error ocuured On viewDamage()');
      });
      this.gifFail=false;
    },3000);
  }

  /* EDIT PURCHASE INVOICE */
  editDamage(id: any)//Error Method
  {
    this.eid = id;
    this.router.navigate(['/DamageStock/editdamagestock'], { queryParams: this.eid, skipLocationChange: true });
  }

  /* DELETE PURCHASE INVOICE  */
  deletedamagestock(id: number) {
    var answer = confirm("Delete data?");
    if (answer) {
    this.viewdama.deletedamastock(id).subscribe(data =>
      error => {
        console.log('Error Occured  From DeleteDamage')
      });
    this.ngOnInit();
    }
  }

  viewhq(): void {
    this.router.navigate(['/DamageStock/viewhq']);
  }
}








































