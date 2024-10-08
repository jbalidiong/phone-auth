import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import { Auth, RecaptchaVerifier } from '@angular/fire/auth';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier!: RecaptchaVerifier;
  confirmationResult: any;
  constructor(
    private alertController: AlertController,
    private authService: AuthServiceService,
    private auth: Auth
  ) { }


  async ionViewDidEnter() {
    this.recaptchaVerifier = new RecaptchaVerifier( this.auth, 'sign-in-button', {
      size: 'visible',
      callback: (response: any) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new RecaptchaVerifier( this.auth, 'sign-in-button', {
      size: 'visible',
      callback: (response: any) => {

      },
      'expired-callback': () => {
      }
    });
  }

  countryCodeChange($event: { detail: { value: any; }; }) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event: any) {
    console.log('country', this.recaptchaVerifier);

    if (this.PhoneNo && this.CountryCode) {
      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.CountryCode + this.PhoneNo).then(
        (        success: any) => {
          this.OtpVerification();
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            (            userData: any) => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

}