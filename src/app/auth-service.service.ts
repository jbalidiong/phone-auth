import { Injectable } from '@angular/core';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber} from '@angular/fire/auth';
import {ConfirmationResult} from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  confirmationResult!: ConfirmationResult;

  constructor(private fireAuth: Auth) { }

  public signInWithPhoneNumber(recaptchaVerifier: RecaptchaVerifier, phoneNumber: any) {
    return new Promise<any>((resolve, reject) => {

      signInWithPhoneNumber( this.fireAuth, phoneNumber, recaptchaVerifier)
        .then((confirmationResult: any) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error: any) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }
  public async enterVerificationCode(code: any) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result: { user: any; }) => {
        console.log(result);
        const user = result.user;
        resolve(user);
      }).catch((error: { message: any; }) => {
        reject(error.message);
      });

    });
  }
}