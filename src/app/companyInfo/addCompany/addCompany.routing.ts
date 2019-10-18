import {Routes} from '@angular/router';
import {AddcompanyComponent} from "./addCompany.component";

export const AddcompanyRoutes: Routes = [{
  path: '',
  component: AddcompanyComponent,
  data: {
    breadcrumb: "Company Information"
  }
}];
