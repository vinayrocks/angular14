import { Component, OnInit } from '@angular/core';
import { timer, Subscription, filter } from 'rxjs';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-rd-account-layout',
  templateUrl: './rd-account-layout.component.html',
  styleUrls: ['./rd-account-layout.component.scss']
})
export class RdAccountLayoutComponent implements OnInit {
  data : Number=0;currentUser:any;
  setSmallPageHeader:Boolean=false;
  private _router: Subscription;
  isCustomHeader:Boolean=false;
  isResetPassword:Boolean=false;
  constructor(private rdAuthenticateService: RdAuthenticateService,
    private router: Router,private location: Location) {
     //emit 0 after 1 second then complete, since no second argument is supplied
     const source = timer(5000,5000);
     //output: 0
     const subscribe = source.subscribe(val => {
       this.data= new Date().getSeconds();
     });
     this._router =  this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
      
      var _location = this.location.path();
      _location = _location.split('/')[2];
      if(_location!=='home'){
        this.setSmallPageHeader=true;
        this.isCustomHeader=true;
        if(_location==='resetpassword'){
          this.isResetPassword=true;
        }
      } else {
        this.setSmallPageHeader=false;
        this.isCustomHeader=false;
       
      }
    });
   }

  ngOnInit(): void {
  }

}
