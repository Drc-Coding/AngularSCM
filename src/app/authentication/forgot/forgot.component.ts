import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Http} from '@angular/http';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { validateConfig } from '@angular/router/src/config';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  providers:[NotificationsComponent]
})
export class ForgotComponent implements OnInit { 
  @ViewChild("phonenumber") phno:any;
  @ViewChild("email") mail:any;
  @ViewChild("otp") otp:any;
  forgotForm: any;
  data:any;
  randomNumber:any;
  public phone:boolean=true;
  public email:boolean=false;
  public form1:boolean=true;
  public form2:boolean=false;
  public form3:boolean=false;
  public reMobile:boolean=false;
  public reEmail:boolean=false;
  public showOtp:boolean=false;
  emailPattern:any = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  txtPhonenumber:string;
  txtEmail:string;
  constructor(private fb: FormBuilder, private router: Router,private http:Http,private notificationsComponent:NotificationsComponent) {
    this.forgotForm = this.fb.group ( {    
      email:['',Validators.pattern(this.emailPattern)],
      emailusername:['',[]],
      emailcompanyid:['',[]],     
      otpmail:['',[]],
      phone:['',[]],
      phoneusername:['',[]],
      phonecompanyid:['',[]],
      newpassword:['',[]],
      confirmpassword:['',[]],
    } );
  }

  ngOnInit() { 
    this.forgotForm.get('emailcompanyid').setValue("opt1");
    this.forgotForm.get('phonecompanyid').setValue("opt1");
    this.http.get('api/getusercomp').map(res=>res.json()).subscribe(data=>{             
      this.data=data; 
       err=>
       {
          console.log('error on getSessioncomp()');
       }
  });    
  }
  showForm(event)
  {
    let value=event.target.value;
    if(value==0)
    {
      this.phone=true;
      this.email=false;
    }
    if(value==1)
    {
      this.phone=false;
      this.email=true;
    }
  }
 
  getPhone():any
  {   
    this.reMobile=this.checkMobileValidation();
    if(this.reMobile==true)
    {  
      let compId:any=this.forgotForm.get('phonecompanyid').value;
      let uname:any=this.forgotForm.get('phoneusername').value;
      let phone:any=this.forgotForm.get('phone').value;     
      this.http.get('api/checkMobileno'+'/'+compId+'/'+uname+'/'+phone).map(res=>res.json()).subscribe(data=>{             
       if(data==true)
       {
         this.form1=false;
         this.form2=true;
         var lastFour = phone.substr(phone.length - 4); 
         this.txtPhonenumber="******"+lastFour;
       }
       else{
         this.phno.nativeElement.focus();     
         this.notificationsComponent.addToast({title:'Error', msg:'We could not find your phone Number with that information', timeout: 5000, theme:'default', position:'top-right',type:'error'});
       }
         err=>
         {
            console.log('error on checkMobileno()');
         }
    });    
    } 
  }
  checkMobileValidation():boolean
  {
    if(this.forgotForm.get('phonecompanyid').value=='opt1' || this.forgotForm.get('phonecompanyid').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'Company Name must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
    if(this.forgotForm.get('phoneusername').value=='' || this.forgotForm.get('phoneusername').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'User Name must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
    if(this.forgotForm.get('phone').value=='' || this.forgotForm.get('phone').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'Phone Number must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
    return true;
  }

  getEmail()
  {
    this.reEmail=this.checkEmailValidation();
        if(this.reEmail==true)
        {
          let compId:any=this.forgotForm.get('emailcompanyid').value;
          let uname:any=this.forgotForm.get('emailusername').value;
          let email:any=this.forgotForm.get('email').value;  
          this.http.get('api/checkEmailid'+'/'+compId+'/'+uname+'/'+email).map(res=>res.json()).subscribe(data=>{                        
            if(data==true)
            {
              this.form1=false;
              this.form3=true;
              var name   = email.substring(0, email.lastIndexOf("@"));
              var domain = email.substring(email.lastIndexOf("@") +1);
              var lastFour = name.slice(0, -9); 
              this.txtEmail=lastFour+"*****"+"@"+domain;
            }
            else{
              this.mail.nativeElement.focus();     
              this.notificationsComponent.addToast({title:'Error', msg:'We could not find your Email Address with that information', timeout: 5000, theme:'default', position:'top-right',type:'error'});
            }
              err=>
              {
                 console.log('error on checkMobileno()');
              }
         });     
        }
  }

  checkEmailValidation():boolean
  {
    if(this.forgotForm.get('emailcompanyid').value=='opt1' || this.forgotForm.get('emailcompanyid').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'Company Name must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
    if(this.forgotForm.get('emailusername').value=='' || this.forgotForm.get('emailusername').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'User Name must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
    if(this.forgotForm.get('email').value=='' || this.forgotForm.get('email').value==null)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'Email Address must not be empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }   
    return true;
  }


  getOtp(event)
  {  
    this.showOtp=true;
    let email:any=this.forgotForm.get('email').value; 
    let phone:any=this.forgotForm.get('phone').value;
    this.randomNumber=Math.floor(100000 + Math.random() * 900000);      
    if(event=='mail')
    {    
    this.http.get('api/getForgetMail'+'/'+email+'/'+this.randomNumber).map(res=>res).subscribe(data=>{ err=>
    {
      console.log("Error getting Otp getForgetMail()")
    } });
  }
    if(event=='phone')
    {
      this.http.get('api/getForgetphone'+'/'+phone+'/'+this.randomNumber).map(res=>res).subscribe(data=>{ err=>
        {
          console.log("Error getting Otp getForgetphone()")
        } });
    }
  }
  
  resetPassword(event)
  {       
  if(this.forgotForm.get('otpmail').value=='' || this.forgotForm.get('otpmail').value==null)
  {
    this.notificationsComponent.addToast({title:'Error', msg:'Required OTP Field..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
  } 
  else{
      if(this.randomNumber==this.forgotForm.get('otpmail').value)
          {
            document.querySelector("#"+event).classList.add('md-show');
          }
          else{
            this.otp.nativeElement.focus();  
            this.notificationsComponent.addToast({title:'Error', msg:'Your OTP is Not Match!', timeout: 5000, theme:'default', position:'top-right',type:'error'});
          }
  }
  }

  updatePassword()
  {
    let newPassword:any=this.forgotForm.get('newpassword').value; 
    let confirmPassword:any=this.forgotForm.get('confirmpassword').value; 
    let compId:any=this.forgotForm.get('emailcompanyid').value;
    let uname:any=this.forgotForm.get('emailusername').value;
    if(newPassword==confirmPassword)
    {
      this.http.get('api/updateUserpassword'+'/'+compId+'/'+uname+'/'+confirmPassword).map(res=>res.json()).subscribe(data=>{
        if(data==true)
        {               
          this.forgotForm.reset();
          this.router.navigate (['/userlogin/login']);
        }
        else
        {
          alert('Getting Problem To change Password.Can You change Your new-password or reload the Page');          
        }
      },
        err=>
        {
          console.log("Error getting Otp updateUserpassword()");
        } 
      );
    } 
    else{
      this.notificationsComponent.addToast({title:'Error', msg:'Your Password is Not Match!', timeout: 5000, theme:'default', position:'top-right',type:'error'});     
    }
  }
  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
  onSubmit() {
    this.router.navigate ( [ '/' ] );
  }
}
