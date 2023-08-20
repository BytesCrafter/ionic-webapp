import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AccountPage implements OnInit {

  public isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private app: AppComponent,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.isDarkMode = this.app.isDarkMode;
  }

  switchTheme(event: any) {
    this.app.switchTheme(event);
  }

  goToPassword() {
    this.modal.showPasswords();
  }

  logout() {
      this.router.navigate(['/']);
  }
}
