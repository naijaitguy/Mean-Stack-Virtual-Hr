import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobServiceService } from 'src/app/Services/job-service.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  FormData: FormGroup;
  Error = false;
  PhoneError = false;
  UserNameError = false;
  Submitted = false;
  Success = false;
  ErrorMgs ;
  Loading = false;
  unamePattern = '^[a-z0-9_-]{3,15}$';
  pwdPattern =   '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$';
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor( private Fb: FormBuilder , private AuthServices: AuthServiceService) {


    this.FormData = this.Fb.group({

     FirstName: [ '' , Validators.compose([ Validators.required])],
     LastName: [ '' , Validators.compose([ Validators.required])],
     UserName: [ '' , Validators.compose([ Validators.required , Validators.pattern(this.unamePattern)])],
     Address: [ '' , Validators.compose([ Validators.required])],
     Email: [ '' , Validators.compose([ Validators.required , Validators.pattern(this.emailPattern)])],
     Password: [ '' , Validators.compose([ Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$')])],
     ConfirmPassword: [ '' , Validators.compose([ Validators.required])],
     PhoneNumber: [ '' , Validators.compose([ Validators.required])],



    }, {   validator: this.MustMatch('Password', 'ConfirmPassword')});
  }

  ngOnInit(): void {
  }
   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}

  get f(){  return this.FormData.controls; }

  ProcessForm(){


    this.Submitted = true;



    if (!this.FormData.valid){ return false; }else{

this.Loading = true;

this.AuthServices.CreateUser(this.FormData.value).subscribe(
  data => {  this.Error = false; this.Success = true; },
   error => {  this.Error = true; this.ErrorMgs = error.Response;  });

    }
  }



}
