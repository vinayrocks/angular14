import { Component, OnInit } from '@angular/core';
import {timer, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
@Component({
  selector: 'app-rd-guest-layout',
  templateUrl: './rd-guest-layout.component.html',
  styleUrls: ['./rd-guest-layout.component.scss']
})
export class RdGuestLayoutComponent implements OnInit {
  data : number=0;
  setSmallPageHeader:Boolean=false;
  private _router: Subscription;
  currentUser:any;
  isCustomHeader:Boolean=false;
  constructor() {}

  ngOnInit(): void {
  }
}
