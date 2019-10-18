import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItems } from 'app/shared/menu-items/menu-items';
import { Router } from '@angular/router';



@Component({
  selector: 'userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  
  username: any;
  moduleid: any;
  submoduleid: any;
  login: any; i; j;
 
 constructor(private _route:ActivatedRoute, public menuItems: MenuItems, private router: Router){


  this.username=sessionStorage.getItem("sessionID");

  //this.login =sessionStorage.getItem("user");

  this.login = JSON.parse(sessionStorage.getItem("user"));

  for(let cus of this.login){

    this.i = console.log(cus[0]);
  }

  console.log(this.username);
  console.log(this.login);

  
 }


ngOnInit() {
 
  //   this._route.params.subscribe(params => {
  
  //   this.username = params['login']
   
  // }); 
}
}
