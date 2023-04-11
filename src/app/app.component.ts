import { Component, EnvironmentInjector, Inject, ViewChild, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  public isDarkMode: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');

    //check if system is on light.
    const isLight: boolean = prefersDark.matches;
    console.log("System theme is "+(isLight?'light':'dark'));

    this.checkTheme();
  }

  checkTheme() {
    const themeSet = localStorage.getItem('app-color-scheme');
    const curTheme = themeSet ? themeSet : 'auto';

    if(curTheme !== 'auto') {
      var onDark: boolean = curTheme=='dark'?true:false;
      this.isDarkMode = onDark;
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
  }
}
