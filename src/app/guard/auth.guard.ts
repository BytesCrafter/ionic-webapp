import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {
    const uid = localStorage.getItem(AuthService.tokenKey);
    if (uid && uid != null && uid !== 'null') {
      this.auth.getInfo(); //Get user data.
      this.api.posts('users/refresh', null)
      .then((res: any) => { console.log();
        if(res.status === 401) {
          localStorage.clear();
          this.router.navigate([`/login`]);
        }

        if(res.success) {
          this.auth.setToken = res.data;
        }
      }).catch(error => {
        console.log('error', error);
      });
    }

  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const uid = localStorage.getItem(AuthService.tokenKey);
      if (uid && uid != null && uid !== 'null') {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
  }
}
