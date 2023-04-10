import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewPage } from '../modals/add-new/add-new.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalCtrl: ModalController
  ) { }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: AddNewPage,
    });
    modal.present();
  }
}
