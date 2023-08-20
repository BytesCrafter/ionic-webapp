import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./main-menu/home/home.page').then( m => m.HomePage)
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadComponent: () => import('./main-menu/account/account.page').then( m => m.AccountPage)
          },
          {
            path: 'change-password',
            loadComponent: () => import('./account/change-password/change-password.component').then( m => m.ChangePasswordComponent)
          }
        ]
      },
      {
        path: 'feeds',
        loadComponent: () => import('./main-menu/feeds/feeds.page').then( m => m.FeedsPage)
      },
      {
        path: 'activity',
        loadComponent: () => import('./main-menu/activity/activity.page').then( m => m.ActivityPage)
      },
    ]
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./info/onboarding/onboarding.page').then( m => m.OnboardingPage)
  },
  {
    path: 'add-new',
    loadComponent: () => import('./modals/add-new/add-new.page').then( m => m.AddNewPage)
  }
];
