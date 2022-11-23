import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RdLoginComponent } from 'src/app/core/components/rd-login/rd-login.component';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-rd-navbar',
    templateUrl: './rd-navbar.component.html',
    styleUrls: ['./rd-navbar.component.scss']
})
export class RdNavbarComponent implements OnInit {
    private _router: Subscription;
    currentUser: any ={
        isLoggedIn:false,
        isPortfolio:false
    }
    isLoggedIn:Boolean=false;
    _open:boolean=false;
    isPortfolio:boolean=false;
    constructor(public location: Location,public matDialog: MatDialog, private authenticationService: RdAuthenticateService,private router: Router) {
        const ctx = this.authenticationService.getLocalStorageData();
        if(ctx!==null){
            this.currentUser =ctx;
            if(!this.currentUser.isPortfolio){
                this.router.navigate(['/member/portfolio_add']);
            }
        } else {
            this.currentUser.isLoggedIn=false;
            this.currentUser.isPortfolio = false;
        }
        
    }

    ngOnInit() {
       
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.width = '507px';
        dialogConfig.height = '420px';
        dialogConfig.panelClass = 'login-popup'
        this.matDialog.open(RdLoginComponent, dialogConfig);
    }
    logout() {
        this._open=false
        this.authenticationService.logout();
        this.currentUser.isLoggedIn=false;
        this.currentUser.isPortfolio = false;
        window.location.href = '/home'
        // this.router.navigate(['/home']);
    }
}
