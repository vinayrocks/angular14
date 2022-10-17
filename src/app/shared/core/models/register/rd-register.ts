export class RdRegister {
    isUser: string;
    organizationName: string;
    uniqueNumber: number;
    firstName: string;
    middleName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phoneCode: string;
    phone: string;
    altMmobileCountryCode: string;
    altMobileNumber: string;
    memberShip: string;
    membershipAmount: Number=0;
    membershipDuration: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileSkill: string;
    profileSkillSubCategory: string;
    paymentMethod: string;
    cardName: string;
    cardNumber: string;
    cardSecurity: string;
    cardExpiry: string;
    billingAddress: string;
    billCountry: string;
    billStreet: string;
    billCity: string;
    billState: string;
    billZip: string;
    termCondition: string;
    isDefaultProfile:Number=1;
    public registerDetail: RdRegister[];
    constructor(input: any) {
        // Iterate over all cars for our user and map them to a proper `Car` model
        // this.registerDetail = input.registerDetail.map(registerDetail => new RdRegister()
        //     .RdDeserializable(registerDetail));
        Object.assign(this, input);
        return this;
    }
}
