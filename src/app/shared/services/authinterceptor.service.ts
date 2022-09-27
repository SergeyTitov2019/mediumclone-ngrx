import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistanceService } from './persistance.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private persistenceService: PersistanceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.get('accessToken');
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Token::  ${token}` : '',
      },
    });
    return next.handle(request);
  }
}
