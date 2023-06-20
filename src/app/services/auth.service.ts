import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilService } from './util.service';
import { Token } from '../model/token.model';
import { Permission } from '../model/permission.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static tokenKey: any = 'syntry-token';

  private tokenSubject: BehaviorSubject<Token>;
  private tokenObservable: Observable<Token>;

  private permitSubject: BehaviorSubject<Permission>;
  private permitObservable: Observable<Permission>;

  constructor(
    private router: Router,
    private api: ApiService,
    private util: UtilService,
  ) {
    const jwtHash = localStorage.getItem(AuthService.tokenKey);

    this.tokenSubject = new BehaviorSubject<Token>(new Token());
    this.tokenObservable = this.tokenSubject.asObservable();

    this.permitSubject = new BehaviorSubject<Permission>(new Permission());
    this.permitObservable = this.permitSubject.asObservable();
  }

  public get isAuthenticated(): boolean {
    const jwtHash = localStorage.getItem(AuthService.tokenKey);
    if(jwtHash == null || jwtHash === '') {
      return false;
    }

    return true;
  }

  public get userPermits(): Permission {
    if(this.isAuthenticated && typeof this.permitSubject.value !== 'undefined') {
      return this.permitSubject.value;
    }

    return new Permission();
  }

  public get userToken(): Token {
    if(this.isAuthenticated) {
      const user: Token = new Token();
      const userInfo: any = localStorage.getItem(AuthService.tokenKey+'-userinfo');
      user.setInfo( JSON.parse(userInfo) );
      this.tokenSubject.next(user);
      return this.tokenSubject.value;
    }

    return new Token();
  }

  public set setToken(jwtHash: string) {
    localStorage.setItem(AuthService.tokenKey, jwtHash);
  }

  getInfo() {
    this.api.posts('users/get_user_info', {}).then((res: any) => {
      if(res && res.success === true && res.data) {
        this.tokenSubject.next( (new Token()).setInfo(res.data) );
        localStorage.setItem(AuthService.tokenKey+'-userinfo', JSON.stringify(this.tokenSubject.value));
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  login(username: string, password: string, callback: any) {
    this.api.posts('users/signin', {
      email: username,
      pword: password
    }).then((res: any) => {
      if(res && res.success === true && res.data) {
        localStorage.setItem(AuthService.tokenKey, res.data);
        const decoded: Token = this.util.jwtDecode(res.data);
        callback({ success: res.success, data: decoded });
      } else {
        callback({ success: res.success, message: res.message });
      }

    }).catch(error => {
      console.log('error', error);
      callback({ success: false, message: 'Something went wrong!' });
    });
  }

  loadPermission() {
    if(!this.isAuthenticated) {
      return;
    }

    //If user have manage timecard then add
    this.api.posts('users/permissions', null)
    .then( (response: any) => {
      if(response && response.success && response.data) {
        this.permitSubject.next(response.data);
      } else {
        this.router.navigate([`/error`], {
          skipLocationChange: true
        });
      }
    }).catch(error => {
      console.log('error', error);
    });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem(AuthService.tokenKey);

      localStorage.removeItem(AuthService.tokenKey+'-userinfo');
      this.tokenSubject.next(new Token());
      this.router.navigate(['/login']);
  }
}
