import { enableProdMode, importProvidersFrom, inject, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './app/services/auth.service';
import { ServiceWorkerModule } from '@angular/service-worker';

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
          if (authServ.isAuthenticated && isApiUrl) {
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

importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}));
