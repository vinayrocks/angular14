import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptService } from '../../services/custom-script/script.service';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-header-image-slider',
  templateUrl: './header-image-slider.component.html',
  styleUrls: ['./header-image-slider.component.scss']
})
export class HeaderImageSliderComponent implements OnInit,AfterViewInit {
  isCustomHeader:Boolean=false;
  private _router: Subscription;
  constructor(private scriptService:ScriptService,public location: Location,
    private router: Router) { 
    this.scriptService.load('gsap').then(data => {
      // console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this._router =   this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
      var _location = this.location.path();
      _location = _location.split('/')[2];
      if(_location!=='home'){
        this.isCustomHeader=true;
      } else {
        this.isCustomHeader=false;
      }
    });
  }

  ngOnInit(): void {
  
  }
  joinUs(){
    this.router.navigate(['/account/signup']);
  }
  ngAfterViewInit():void{
    this.scriptService.load('cssrule','script').then(data => {
      // console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
