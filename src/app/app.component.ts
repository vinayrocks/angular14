import { Component, Inject, OnInit, AfterViewInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { DOCUMENT, Location } from "@angular/common";
import { RdAuthenticateService } from "./shared/services/authentication/rd-authenticate.service";
import { NotificationService } from "./shared/services/common/rd-notification/notification.service";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "radian";
  currentUser: any = [];
  loading: any;
  _showHeader: boolean = false;
  isShow: boolean;
  topPosToStartShowing = 100;
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  constructor(
    private location: Location,
    private rdAuthenticateService: RdAuthenticateService,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      this.currentUser = this.rdAuthenticateService.getLocalStorageData();
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      var _location = this.location.path();
      if (_location.split("/")[2] !== "login") {
        this._showHeader = true;
      } else {
        this._showHeader = false;
      }
    });
  }
  ngOnInit(): void {
    
  }
   // TODO: Cross browsing
   gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
