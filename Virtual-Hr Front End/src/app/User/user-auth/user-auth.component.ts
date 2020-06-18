import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  Loading = false;
LoginError = false;
  FormData: FormGroup;
  Submitted = false;
  unamePattern = '^[a-z0-9_-]{8,15}$';
pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';
mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor( private Fb: FormBuilder , private AuthService: AuthServiceService, private Route: Router) {

    this.FormData = this.Fb.group({

      Email: [ '' , Validators.compose([ Validators.required, Validators.pattern(this.emailPattern)])],
      Password: [ '' , Validators.compose([ Validators.required, Validators.minLength(7)])],
      RememberMe: [ '' , Validators.compose([ ])]

    });


  }

  ngOnInit(): void {

    // this.AuthService.LogOut();
    localStorage.removeItem('token');
    localStorage.clear();
  }

  get f(){  return this.FormData.controls; }

ProcessForm(){
this.Submitted = true;

if ( ! this.FormData.valid){ return false; }else{
////////// validation passed ----------------
this.Loading = true;
const LoginModel = {Email : this.FormData.controls.Email.value, Password: this.FormData.controls.Password.value};

this.AuthService.login(LoginModel).subscribe(
   data => {

    this.AuthService.ReturnUrl ? this.Route.navigate([this.AuthService.ReturnUrl]) : this.Route.navigate(['User/Jobs/JobList']);

     }
   , err => { this.Loading = false; this.LoginError = true;  });
}

}

}
