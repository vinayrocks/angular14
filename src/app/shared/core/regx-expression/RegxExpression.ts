import { Validators } from '@angular/forms';

export  const emailValidation = Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
export  const passwordValidation= Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
export const codeValidation = Validators.pattern('^[0-9]{1,3}$');
export const numberValidation = Validators.pattern('^[0-9]{1,10}$');

