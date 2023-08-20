import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

export const authGuard = () => {
  const router = inject(Router);
  const authServ = inject(AuthService);
  const apiServ = inject(ApiService);

  //authServ.getInfo(); //Get user data.
  apiServ.posts('users/refresh', null)
  .then((res: any) => { console.log();
    if(res.status === 401) {
      authServ.logout();
    }

    if(res.success) {
      authServ.setToken = res.data;
    }
  }).catch(error => {
    console.log('error', error);
  });

  if(!authServ.isAuthenticated) {
    router.navigate([`/login`]);
  }

  return true;
}
