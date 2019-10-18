import { Routes } from '@angular/router';
import { UserdetailComponent } from './userdetail/userdetail.component';



export const LoginuserdetailRoutes: Routes =[{
    path: '',
    children: [
             
                
                {
                path:'userdetail',  
                component: UserdetailComponent
        }   
   
        ]}]