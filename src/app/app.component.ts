import { Component, Inject, OnInit, AfterViewInit } from "@angular/core";
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
export class AppComponent implements OnInit, AfterViewInit {
  title = "radian";
  currentUser: any = [];
  loading: any;
  _showHeader: boolean = false;

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
  ngOnInit() {}
  ngAfterViewInit() {}
}
