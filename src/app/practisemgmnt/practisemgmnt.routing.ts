import { Routes } from "@angular/router";
import { PractisemgmntComponent } from "./practisemgmnt.component";
import { PractiseComponent } from "./practise/practise.component";
import { PrescriptionComponent } from "./prescription/prescription.component";
import { PrescriptionapprovalComponent } from "./prescriptionapproval/prescriptionapproval.component";
import { PrescriptionapproverComponent } from "./prescriptionapprover/prescriptionapprover.component";
import { ViewpresdigitalComponent } from "./viewpresdigital/viewpresdigital.component";



export const PractisemgmntRouting: Routes = [{
    path: '',
        data: {
            breadcrumb: 'Practise Management',
            Component: PractisemgmntComponent,
            status: false
        },

        children: [
            {
                 path: 'PractiseTaskAssign',
                 component: PractiseComponent,
                 data: {
                     breadcrumb: 'Practise Task Assign',
                     status: true
                 }
             }, 

             {
                path: 'PrescDigitalization',
                component: PrescriptionComponent,
                data: {
                    breadcrumb: 'Prescription Digitalization',
                    status: true
                }
            },
            {
                path: 'PrescChecking',
                component: PrescriptionapprovalComponent,
                data: {
                    breadcrumb: 'Prescription Checking',
                    status: true
                }
            },  {
                path: 'PrescApproval',
                component: PrescriptionapproverComponent,
                data: {
                    breadcrumb: 'Prescription Approval',
                    status: true
                }
            },
            {
                path: 'ViewPrescription',
                component: ViewpresdigitalComponent,
                data: {
                    breadcrumb: 'View Prescription',
                    status: true
                }
            }

        ]

}]