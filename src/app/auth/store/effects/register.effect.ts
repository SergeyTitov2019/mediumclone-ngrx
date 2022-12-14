import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../register.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/currentUser.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token);
            this.persistenceService.set('accessToken', currentUser.token);
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerSuccessAction),
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
