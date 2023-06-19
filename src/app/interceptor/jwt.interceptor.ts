import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.auth.userToken;
    const isLoggedIn = user;
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem(AuthService.tokenKey)}`,
              Basic: 'mobile'
            }
        });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          //console.log(event.status);
        }
      }, error => {
          //console.error(error.status);
          //console.error(error.message);
      })
    );

  }
}
