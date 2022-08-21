import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/currentUser.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/loging.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token);
            this.persistenceService.set('accessToken', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          console.log('success');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private persistenceService: PersistanceService,
    private router: Router
  ) {}
}
