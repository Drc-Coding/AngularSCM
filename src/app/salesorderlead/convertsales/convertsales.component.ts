import { Component, OnInit } from '@angular/core';
import { SalesorderleadService } from '../salesorderlead.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { NotificationsComponent } from '../../notifications/notifications.component';

@Component({
  selector: 'app-convertsales',
  templateUrl: './convertsales.component.html',
  styleUrls: ['./convertsales.component.css'],
  providers: [SalesorderleadService]
})
export class ConvertsalesComponent implements OnInit {
  salesorderlead: FormGroup
  id: any;
  characters: any;
  patientlist: any;
  sotypes: any;
  deviceObj: any;
  
  constructor(private solead: SalesorderleadService, private fb: FormBuilder, private route: ActivatedRoute, 
    private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent,
     private router: Router, private appComponent: AppComponent ) {

    this.salesorderlead = this.fb.group({
      patientid: ['', []],
      contactno: ['', []],
      sotype: ['', []],
      deliverytype: ['', []],
      soonlineno: ['', []],
      orderdate: ['', []],
      productid: ['', []],
      quantity: ['', []],
      salesorderno:['',[]],
      salesstatus:[1,[]],
      totalitem:['',[]],
      employeeid:[AppComponent.userID,[]],
      companyrefid:[AppComponent.companyID,[]],
      branchrefid:[AppComponent.branchID,[]],
      locname:[AppComponent.locRefName1,[]],
      locrefid:[AppComponent.locrefID1,[]],
      sodetails: this.fb.array([]),
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.solead.fetchsaleslead(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => {
      this.getsalesleaddata(data),
        this.solead.patientList(this.id).subscribe(data => {
          this.patientlist = data,
            error => console.log("Errors occurs in patientlist()")
        }),
        this.solead.getsotype(this.id).subscribe(data => {
          this.sotypes = data,
            error => console.log("Errors occured in getsotype()")
        }),
        error => console.log('Errors occurs in fetchsaleslead()')
    });
    this.solead.fetchsoleadrecord(this.id).subscribe(data => this.fetchsoleadproduct(data),
      error => console.log('Error occurs in fetchsoleadrecord()'));

      this.solead.autoIcrement(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID1,AppComponent.locRefName1).subscribe(data => {
        this.salesorderlead.get('salesorderno').setValue(data.toString())
      });

  }


  getProvalues() {
    this.solead.getprpductvalues(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.salesorderlead.get('productid').value).subscribe(
      data => this.getTabledata(data),
      error => console.log("Errors occurs in getprpductvalues()")
    )
  }

  getsalesleaddata(data: any) {
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        this.salesorderlead.patchValue(this.fetchdata(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4],
          data[p][5]
        ));
      }
    }
  }

  fetchdata(cust: any, contact: any, type: any, dtype: any, onlineno: any, date: any) {
    return {
      patientid: cust,
      contactno: contact,
      sotype: type,
      deliverytype: dtype,
      soonlineno: onlineno,
      orderdate: date
    }
  }


  fetchsoleadproduct(data) {
    const getData = <FormArray>this.salesorderlead.controls['sodetails']
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.fetchproduct(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4]
        ))
      }
    }
  }


  fetchproduct(pc: any, pn: any, dos: any, form: any, qty: any) {
    return this.fb.group({

      drugproductid: pc,
      brandname: pn,
      dosagevalue: dos,
      formulationname: form,
      totalqty: qty,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0
    })
  }

  i;
  x;
  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.salesorderlead.controls['sodetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].drugproductid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3]
          ));
        }
        this.characters = [];
        this.salesorderlead.get('quantity').setValue('');
      }
    }
  }


  showBrandlist(a1: any, a2: any, a3: any, a4: any) {
    return this.fb.group({
      drugproductid: a1,
      brandname: a2,
      formulationname: a3,
      dosagevalue: a4,
      totalqty: this.salesorderlead.get('quantity').value,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0
    })
  }


  getProduct(val: string) {
    this.solead.getProductlist(val, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
      this.characters = [];
      for (let i = 0; i < data.length; i++) {
        this.characters.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }


  removeRow(index: number) {
    const getData = <FormArray>this.salesorderlead.controls['sodetails'];
    getData.removeAt(index);
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.ngOnInit();
    }
  }


  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}

  onSubmit() {
    this.openMyModal('effect-1');
    const getData = <FormArray>this.salesorderlead.controls['sodetails'];
    let data: any = getData.value
     this.salesorderlead.get('totalitem').setValue(data.length);
    this.solead.savesaleslead(JSON.stringify(this.salesorderlead.value)).subscribe(
      data => {
        if (data == true) {
          const getData = this.salesorderlead.controls['sodetails'];
          this.solead.saveSaleleadRecord(JSON.stringify(getData.value)).subscribe(
            data => {
              if (data == true) {


                this.devicedetails();           
                this.deviceObj.apiname="api/saveSalesorder";
                this.deviceObj.description="Converted SalesOrder";
               
                this.solead.devicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});
                
                this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                setTimeout(() => {
                  this.router.navigate(['SalesOrder/ViewSalesOrder']);
                }, 2000);
              }
              else {
                this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SalesOrder Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
              }
            },
            error => console.log("Error occurs in saveSaleleadRecord()"))
        }
      },
      error => console.log("Error occurs in savesaleslead()"))

     
  }

  

  openMyModal(event) {
    document.querySelector("#" + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  ngAfterViewInit(){
   //Panel Show and Hide 
   $(document).ready(function () {
    $("#flip").click(function () {
      $("#panel").slideToggle("slow");
    });
  });
}


}
