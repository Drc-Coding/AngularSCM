import { Addmodule } from '../addmodule';
import { DataModules } from '../modules.service';
import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-moduleview',
  templateUrl: './moduleview.component.html',
 
})
export class ModuleviewComponent implements OnInit {
  public data: any; 
  public rowsOnPage: number =20;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
submodules: Addmodule[];
  selectedModules: Addmodule;
  updateModules: Addmodule;
  constructor(private datamodelService: DataModules , private router: Router  ) { }
getModules() {
     this.datamodelService.getModules().then(submodules => this.submodules = submodules);
  }

 ngOnInit(): void {
     this.getModules();
     this.getviewmodule();
  }

  onSelect(cust: Addmodule): void {
    this.selectedModules = cust;
  }
// view detali

  getviewmodule() {
   this.datamodelService.getviewmodule().then(data => this.data = data);
  }

  viewmod(): void {
    this.router.navigate(['Module/AddModule']);
   }
}
