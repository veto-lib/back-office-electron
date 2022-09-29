import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = {} as any;
    const token = this.auth.token;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const clone = request.clone({ setHeaders: headers });

    return next.handle(clone);
  }
}
