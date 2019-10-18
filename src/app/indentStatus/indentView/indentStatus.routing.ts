import {Routes} from '@angular/router';
import {indentStatusViewComponent} from './indentStatus.component';
export const viewEmployeeRoutes: Routes = [{
  path: '',
  component:indentStatusViewComponent,
  data: {
    breadcrumb: 'INDENT STATUS'
  }
}];
