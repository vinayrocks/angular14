export class RdRadian {
  Id:Number=0;
  ProfileName: String='';
  ProfilePicture: String='';
  CoverPicture: String='';
  ProfileDescription:String='';
  ProfileSkill: String='';
  ProfileExpertise: String='';
  LinkedPortfolio: String='';
  UserId:Number=0;
  Email:String='';
  FirstName:String='';
  isDefaultProfile:Number=0;
  public rdRadian: RdRadian[];
  constructor(input: any){
    Object.assign(this, input);
    return this;
  }
}
