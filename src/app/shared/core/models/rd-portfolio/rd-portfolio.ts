export class RdPortfolio {
  Id:Number=0;
  PortfolioName: String='';
  PortfolioArtifacts: String='';
  PortfolioMedia: String='';
  UserId:Number=0;
  Email:String='';
  FirstName:String='';
  public rdRadian: RdPortfolio[];
  constructor(input: any){
    Object.assign(this, input);
    return this;
  }
}
