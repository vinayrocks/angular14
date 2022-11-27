import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import {Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT,Location } from '@angular/common';
import { RdAuthenticateService } from './shared/services/authentication/rd-authenticate.service';
import { NotificationService } from './shared/services/common/rd-notification/notification.service';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'radian';
    currentUser: any=[];
    loading: any;
    _showHeader:boolean=false;
    // @ViewChild(RdNavbarComponent) navbar: RdNavbarComponent;

    constructor(private location: Location, private rdAuthenticateService: RdAuthenticateService,
        private router: Router) {

            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
                // this.loading = this.notificationService.loading;
                // console.log(this.loading);
                this.currentUser = this.rdAuthenticateService.getLocalStorageData();
                if (window.outerWidth > 991) {
                    window.document.children[0].scrollTop = 0;
                } else {
                    window.document.activeElement.scrollTop = 0;
                }
                var _location = this.location.path();
                // _location = _location.split('/')[1];
                console.log(_location.split('/')[2])
                if(_location.split('/')[2] !== 'login'){
                    this._showHeader = true;
                } else {
                    this._showHeader = false; 
                }


                // if (this.currentUser !== null && _location !== 'our-purpose' && _location !== 'vission-mission'
                //     && _location !== 'member-detail' && _location !== 'detail' && _location !== 'portfolio-detail'
                //     && _location !== 'our-process' && _location !== 'updates' && _location !== 'search' && _location !== 'resetpassword'
                // ) {
                //     //this.router.navigate(['/member/hunar_view']);
                // }
            });
    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        // this.notificationService.loading.subscribe((v) => {
        //     console.log(v);
        //     this.loading = this.notificationService.loading;
        //   });
    }
}
