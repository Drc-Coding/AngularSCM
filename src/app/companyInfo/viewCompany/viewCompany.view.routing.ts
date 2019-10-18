import {Routes} from '@angular/router';
import {viewcompanyComponent} from './viewCompany.view.component';
export const companyviewRoutes: Routes = [{
  path: '',
  component: viewcompanyComponent,
  data: {
    breadcrumb: "View CompanyInfo",
    status: true
  }
}];
