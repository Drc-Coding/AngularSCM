import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import 'rxjs/add/operator/filter';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';

import swal from 'sweetalert2';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppComponent } from '../../app.component';
import { adminService } from './admin-layout.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
declare var require:any;

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [adminService],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})

export class AdminLayoutComponent implements OnInit {
  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle = 'out';
  chatInnerToggle = 'off';
  innerHeight: string;
  isScrolled = false;
  isCollapsedMobile = 'no-block';
  toggleOn = true;
  windowWidth: number;
 
  menu: any;
  myNewList: any; item;
  modLabel = [];
  shop = [];
  //notification
  message: any;
  module: any;
  date: any;
  noMessage: any;
  public messageCondition: boolean = false;
  public errormessageCondition: boolean = false;

  public showNav = true;
  showDialog:boolean = false;
  @Input() visible: boolean;
  
  userinfo:FormGroup;
  edituserinfo:FormGroup;
  imgURL: any= "assets/images/user.png" ;
  ip: any;

  @ViewChild('searchFriends') search_friends: ElementRef;
  @ViewChild('toggleButton') toggle_button: ElementRef;
  @ViewChild('sideMenu') side_menu: ElementRef;

  username: any;
  empid: any;
  empcode: any;
  gender: any;
  dob: any;
  address: any;
  state: any;
  mobno: any;
  mailid: any;
  getevent: any;
  
  
  constructor(public menuItems: MenuItems, private http: Http, private router: Router, private app: AppComponent,
    private formBuilder: FormBuilder,  private adservice: adminService,private sanitizer: DomSanitizer) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
    this.username = sessionStorage.getItem("sessionID");
    this.menu = JSON.parse(sessionStorage.getItem("user"));
    this.item = this.menu[1];
    console.log(this.menu[1]);
    this.myNewList = Array.from(new Set(this.menu));
    console.log(this.myNewList);



    //Edit user info


    this.edituserinfo = this.formBuilder.group({

      id:['',[]],
      clientmdate:['',[]],
      empaddress1: ['', []],
      mobileno: ['', []],
      email: ['', []],

    });

  }

  ngOnInit() {

    //Get Value from APP Component(Another compont)

        //this.app.ipAddress (or) this.app.getIP();
  
    this.menu = JSON.parse(sessionStorage.getItem("user"));
    this.modLabel = JSON.parse(sessionStorage.getItem("moduleLabel"));
    this.messageCondition = false;
    this.app.getDecrypt();
    this.getIP();

    
    this.adservice.getShopName(AppComponent.locrefID1).subscribe(data => { this.shop = data[0][1] });//

    this.adservice.getuserinfo(AppComponent.userID).subscribe(data => {this.setuserdata(data),this.setuserdataedit(data)});
   
    this.adservice.receiveimage(AppComponent.userID).subscribe(data => { this.viewimage(data) });
   
  }

  getIP()
  {
    this.adservice.getIPAddress().subscribe(data=>{
        this.ip=JSON.stringify(data);
  });
  }

   private readonly imageType: any = 'data:image/*;base64,';
 
   viewimage(data){

    this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)
    
   }

   setuserdata(data: any){
    this.username=data[0][0];
    this.empcode=data[0][1];
    this.gender=data[0][2];
    this.dob=data[0][3];
    this.address=data[0][4];
    this.state=data[0][5];
    this.mobno=data[0][6];
    this.mailid=data[0][7];
   }


   setuserdataedit(data: any){
    this.empid=data[0][8];
    this.edituserinfo.get('empaddress1').setValue(data[0][4]);
    this.edituserinfo.get('mobileno').setValue(data[0][6]);
    this.edituserinfo.get('email').setValue(data[0][7]);
   }

  

   editinfo(){
 
    this.edituserinfo.get('clientmdate').setValue(AppComponent.date);
    this.edituserinfo.get('id').setValue(this.empid);
    this.adservice.updateinfo(this.edituserinfo.value).subscribe((data: any )=> {  
        let re = data.res;  
      
      if(re==true){
       
        this.opensuccessSwal();
        this.adservice.getuserinfo(AppComponent.userID).subscribe(data => {this.setuserdata(data),this.setuserdataedit(data)});
      
      }
      else{
        this.openerrorSwal();
      }
    errorCode => console.log(errorCode);
   })
  }


  opensuccessSwal() {
    swal({
      title: "Information Updated Successfully!",
      text: "Click Ok",
      showConfirmButton: true
    }).then((openmodel) => {
      
  }).catch(swal.noop);
  }

  openerrorSwal() {
    swal({
      title: "Update Failed!",
      text: "Click Ok",
      showConfirmButton: true
    }).then((openmodel) => {
      
  }).catch(swal.noop);
  }

  openConfirmsSwal() {
    swal({
      title: 'Are you sure you want to Logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(function () {
     
      window.location.href='userlogin/login';
      
    }).catch(swal.noop);
  }


  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }
  onClicked3(e: Event) {  //selva
    if (this.windowWidth > 768 && this.toggleOn && this.verticalNavType !== 'collapsed') {

      this.toggleOn = true;
      this.verticalNavType = 'collapsed';
    }
  }


  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    this.setMenuAttributs(this.windowWidth);
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'collapsed';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  searchFriendList(event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function (elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
    }
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onScroll(event) {
    this.isScrolled = false;
  }
  goBack(): void {

    //sessionStorage.clear();
    // window.location.replace('userlogin/login');
    sessionStorage.clear();
    this.router.navigate(['userlogin/login']);
  }

  logout() {
    if (confirm("Are You Sure you Want to Logout!?")) {
      sessionStorage.clear();
      localStorage.removeItem("u1s2e3r4");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("moduleLabel");
      this.router.navigate(['userlogin/login']);
    }
  }
  getNotification() {
    let notification = JSON.parse(localStorage.getItem("Sucess-Notify"));
    if (notification == '' || notification == null) {
      this.noMessage = "No Notifications";
      this.errormessageCondition = true;
      this.messageCondition = false;
    }
    else {
      this.messageCondition = true;
      this.module = notification[0];
      this.message = notification[1];
      this.date = notification[2];
      this.errormessageCondition = false;
    }
    setTimeout(() => {
      localStorage.removeItem("Sucess-Notify");
      this.messageCondition = false;
    }, 5000);
  }

  clickinsidemenu() {
    if (this.verticalNavType != "expanded") {
      this.verticalNavType = "expanded";
      //selva
    }

  }


  // openBasicModal(event) {
  //   this.showDialog = !this.showDialog;
  //   setTimeout(()=> {
  //     document.querySelector("#"+event).classList.add('md-show');
  //   }, 25);
  // }

  // closeBasicModal(event) {

  //   ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  //   setTimeout(() => {
  //     this.visible = false;
  //     this.showDialog = !this.showDialog;
  //   }, 300);
  // }

}
