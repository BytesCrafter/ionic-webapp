import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  email: any = '';
  password: any = '';
  loggedIn: any = false;
  loadedCompany: any = true;

  siteLogo: any = 'assets/images/logo.png';
  companyName: any = 'Log in with your account';
  themeColor: any = '';

  constructor(
    private menuController: MenuController,
    private router: Router,
    private util: UtilService,
    private auth: AuthService,
  ) {

  }

  ngOnInit() {
  }

  forgotPass() {
    this.util.modalAlert('Notification', '', 'This feature is not fully implemented yet, thank you for your patience.');
  }

  login() {
    if (!this.email || !this.password) {
      this.util.modalAlert('Notification', 'All Fields are required');
      return;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.email)) {
      this.util.modalAlert('Notification', 'Please enter valid email');
      return;
    }
    this.util.setSpinnerStatus = true;

    this.auth.login(this.email, this.password, (result: any) => {
      if(result.success) {
        this.menuController.enable(true);
        this.email = '';
        this.password = '';

        this.auth.getInfo();
        this.auth.loadPermission();

        this.router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      } else {
        this.util.modalAlert('Action not Allowed', result.message);
      }

      this.loggedIn = false;
      this.util.setSpinnerStatus = false;
    });
  }
}
