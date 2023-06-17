import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChangePasswordComponent  implements OnInit {

  constructor(
    private modalSvc: ModalService
  ) { }

  ngOnInit() {
  }

  goBack() {
      this.modalSvc.dismiss();
  }

}
