import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import { timer } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { RdRadianUpdates } from 'src/app/shared/core/models/rd-radian-updates/rd-radian-updates';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EmbedVideoService } from 'ngx-embed-video';
@Component({
  selector: 'app-rd-home',
  templateUrl: './rd-home.component.html',
  styleUrls: ['./rd-home.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RdHomeComponent implements OnInit {
  homeFormGroup: FormGroup;
  date1: Date = new Date();
  date2: Date = new Date();
  date3: Date = new Date();
  data : number;
  radianUpdates:any;
  loading:Boolean=false;
  constructor(private notificationService: NotificationService,private rdUserService: RdUserService,
    private _formBuilder: FormBuilder,private embedService: EmbedVideoService,) {
    this.data=0;
    
     //emit 0 after 1 second then complete, since no second argument is supplied
      const source = timer(5000,5000);
      //output: 0
      const subscribe = source.subscribe(val => {
        this.data= new Date().getSeconds();
      });
   }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');

    this.homeFormGroup = this._formBuilder.group({
      SearchBySkillCategory: [''],
      SearchBySkill: [''],
      SearchByText: [''],
      SearchCount:[0]
    });
    this.getRadianEvents();
  } 
  get homeUpdatesForm() { return this.homeFormGroup.controls; }
  previous(){
    this.data= this.data - 16<0?0:this.data - 16;
  }
  next(){
    this.data=this.data + 16>60?0:this.data+16;
  }
  getRadianEvents(){

    // this.spinner.show();
    this.homeUpdatesForm.SearchCount.setValue(0);
    this.rdUserService.searchRadianUpdate(new RdRadianUpdates(this.homeFormGroup.value))
    .subscribe(res => {
      if (res.status) {
        res.data.forEach(element => {
          element.ContactDetails=JSON.parse(element.ContactDetails);
          element.EventCategories=JSON.parse(element.EventCategories);
          element.EventSkill= JSON.parse(element.EventSkill);
          element.EventImages=this.getProfilefilePath(element);
        });
        this.radianUpdates=this.chunkArray(res.data,4);
  
      } else {
  
        this.notificationService.success(res.message);
      
      }
    })
  }
  // getProfilefilePath(data:any){
  //   const imageArry=[];
  //   if(data.EventImages.split(',').length>1){
  //     data.EventImages.split(',')
  //     .forEach(element => {
  //       if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1){
  //         imageArry.push(environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Event/'+data.EventName+'/'+element);
  //       } else {
  //         imageArry.push(element);
  //       }
        
  //     });
  //   } else {
  //     if(data.EventImages.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1){
  //       imageArry.push(environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Event/'+data.EventName+'/'+data.EventImages);
  //     } else {
  //       imageArry.push(data.EventImages);
  //     }
     
  //   }
  //   return imageArry;
  // }

  getProfilefilePath(data: any) {
    const imageArry = [];
    if (data.EventImages.split(',').length > 1) {
      data.EventImages.split(',')
        .forEach(element => {
          if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')===-1
          && element.indexOf('pdf')===-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName.replace(/\s/g, "") + '/' +element,IsImage:'image'});
         
          }else if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1 && element.indexOf('pdf')!==-1){
            imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName.replace(/\s/g, "") + '/'+element,IsImage:'pdf'});
          } else {
            this.embedService.embed_image(element, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(element),IsImage:'video',
              Image:res.link});
            });
          }
        });
    } else {
      
      if(data.EventImages.indexOf('youtu.be')===-1 && data.EventImages.indexOf('youtube')===-1
        && data.EventImages.indexOf('pdf')===-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName +'/'+data,IsImage:'image'});
        }else if(data.EventImages.indexOf('youtu.be')===-1 && data.EventImages.indexOf('youtube')===-1 
        && data.EventImages.indexOf('pdf')!==-1){
          imageArry.push({Name:environment.apiCommon+'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' +data,IsImage:'pdf'});
        } else {
          this.embedService.embed_image(data.EventMedia, { image: 'mqdefault' })
            .then(res => {
              imageArry.push({Name:this.embedService.embed(data.EventMedia),IsImage:'video',
              Image:res.link});
            });
          // imageArry.push(element.PortfolioMedia);
         
        }

    }
    return imageArry;
  }

  chunkArray(myArray, chunk_size){
    var results = [];
    
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    
    return results;
}
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
