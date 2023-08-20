import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewPage } from '../modals/add-new/add-new.page';
import { ChangePasswordComponent } from '../account/change-password/change-password.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  protected modal: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: AddNewPage,
    });
    modal.present();
  }

  async showPasswords() {
    this.modal = await this.modalCtrl.create({
      component: ChangePasswordComponent,
    });
    this.modal.present();
  }
}
