import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RdEncryptDecryptService } from '../encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdAuthenticateService } from '../authentication/rd-authenticate.service';
import { environment } from 'src/environments/environment';
import { RdUserAccount } from '../../core/models/rd-common/rd-common';
@Injectable()
export class RdUserService {

  currentUserSubject: any=[];
  constructor(private http: HttpClient, private _encryptDecryptService: RdEncryptDecryptService,
    private rdAuthenticateService: RdAuthenticateService) {
     
  }

  getUserProfiles(rdCommon) {
    
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getProfiles.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserProfile(rdCommon) {
    
    rdCommon.UserId=rdCommon.UserId;
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getProfiles.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserProfileDetail(rdCommon) {
    
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getSingleProfile.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserPorfolios(rdCommon) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdCommon.UserId=this.currentUserSubject.id;
    rdCommon.Id=0;
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getPortfolios.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserPorfolio(rdCommon) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getPortfolios.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserEvents(rdCommon) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getEvents.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserEvent(rdCommon) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getEvents.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getEventDetail(rdCommon) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getSingleEvent.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  likeEvent(rdCommon) {
    return this.http.post<any>(environment.apiCommon+'radianApi/UserLikes/userLikes.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  UploadUserPortfolioFile(file: any, portfolioName: string) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('Type', this._encryptDecryptService.set('Portfolio'));
    formData.append('PortfolioName', this._encryptDecryptService.set(portfolioName));
    for (var i = 0; i < file.length; i++) {
      formData.append('file[]', file[i].File);
    }
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        return res;
       
      }));
  }
  
  UploadUserRadianProfileImage(ProfilePicture: any, CoverPicture: any, profileName: string) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('ProfileName', this._encryptDecryptService.set(profileName));
    formData.append('Type', this._encryptDecryptService.set('Profile'));
    formData.append('ProfilePicture', ProfilePicture);
    formData.append('CoverPicture', CoverPicture[0]);
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        return res;
       
      }));
  }
  UploadUserEventImage(file: any, eventName: string) {
    
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('Type', this._encryptDecryptService.set('Event'));
    formData.append('EventName', this._encryptDecryptService.set(eventName));
    for (var i = 0; i < file.length; i++) {
      formData.append('file[]', file[i].File);
    }
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        return res;
      
      }));
  }
  addUserProfile(rdProfile: any) {
    
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdProfile.UserId = this.currentUserSubject.id;
    rdProfile.Email = this.currentUserSubject.username;
    rdProfile.FirstName = this.currentUserSubject.firstName;
    
    rdProfile.ProfilePicture = rdProfile.ProfilePicture===null?'':rdProfile.ProfilePicture;
    rdProfile.CoverPicture = rdProfile.CoverPicture===null?'':rdProfile.CoverPicture;
    var data = this._encryptDecryptService.ecryptModel(rdProfile);
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/createProfile.php', JSON.stringify(data));
  }

  addUserPortfolio(rdPortfolio: any) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdPortfolio.UserId = this.currentUserSubject.id;
    rdPortfolio.Email = this.currentUserSubject.username;
    rdPortfolio.FirstName = this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdPortfolio);
    console.log(data);
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/createPortfolio.php', 
    JSON.stringify(data));
  }
  addUserEvent(rdEvent: any) {
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdEvent.UserId = this.currentUserSubject.id;
    rdEvent.Email = this.currentUserSubject.username;
    rdEvent.FirstName = this.currentUserSubject.firstName;
    
    var data = this._encryptDecryptService.ecryptModel(rdEvent);
    const dd = JSON.stringify(data);
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/createEvent.php', JSON.stringify(data));
  }
  addUpdateSettings(rdSettings:any){
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdSettings.UserId = this.currentUserSubject.id;
    rdSettings.Email = this.currentUserSubject.username;
    rdSettings.FirstName = this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdSettings);
    return this.http.post<any>(environment.apiCommon+'radianApi/Settings/userSettings.php', JSON.stringify(data));
  }
  searchMember(rdSearchMember:any){
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdSearchMember.UserId = this.currentUserSubject===null?0:this.currentUserSubject.id;
    rdSearchMember.Email = this.currentUserSubject===null?'':this.currentUserSubject.username;
    rdSearchMember.FirstName = this.currentUserSubject===null?'':this.currentUserSubject.firstName;

    var data = this._encryptDecryptService.ecryptModel(rdSearchMember);
    return this.http.post<any>(environment.apiCommon+'radianApi/Search/searchMember.php', JSON.stringify(data));
  }
  searchRadianUpdate(rdSearchRadian:any){
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdSearchRadian.UserId = this.currentUserSubject===null?0:this.currentUserSubject.id;
    rdSearchRadian.Email = this.currentUserSubject===null?'':this.currentUserSubject.username;
    rdSearchRadian.FirstName = this.currentUserSubject===null?'':this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdSearchRadian);
    return this.http.post<any>(environment.apiCommon+'radianApi/Search/searchRadian.php', JSON.stringify(data));
  }

  DeleteRequest(rdCommon,type:string){
    this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
    rdCommon.UserId = this.currentUserSubject.id;
    if(type==='Event'){
      return this.http.post<any>(environment.apiCommon+'radianApi/Events/deleteUserEvent.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    } else if(type==='Portfolio') {
      return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/deleteUserPortfolio.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    } else {
      return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/deleteUserProfile.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    }
  }
  getPortfolioDetail(rdGetPortfolio) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getSinglePortfolio.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdGetPortfolio)))
      .pipe(map(res => {
        return res;
      }));
  }
  addEventParticipation(rdEvent: any) {
    var data = this._encryptDecryptService.ecryptModel(rdEvent);
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/userEventCollaboration.php', JSON.stringify(data));
  }
  getEventInterestedUserList(rdGetUserIntList) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getInterestedUsers.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdGetUserIntList)))
      .pipe(map(res => {
        return res;
      }));
  }
  upgradePlan(RdRegister: RdUserAccount) {
    
    var data = this._encryptDecryptService.ecryptModel(RdRegister);
    return this.http
      .post<any>(
        environment.apiCommon + 'radianApi/Users/createRazorpayOrderRenew.php',
        JSON.stringify(data)
      )
      .pipe(
        map((res) => {
          
          return res;
          // return this.razorPayment(res);
        })
      );
  }
}
