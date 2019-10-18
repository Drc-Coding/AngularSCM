import {Routes} from '@angular/router';
import {drugComponent} from "./drugmaster.component";
import {adddrugComponent} from './addDrugmaster/addDrugmaster.component';
import {viewdrugComponent} from './viewDrugmaster/viewDrugmaster.component';
import {editdrugComponent} from './editDrugmaster/editDrugmaster.component';
import {drugpicturesComponent} from './drugPictures/drugPictures.component';


export const drugRoutes: Routes = [
  {
    path: 'editDrugmaster/:drugid', component: editdrugComponent,
    data: {
      breadcrumb: 'Drugmaster'
    }
  },
  {
    path: 'viewDrugmaster', component: viewdrugComponent,
    data: {
      breadcrumb: 'view Drugmaster'
    }

  },

  {
    path: 'drugPictures/:id', component: drugpicturesComponent,
    data: {
      breadcrumb: 'Drug Picture'
    }
  },

  {
    path: '',
    children: [
      {
        path: 'AddNewProduct',
        component: adddrugComponent,
        data: {
          breadcrumb: 'Product Master'
        }
      }, {
        path: 'ViewProductList',
        component: viewdrugComponent,
        data: {
          breadcrumb: 'View Product Master'
        }
      }
    ]
  }];
