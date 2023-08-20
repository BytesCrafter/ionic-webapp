import { Component, EnvironmentInjector, Inject, inject, HostListener } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { UtilService } from './services/util.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, NgxLoadingModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  public isDarkMode: boolean = false;
  public isloading: boolean = false;

  constructor(
    private router: Router,
    private util: UtilService,
    private auth: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    let onboarded = localStorage.getItem('app-onboarding-completed');
    if(!onboarded) {
      this.router.navigate(['/onboarding']);
    }

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    //check if system is on light.
    const isLight: boolean = prefersDark.matches;
    console.log("System theme is "+(isLight?'light':'dark'));

    this.checkTheme();

    //Only load if app is reloaded.
    this.auth.getInfo();
    this.auth.loadPermission();
  }

  checkTheme() {
    const themeSet = localStorage.getItem('app-color-scheme');
    const curTheme = themeSet ? themeSet : 'auto';

    if(curTheme !== 'auto') {
      var onDark: boolean = curTheme=='dark'?true:false;
      this.changeTheme(onDark);
    }
  }

  switchTheme(event: any) {
    this.changeTheme(event.detail.checked);
  }

  changeTheme(toDark: boolean = false) {
    //Change the theme state.
    this.document.body.classList.remove(toDark?'light':'dark'); //change theme
    this.document.body.classList.add(toDark?'dark':'light'); //change theme

    //save the theme state
    const isDark = this.document.body.classList.contains('dark');
    localStorage.setItem('app-color-scheme', isDark?'dark':'light');
    this.isDarkMode = isDark?true:false;
  }

  @HostListener('document:keydown.control.shift.alt', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.changeTheme(!this.isDarkMode);
  }
}
