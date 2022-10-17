export class RdRadianUpdates {
    SearchBySkillCategory: String='';
    SearchBySkill: String='';
    SearchByText: String='';
    SearchCount:Number=0;
    public rdRadian: RdRadianUpdates[];
    constructor(input: any){
      Object.assign(this, input);
      return this;
    }
}
