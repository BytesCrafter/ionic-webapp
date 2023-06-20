import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController, ToastController } from '@ionic/angular';
import packageInfo from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public version: any = packageInfo.version;

  public translations: any[] = [];
  constructor(
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async showToast(msg: any, colors: any, positon: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: colors,
      position: positon
    });
    toast.present();
  }

  async shoNotification(msg: any, colors: any, positon: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000,
      color: colors,
      position: positon,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async errorToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  apiErrorHandler(err: any) {
    // console.log('Error got in service =>', err)
    if (err.status === -1) {
      this.showErrorAlert('Failed To Connect With Server');
    } else if (err.status === 401) {
      this.showErrorAlert('Unauthorized Request!');
      this.router.navigate(['/login']);
    } else if (err.status === 500) {
      this.showErrorAlert('Somethimg Went Wrong..');
    }
  }

  /*
   Show Error Alert Message
   param : msg = message to display
   Call this method to show Error Alert,
   */
   async showErrorAlert(msg: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  makeid(length: any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getString(str: any) {
    if (this.translations[str]) {
      return this.translations[str];
    }
    return str;
  }

  isJsonValid(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

  playAudio(){
    const audio = new Audio();
    audio.src = '../../assets/audio/notify.wav';
    audio.load();
    audio.play();
  }

  stopAudio(){
    const audio = new Audio();
    audio.src = '../../assets/audio/stop.wav';
    audio.load();
    audio.play();
  }

  async modalAlert(title='Alert', subtitle='', content='') {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: content
    });
    await alert.present();
    setTimeout(()=> {
      alert.dismiss();
    }, 4000);
  }

  jwtDecode(token: string) {
    const jwt = new JwtHelperService();
    return jwt.decodeToken(token);
  }
}
