export class RdSearchMember {
    SearchBySkill: String='';
    SearchByCountry: String='';
    SearchByState: String='';
    SearchByZipCode: String='';
    SearchByText: String='';
    SearchCount:Number=0;
    public rdRadian: RdSearchMember[];
    constructor(input: any){
      Object.assign(this, input);
      return this;
    }
}
