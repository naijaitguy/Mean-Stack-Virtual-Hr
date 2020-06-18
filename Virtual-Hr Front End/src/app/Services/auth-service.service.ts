import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { logging } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, retry, catchError } from 'rxjs/operators';
import { UserModel } from '../Models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private Http: HttpClient) { }

ReturnUrl: any;


 FindEmail(Email): Observable<UserModel> {

  return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByEmail', {Email})
  .pipe(retry(1), catchError(this.errorHandle));

 }
 FindUserName(UserName){

return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByUserName', {UserName})
.pipe(retry(1), catchError(this.errorHandle));

 }
 FindPhone(PhoneNumber){

return this.Http.post<UserModel>(environment.ApiPath + 'Identity/GetUserByPhoneNumber', PhoneNumber)
.pipe(retry(1), catchError(this.errorHandle));

 }

 RefreshToken(refreshtoken: string){

return this.Http.post<UserModel>(environment.ApiPath + 'Identity/Refresh_Token', {refreshtoken})
.pipe(map(UserModel => {
  this.setToken(UserModel.AccessToken);
  localStorage.setItem('RefreshToken', UserModel.RefreshToken);

}), catchError(this.errorHandle));

 }

  login(Model: { Email: any; Password: any; }): Observable<any> {
 return this.Http.post<UserModel>(environment.ApiPath + 'Identity/Authenticate' , Model)

.pipe(map( UserModel => {

         if (UserModel && UserModel.AccessToken)
         {
           localStorage.setItem('UserName', UserModel.UserName);
           localStorage.setItem('RefreshToken', UserModel.RefreshToken);
           localStorage.setItem('role', UserModel.Role);
           this.setToken(UserModel.AccessToken);

          }

         }));

  }

  loginAdmin(Model: { Email: any; Password: any; }) {
    return this.Http.post<UserModel>(environment.ApiPath + 'Identity/AuthenticateAdmin' , Model)

   .pipe(map( UserModel => {

            if (UserModel && UserModel.AccessToken)
            {
              localStorage.setItem('UserName', UserModel.UserName);
              localStorage.setItem('RefreshToken', UserModel.RefreshToken);
              localStorage.setItem('role', UserModel.Role);
              this.setToken(UserModel.AccessToken);

             }

            }));

     }


  LogOut(){

return this.Http.delete(environment.ApiPath + 'Identity/Log_Out');

  }

  CreateUser(UserModel){
return this.Http.post(environment.ApiPath + 'Identity/CreateAccount' , UserModel).pipe(retry(1), catchError(this.errorHandle));

  }

  setToken(token: string){

localStorage.setItem('token', token);

  }

  getToken(){

return localStorage.getItem('token');

  }

  getRefreshToken(){
     return localStorage.getItem('RefreshToken'); 
    }

Islogin(){

  if (localStorage.getItem('token') === null){return false; }
  else{ return true; }
}


errorHandle(error){
  let errormgs = {};
  if (error.error instanceof ErrorEvent){
      // get client side error

       errormgs = error.error.message;
  }
   else {

    // get server-side error
          errormgs = { ErrorCode : error.status, Message: error.message, Response : error.error.Mgs};


   }

  console.log(errormgs);
  return throwError(errormgs);

    }

}

