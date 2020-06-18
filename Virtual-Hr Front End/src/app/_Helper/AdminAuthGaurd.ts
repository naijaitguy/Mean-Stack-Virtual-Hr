import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';


@Injectable({providedIn: 'root'})
export class AdminAuthGaurd implements CanActivate{

constructor( private AuthService: AuthServiceService , private Router: Router){}

canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot){

    if (this.AuthService.Islogin() && localStorage.getItem('role')!=='User'){
      this.AuthService.ReturnUrl = state.url;
      return true;

    } else{

   this.Router.navigate( ['/Admin'], { queryParams: {ReturnUrl: state.url}});

    }


}




}
