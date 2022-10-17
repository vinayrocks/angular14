import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';

@Component({
  selector: 'app-rd-user-layout',
  templateUrl: './rd-user-layout.component.html',
  styleUrls: ['./rd-user-layout.component.scss']
})
export class RdUserLayoutComponent implements OnInit {
  currentUser: any=[];
  currentUrl: any;
  profileImagePath:string;
  coverImagePath:string
  pageLabel:string=''
  constructor(private rdAuthenticateService: RdAuthenticateService, private activatedRoute: ActivatedRoute,private router:Router) { 
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    router.events.subscribe((val) => {
     this.checkCurrentRoute();
    });
  }

  ngOnInit(): void {
    if(this.currentUser!==null){
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
    
  }

  checkCurrentRoute() {
    this.activatedRoute.children[0].data.subscribe(data=>{
      this.pageLabel = data.name;
    });
  } 

  GetProfilePath(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/ProfileImages/'+this.currentUser.ProfilePicture;
  }
  GetCoverPicture(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/CoverImages/'+this.currentUser.CoverPicture;
  }

}
