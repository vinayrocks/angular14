export class RdResetPassword {
    Code: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    public resetPasswordDetail: RdResetPassword[];
    constructor(input: any) {
      Object.assign(this, input);
      return this;
    }
    // RdDeserializable(input: any): this {
    //     // Iterate over all cars for our user and map them to a proper `Car` model
    //     this.resetPasswordDetail = input.resetPasswordDetail.map(resetPasswordDetail => new RdResetPassword().RdDeserializable(resetPasswordDetail));
    //     return this;
    // }

}
