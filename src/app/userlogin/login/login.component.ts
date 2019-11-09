import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserloginService } from '../userlogin.service';
import { User } from '../user';

import * as $ from 'jquery';

import { AppComponent } from '../../app.component';


//Encrypt
import * as CryptoJS from 'crypto-js';
var key = CryptoJS.enc.Utf8.parse('7061737323313233');
var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loader:boolean = false;

  loginForm: FormGroup;
  user = new User;
  login: any;
  username: any;
  pass: any;
  companyName: any;
  counter: any;
  timer: any;
  reFlag: boolean = false;
  i;
  modLabel: any = [];
  companylist = [];
  firstString: any;
  secondString: any;
  chooseSection: any;
  constructor(private loginService: UserloginService, private router: Router, private fb: FormBuilder) {
    const username = new FormControl();
    const password = new FormControl();
    const companyid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();


    this.loginForm = new FormGroup({
      clientcdate: clientcdate,
      createdby: createdby,
      username: username,
      password: password,
      companyid: companyid
    });
    this.chooseSection = this.fb.group({
      companyid: ['', []],
      userid: ['', []],
      branchid: ['', []],
      shopid: ['', []],
      hospitalid: ['', []],
      warehouseid: ['', []],
      distributorid: ['', []],
      usertype: ['', []]
    });
  }

  ngOnInit() {
    this.loginForm.get('companyid').setValue("opt1");
    this.loginService.getComplist().subscribe(data => this.companylist = data,
      err => {
        console.log('error on companylist()');
      });
    sessionStorage.clear();
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("moduleLabel");
    localStorage.removeItem("u1s2e3r4");
    this.firstString = Math.random().toString(36).slice(-2);
    this.secondString = Math.random().toString(36).slice(-2);
    //************************ */
    this.chooseSection.get('branchid').setValue("0");
    this.chooseSection.get('shopid').setValue("0");
    this.chooseSection.get('hospitalid').setValue("0");
    this.chooseSection.get('warehouseid').setValue("0");


  }

  userid: any;
  usertype: any;
  password: any;
  distributorid: any;




  onSubmit() {
    this.reFlag = this.loginValidation();
    if (this.reFlag == true) {


      this.loader = true;
      this.username = this.loginForm.get('username').value;
      this.pass = this.loginForm.get('password').value;
      this.companyName = this.loginForm.get('companyid').value;
      this.password = this.firstString + '_' + this.pass + '_' + this.secondString;
      this.loginService.isExists(this.username, this.password, this.companyName).subscribe(data => {
        if (data == '' || data == null || data == undefined) {
          alert('Invalid userName and Password');

          this.loader = false;
        }
        else {

          this.loader = true;
          
          this.userid = data[0][0];
          this.usertype = data[0][1];
          this.distributorid = data[0][2];
          //alert(this.userid);
          //alert(this.usertype);
          this.getBranch();
          this.openMyModal('effect-1');

        }
      },
        err => {
          console.log('Error occured On startLogin()');
        });
    }
  }
  getLogin() {
    this.loginService.getlogin(this.username, this.password, this.companyName).subscribe(
      data => {
        this.login = data;
        this.loginService.getmoduleLabel(this.username, this.password, this.companyName).subscribe(
          data => {
            this.modLabel = data;
            sessionStorage.setItem("user", JSON.stringify(this.login));
            sessionStorage.setItem("moduleLabel", JSON.stringify(this.modLabel));
            this.router.navigate(['dashboard']);
          },
          err => {
            console.log("Error occured On moduleLabel");
          }
        );
      },
      err => {
        console.log("Error occured On getlogin()")
      });
  }
  loginValidation(): boolean {
    this.username = this.loginForm.get('username').value;
    this.pass = this.loginForm.get('password').value;
    let comp = this.loginForm.get('companyid').value;
    if (comp == "opt1" || comp == null) {
      alert('Company Name Must not be Empty');
      return false;
    }
    if (this.username == "" || this.username == null) {
      alert('username Must not be Empty');
      return false;
    }
    if (this.pass == "" || this.pass == null) {
      alert('Password Must not be Empty');
      return false;
    }
    return true;
  }
  userbranch = [];
  userHospital = [];
  userShop = [];
  userWarehouse = [];
  
  openMyModal(event) {
    document.querySelector("#" + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  getBranch() {
    this.loginService.getBranch(this.loginForm.get('companyid').value, this.userid).subscribe(data => this.userbranch = data, err => {
      console.log('Error occured On getBranch()');
    })
  }
  getBranchWise() {
    let cid: any = this.loginForm.get('companyid').value;
    let bid: any = this.chooseSection.get('branchid').value;
    this.loginService.getShop(cid, bid, this.userid).subscribe(data => this.userShop = data, err => {
      console.log('Error occured On getShop()');
    });

    this.loginService.getHospital(cid, bid, this.userid).subscribe(data => this.userHospital = data, err => {
      console.log('Error occured On getHospital()');
    });

    this.loginService.getWarehouse(cid, bid, this.userid).subscribe(data => this.userWarehouse = data, err => {
      console.log('Error occured On getWarehouse()');
    });
  }
  public flag: boolean = false;
  encrypted: any;
  chooseModel() {
    this.flag = this.chooseValidation();
    if (this.flag == true) {
      this.chooseSection.get('companyid').setValue(this.companyName);
      this.chooseSection.get('userid').setValue(this.userid.toString());
      this.chooseSection.get('distributorid').setValue(this.distributorid.toString());
      this.chooseSection.get('usertype').setValue(this.usertype.toString());


      this.loginService.getLocalStore(JSON.stringify(this.chooseSection.value)).subscribe(data => {
        if (data !== null || data !== '') {
          this.encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(data)), key,
            {
              keySize: 128 / 8,
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            });
          localStorage.setItem("u1s2e3r4", this.encrypted);
          this.getLogin();
        }
      });
    }
  }
















  chooseValidation(): boolean {
    if (this.chooseSection.get('branchid').value == "0" || this.chooseSection.get('branchid').value == null) {
      alert('Branch Name Must not be Empty');
      return false;
    }
    if (this.chooseSection.get('shopid').value == '0' && this.chooseSection.get('hospitalid').value == '0' && this.chooseSection.get('warehouseid').value == '0') {
      alert('Choose One');
      return false;
    }

    if (this.chooseSection.get('shopid').value !== '0' && this.chooseSection.get('hospitalid').value !== '0') {
      alert('Choose only One');
      return false;
    }
    if (this.chooseSection.get('warehouseid').value !== '0' && this.chooseSection.get('hospitalid').value !== '0') {
      alert('Choose only Two');
      return false;
    }
    if (this.chooseSection.get('warehouseid').value !== '0' && this.chooseSection.get('shopid').value !== '0') {
      alert('Choose only Three');
      return false;
    }
    return true;
  }
}