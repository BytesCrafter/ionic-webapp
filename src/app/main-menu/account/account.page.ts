import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from 'src/app/model/token.model';

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
    private authServ: AuthService,
    private router: Router,
    private app: AppComponent,
    private modal: ModalService
  ) { }

  public get user(): Token {
    return this.authServ.userToken;
  }

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
    this.authServ.logout();
    this.router.navigate(['/']);
  }
}
