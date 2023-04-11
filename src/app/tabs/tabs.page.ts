import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public isLoaded: boolean = false;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private modalSvcs: ModalService
  ) {
    // TEMP: Test the loading.
    setTimeout(() => {
      this.isLoaded = true;
    }, 1200)
  }

  addNew() {
    this.modalSvcs.showModal();
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  openMenu() {
    this.menuCtrl.toggle('end');
  }
}
