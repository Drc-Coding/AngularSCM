import { Component, OnInit } from '@angular/core';
import { SalesorderleadService } from '../salesorderlead.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
import { NotificationsComponent } from '../../notifications/notifications.component';
import swal from 'sweetalert2';
declare var require: any;

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
  products: any;
  constructor(private solead: SalesorderleadService, private fb: FormBuilder, private route: ActivatedRoute, private datepipe: dateFormatPipe, private notificationsComponent: NotificationsComponent, private router: Router) {
    this.salesorderlead = this.fb.group({
      patientid: ['', []],
      contactno: ['', []],
      sotype: ['', []],
      deliverytype: ['', []],
      soonlineno: ['', []],
      orderdate: ['', []],
      productid: ['', []],
      quantity: ['', []],
      salesorderno: ['', []],
      salesstatus: [1, []],
      totalitem: ['', []],
      employeeid: [AppComponent.userID, []],
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      sodetails: this.fb.array([]),
      stockdetails: this.fb.array([])
    })
  }
  mac: any;

  ngOnInit() {


    this.id = this.route.snapshot.paramMap.get('id');
    // var MacAddress =require('get-mac-address');
    // this.mac = MacAddress
    //alert(MacAddress)
    //var macaddress = require('macaddress');

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
    this.solead.fetchsoleadrecord(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => this.fetchsoleadproduct(data),
      error => console.log('Error occurs in fetchsoleadrecord()'));

    this.solead.autoIcrement(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => {
      this.salesorderlead.get('salesorderno').setValue(data.toString())
    });
    //this.getMac();
  }
  getMac(){
  //   require('getmac').getMac(function(err, macAddress){
  //     if (err)  throw err
  //     console.log(macAddress)
  //     alert("mac"+macAddress);
  // })

  }
  getProvalues() {
    this.solead.getprpductvalues(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.salesorderlead.get('productid').value, this.salesorderlead.get('quantity').value).subscribe(
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
    const getData = <FormArray>this.salesorderlead.controls['sodetails'];
    let setData = getData.value;
    if (data !== undefined || data !== null) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.fetchproduct(
          data[p][0],
          data[p][1],
          data[p][2],
          data[p][3],
          data[p][4],
          data[p][5],
          data[p][6]
        ))

      }
    }
  }
  fetchproduct(pc: any, pn: any, dos: any, form: any, qty: any, currentqty: any, stockst: any) {
    return this.fb.group({

      drugproductid: pc,
      brandname: pn,
      dosagevalue: dos,
      formulationname: form,
      totalqty: qty,
      currentqty: currentqty,
      stockstatus: stockst,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0
     
    })
  }
  i;
  x;
  noproducts = [];
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
            data[this.i][3],
            data[this.i][4],
            data[this.i][5]
          ));
        }
        this.characters = [];
        this.salesorderlead.get('quantity').setValue('');
      }
      this.noproducts = setData.brandname;
      alert(this.noproducts);
    }

  }
  showBrandlist(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any) {
    return this.fb.group({
      drugproductid: a1,
      brandname: a2,
      formulationname: a3,
      dosagevalue: a4,
      formalationid: a5,
      stockstatus: a6,
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

  stockvalidation(): Boolean {
    const getData = <FormArray>this.salesorderlead.controls['sodetails'];
    let data: any = getData.value;
    let setData = getData.value;
    this.salesorderlead.get('totalitem').setValue(data.length);

    for (let p = 0; p < setData.length; p++) {
      alert(setData[p].stockstatus);
      if (setData[p].stockstatus == 2) {
        this.solead.getsolproducts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => { this.products = data });
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Insufficient Product Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        this.openBasicSwal();
        return false;
      }
      else if (setData[p].stockstatus == 1) {
        alert(setData[p].stockstatus)
        this.solead.getsolproducts(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => { this.products = data });
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Insufficient Product Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        this.openBasicSwal();
        return false;
      }

    }
    return true;
  }

  stockchecking() {
    this.solead.stockcheck(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.salesorderlead.get('productid').value).subscribe(
      data => {this.getstockdata(data) }
    )
  }

  getstockdata(data) {
    const getData = <FormArray>this.salesorderlead.controls['stockdetails'];
    if (data != null || data != undefined) {
      for (let p = 0; p < data.length; p++) {
        getData.push(this.showstockdata(
           data[p][0],
           data[p][1],
           data[p][2],
           data[p][3]
        ))
      }
    }
  }

  showstockdata(age: any, qty: any, shop: any,shopid:any) {
    return this.fb.group({
      ageingtime: age,
      qty: qty,
      shopname: shop,
      tolocrefid:shopid,
      tolocname:1,
      reqqty:0,
      fromlocname:AppComponent.locRefName1,
      fromlocrefid:AppComponent.locrefID1,
      clientcdate:AppComponent.date,
      drugprdrefid:this.salesorderlead.get('productid').value,
      checkbox: false,
      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
    })
  }


  savestockcheck(){
    const getData = <FormArray>this.salesorderlead.controls['stockdetails'];
    let data: any = getData.value;
    this.solead.savestocking(JSON.stringify(getData.value)).subscribe(
      data => {
        if(data == true){
          this.solead.saveprodstocking(JSON.stringify(getData.value)).subscribe()
        }
      }
    )
  }
  stvalid: any;
  onSubmit() {
    this.stvalid = this.stockvalidation()
    if (this.stvalid == true) {
      this.solead.savesaleslead(JSON.stringify(this.salesorderlead.value)).subscribe(
        data => {
          if (data == true) {
            const getData = this.salesorderlead.controls['sodetails'];
            // let setData = getData.value;

            this.solead.saveSaleleadRecord(JSON.stringify(getData.value)).subscribe(
              data => {
                if (data == true) {
                  
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


  }
  ngAfterViewInit() {
    //Panel Show and Hide 
    $(document).ready(function () {
      $("#flip").click(function () {
        $("#panel").slideToggle("slow");
      });
    });
  }
  openBasicSwal() {
    swal({
      title: "If You want add the Stock!",
      text: "Click Ok",
      showConfirmButton: true
    }).then((openmodel) => {
      //alert(openmodel)
      if (openmodel) {
        // alert(openmodel.value)
        // this.router.navigate(['SalesOrder/ViewSalesOrder']);
        //window.location.href ="ReorderForm/ReorderForm";
        this.openMyModal('effect-1');
      }
    }).catch(swal.noop);
  }


  openMyModal(event) {
    // alert("effect");
    document.querySelector("#" + event).classList.add('md-show');
  }


  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }


}
//  getMacAddress(){
//   var macAddress = "";
//   var ipAddress = "";
//   var computerName = "";
//   var wmi = GetObject("winmgmts:{impersonationLevel=impersonate}");
//   e = new Enumerator(wmi.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True"));
//   for(; !e.atEnd(); e.moveNext()) {
//       var s = e.item();
//       macAddress = s.MACAddress;
//       ipAddress = s.IPAddress(0);
//       computerName = s.DNSHostName;


// }
// function showMacAddress(){

// var obj = new ActiveXObject("WbemScripting.SWbemLocator");

// var s = obj.ConnectServer(".");

// var properties = s.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");

// var e = new Enumerator (properties);

// var output;
// }
