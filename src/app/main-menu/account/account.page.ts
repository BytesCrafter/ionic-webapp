import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

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
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.isDarkMode = this.app.isDarkMode;
  }

  switchTheme(event: any) {
    this.app.switchTheme(event);
  }

  goToPassword() {
    //this.modalSvc.showPasswords();
  }

  logout() {
      this.router.navigate(['/']);
  }
}
