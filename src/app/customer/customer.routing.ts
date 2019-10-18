import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersComponent } from './customers/customers.component';
import { SearchCustomersComponent } from './search-customers/search-customers.component';
import { Routes } from '@angular/router';
export const CustomerRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Form Components',
            status: false
        },
        children: [
            {
                path: 'create-customer',
                component: CreateCustomerComponent,
                data: {
                    breadcrumb: 'Form Components',
                    status: true
                }
            }, {
                path: 'customer-details',
                component: CustomerDetailsComponent,
                data: {
                    breadcrumb: 'Form Elements Add-On',
                    status: true
                }
            }, {
                path: 'customers',
                component: CustomersComponent,
                data: {
                    breadcrumb: 'Form Elements Advance',
                    status: true
                }
            }, {
                path: 'search-customers',
                component: SearchCustomersComponent,
                data: {
                    breadcrumb: 'Form Validation',
                    status: true
                }
          }]}]
