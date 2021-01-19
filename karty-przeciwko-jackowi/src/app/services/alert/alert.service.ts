import { AlertController, AnimationController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private toastController: ToastController
  ) { }

  async displayAlert(header: string, text: string, handler: () => void) {
    const alert = await this.alertController.create({
      header,
      message: text,
      buttons: [{ text: 'OK', handler }],
      enterAnimation: (baseEl: any, opts?: any) => this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('.alert-wrapper'))
        .duration(250)
        .keyframes([
          { offset: 0, opacity: '0' },
          { offset: 1, opacity: '1' }
      ])
    });

    await alert.present();
  }

  async displayToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'middle',
      animated: true
    });
    toast.present();
  }
}
