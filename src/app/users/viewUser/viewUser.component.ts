import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewsUser',
  templateUrl: './viewUser.component.html',
  providers: [NotificationsComponent]
})
export class userView implements OnInit {
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private service: UsersService, private notificationsComponent: NotificationsComponent, private rout: Router) { }

  ngOnInit() {
    this.service.viewUser().subscribe(data => this.data = data, err => {
      console.log("Error occured on viewUser()");
    });
  }
  adduser() {
    this.rout.navigate(['User/AddUser']);
  }
}
