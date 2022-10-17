export class RdEvent {
  Id:Number=0;
  EventName: String='';
  EventDescription:String='';
  EventMedia: String='';
  EventSkill:String='';
  EventCategory:String='';
  IsEventOnline:String='';
  EventLink:String='';
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  EventStartDateTime: string;
  EventEndDateTime: string;
  UserId:Number=0;
  Email:String='';
  FirstName:String='';
  EventStatus:Number=1;
  EventStatusDate:Date=new Date();
  public rdRadian: RdEvent[];
  constructor(input: any){
    Object.assign(this, input);
    return this;
  }
}
