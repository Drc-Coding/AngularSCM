import {Routes} from '@angular/router';
import {indentStandViewComponent} from './indentStandView.component';
export const indentStandRoutes: Routes = [{
  path: '',
  component:indentStandViewComponent,
  data: {
    breadcrumb: 'INDENT STATUS'
  }
}];
