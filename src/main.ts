import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
       (req, next) => {
          const authServ = inject(AuthService);
          const isApiUrl = req.url.startsWith(environment.baseUrl);
          if (authServ.userToken && isApiUrl) {
              req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem(AuthService.tokenKey)}`,
                    Basic: 'webapp'
                  }
              });
          }

          return next(req);
        },
      ])
    ),
  ],
});
