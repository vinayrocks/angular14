export class RdForgotPassword {
  Email: string;
  email:string;
  public resetPasswordDetail: RdForgotPassword[];
  constructor(input: any) {
    Object.assign(this, input);
    return this;
  }
}
