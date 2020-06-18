import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  UserName;
  UserPanel = false;
  UserLogOut = true;
    constructor(private AuthService: AuthServiceService, private Routr: Router)
    {  if (this.AuthService.Islogin()){ this.UserPanel = true; this.UserLogOut = false;
                                        this.UserName = localStorage.getItem('UserName'); }
  }

    ngOnInit(): void {


    }


    LogOut(){
      this.AuthService.LogOut().subscribe( data => {this.UserPanel = false; this.UserLogOut = true;
                                                    localStorage.removeItem('token'); localStorage.clear();
                                                    this.Routr.navigate(['/Admin']);
        });
        localStorage.removeItem('token'); localStorage.clear();
        this.Routr.navigate(['/Admin']);
    }



  }
