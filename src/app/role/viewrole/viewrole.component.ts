import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewrole',
  templateUrl: './viewrole.component.html'
})
export class ViewroleComponent implements OnInit {
  public data = [];
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  constructor(private rollService: RoleService, private router: Router) { }


  ngOnInit(): void {
    this.rollService.getRole().subscribe(data => { this.data = data });
  }

  view(): void {
    this.router.navigate(['Role/AddRole'], { skipLocationChange: true });
  }

  assignRole(id: any) {
    this.router.navigate(['Role/assingModule', id], { skipLocationChange: true });
  }
  assignRoleDetails(id: any) {
    this.router.navigate(['Role/viewassignRole'], { queryParams: { roleID: id }, skipLocationChange: true });
  }

  addRole() {
    this.router.navigate(['Role/AddRole']);
  }
}
