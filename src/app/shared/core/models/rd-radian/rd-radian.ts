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
<<<<<<< HEAD
  EducationName: String='';
  EducationNameOther: String='';
  EducationStartYear: string;
  EducationEndYear: string;
  CertificationName: String='';
  CertificationDate: string;
  CertificateLicenseNumber: String='';
  UserExperience: String='';
  UserExperienceStartYear: string;
  UserExperienceEndYear: string;
=======
  Education: any=[];
  CertificationLicense: any=[];
  Experience: any=[];
>>>>>>> 2a458c768cc562cfa9d5d1557ebcc56f07188a2b
  Email:String='';
  FirstName:String='';
  isDefaultProfile:Number=0;
  public rdRadian: RdRadian[];
  constructor(input: any){
    Object.assign(this, input);
    return this;
  }
}
