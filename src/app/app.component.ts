import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { dateFormatPipe } from './notifications/notifications.datepipe';
import { AppService } from './app.service';
import { Ng2DeviceService } from 'ng2-device-detector';
//***decrypt***/
import * as CryptoJS from 'crypto-js';

var key = CryptoJS.enc.Utf8.parse('7061737323313233');
var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
@Component({
  selector: 'app-root',
  template: '<router-outlet><spinner></spinner></router-outlet>',
  providers: [AppService,dateFormatPipe]
})
export class AppComponent implements OnInit {

  menu = [];
  modLabel = [];
  static date: any;
  static userID: any;
  static companyID: any;
  static branchID: any;
  static shopID: any;
  static hospitalID: any;
  static warehouseID: any;
  static locrefID: any = '';
  static locRefName: any = '';
  static usertype: any = '';
  static distributorid: any = '';
  static locRefName1: any = '';
  static locrefID1: any = '';
  static countryID: any = '';

  //prasad
  static vatDispFlag: any = '';
  static BoxDispFlag: any = '';
  static StripDispFlag: any = '';
  static TabDispFlag: any = '';

  localList: any;
  ipAddress: any;
  deviceInfo: any=null;
  devicetype: any;
  browser: any;
  os: any;
  osversion: any;

  constructor(private router: Router, private dateformatPipe: dateFormatPipe,
    private appservice: AppService,private deviceService: Ng2DeviceService) { }
  
  ngOnInit() {
    this.menu = JSON.parse(sessionStorage.getItem("user"));
    this.modLabel = JSON.parse(sessionStorage.getItem("moduleLabel"));

    if (this.menu == undefined || this.menu == null || this.modLabel == undefined || this.modLabel == null) {
      this.router.navigate(['userlogin/login']);
    }
    let dates: any = new Date();
    AppComponent.date = this.dateformatPipe.transform(dates);
    this.getDecrypt();
    this.getIP();
    this.devicedetails();
  }

  getIP()
  {
    this.appservice.getIPAddress().subscribe(data=>{
      this.ipAddress=JSON.stringify(data.ip).replace(/^"|"$/g, '');
      
  });
  }


  devicedetails() {

    this.deviceInfo = this.deviceService.getDeviceInfo();
    
    this.browser=this.deviceInfo.browser;
    this.os=this.deviceInfo.os;
    this.osversion=this.deviceInfo.os_version;

    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    
    if(isMobile==true){
      this.devicetype="Mobile"
    }
      else if(isTablet==true){
        this.devicetype="Tablet"
      }

      else if(isDesktopDevice==true){
        this.devicetype="Desktop"
      }

      else{
        this.devicetype="Other Devices"
      }
    
  }

   
  getDecrypt(): any {
    let decrypted: any = localStorage.getItem("u1s2e3r4");
    var decry = CryptoJS.AES.decrypt(decrypted, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    this.localList = decry.toString(CryptoJS.enc.Utf8).split(",");
    AppComponent.userID = this.localList[0].replace('[', ' ');
    AppComponent.companyID = this.localList[1];
    AppComponent.branchID = this.localList[2];
    AppComponent.shopID = this.localList[3];
    AppComponent.hospitalID = this.localList[4];
    AppComponent.warehouseID = this.localList[5];
    AppComponent.locrefID = this.localList[6];
    AppComponent.locRefName = this.localList[7];
    AppComponent.distributorid = this.localList[8];
    AppComponent.usertype = this.localList[9].replace(']', ' ');
    AppComponent.countryID = 291;
    AppComponent.locRefName1 = AppComponent.locrefID;
    if (AppComponent.shopID != 0) {
      AppComponent.locrefID1=AppComponent.shopID;
    }
    if (AppComponent.warehouseID != 0) {
      AppComponent.locrefID1=AppComponent.warehouseID;
    }

    if (AppComponent.hospitalID != 0) {
      AppComponent.locrefID1=AppComponent.hospitalID;
    }

    //prasad
    AppComponent.vatDispFlag=0;
    AppComponent.BoxDispFlag=0;
    AppComponent.StripDispFlag=0;
    AppComponent.TabDispFlag=1;
  }

  getDate() {
    let dates: any = new Date();
    AppComponent.date = this.dateformatPipe.transform(dates);
  }
}