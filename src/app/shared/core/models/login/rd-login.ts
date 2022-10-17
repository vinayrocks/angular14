export class RdLogin {
    email: string;
    password: string;
    public loginDetail: RdLogin[];
    constructor(input: any) {
        Object.assign(this, input);
        return this;
    }

}
