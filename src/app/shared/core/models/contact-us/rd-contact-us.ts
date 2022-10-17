export class RdContactUs {
  FirstName: string;
  LastName: string;
  Email: string;
  ContactNumber: string;
  public resetPasswordDetail: RdContactUs[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
