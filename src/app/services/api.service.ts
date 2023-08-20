import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any = '';

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.baseUrl;
  }

  post(url: string, body: any) {
    const authKey: any = localStorage.getItem(AuthService.tokenKey) === null ?
      environment.authToken : localStorage.getItem(AuthService.tokenKey);
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Basic', authKey)
    };

    //body.businext_csrf_token = localStorage.getItem('businext_csrf_token');
    const param = this.jsonUrlEncode(body);
    return this.http.post(this.baseUrl + url, param, header);
  }

  public posts(url: string, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const authKey: any = localStorage.getItem(AuthService.tokenKey) === null ?
        environment.authToken : localStorage.getItem(AuthService.tokenKey);
      const header = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Basic', authKey)
      };
      const param = this.jsonUrlEncode(body);
      this.http.post(this.baseUrl + url, param, header).subscribe((data) => {
        resolve(data);
      }, error => {
        resolve(error);
      });
    });
  }

  externalPost(url: string, body: any, key: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${key}`)
    };
    const param = this.jsonUrlEncode(body);
    return this.http.post(url, param, header);
  }

  get(url: string) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Basic', `${environment.authToken}`)
    };
    return this.http.get(this.baseUrl + url, header);
  }

  externalGet(url: string) {
    return this.http.get(url);
  }

  jsonUrlEncode(element: any, key: any = null, list: any = null) {
    let newList = list || [];
    if (typeof element === 'object') {
      for (let idx in element) {
        this.jsonUrlEncode(
          element[idx],
          key ? key + '[' + idx + ']' : idx,
          newList
        );
      }
    } else {
      newList.push(key + '=' + encodeURIComponent(element));
    }
    return newList.join('&');
  }
}
