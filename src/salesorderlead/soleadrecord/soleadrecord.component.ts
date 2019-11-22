import { Component, OnInit } from '@angular/core';
import { SalesorderleadService } from '../salesorderlead.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-soleadrecord',
  templateUrl: './soleadrecord.component.html',
  
  providers: [SalesorderleadService]
})
export class SoleadrecordComponent implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  id: any;
  solRecord: any;
  constructor(private solead: SalesorderleadService, private routes: ActivatedRoute, private fb:FormBuilder) {
    this.solRecord = this.fb.group({
      customername:['',[]],
      orderdate:['',[]]
    })
   }

  ngOnInit() {
    this.id = this.routes.snapshot.paramMap.get('id');
    this.solead.getsoleadrecord(this.id).subscribe(data => 
      {
        this.data = data,
        this.solRecord.get('customername').setValue(data[0][4]),
        this.solRecord.get('orderdate').setValue(data[0][5])
      err => console.log("error occurs in getsoleadrecord()")
      });
  }
 
}
