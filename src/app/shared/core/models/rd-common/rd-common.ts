export class RdCommon {
  UserId: Number = 0;
  Id: Number = 0;
  public getRdRadian: RdCommon[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdUserSetting {
  IsViewerProfileShown: Boolean = false;
  IsRadianMemberProfileShown: Boolean = false;
  IsMailingAddressShown: Boolean = false;
  IsAddressShown: Boolean = false;
  IsEmailShown: Boolean = false;
  public getRdRadian: RdUserSetting[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdGetProfile {
  ProfileId: String = '';
  UserId: String = '';
  public getRdRadian: RdGetProfile[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdGetEvent {
  EventId: String = '';
  UserId: String = '';
  public getRdRadian: RdGetEvent[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdLikeEventProfile {
  RadianType: String = '';
  RadianTypeStatus: Boolean =false;
  RadianTypeId : String = '';
  UserId:String='';
  public getRdRadian: RdGetEvent[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class DeleteEvent {
  EventId: String = '';
  UserId: Boolean =false;
  public getDeleteEvent: DeleteEvent[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class DeletePortfolio {
  PortfolioId: String = '';
  UserId: Boolean =false;
  public getDeletePortfolio: DeletePortfolio[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class DeleteProfile {
  ProfileId: String = '';
  UserId: Boolean =false;
  public getDeleteProfile: DeleteProfile[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdGetPortfolio {
  PortfolioId: String = '';
  public rdGetPortfolio: RdGetPortfolio[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdEventIntUser {
  EventId: String = '';
  public rdEventIntUser: RdEventIntUser[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
export class RdUserAccount {
  memberShip: String = '';
  membershipAmount: String = '';
  membershipDuration: String = '';
  public RdUserAccount: RdUserAccount[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
