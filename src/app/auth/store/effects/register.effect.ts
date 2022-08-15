import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../register.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/currentUser.interface';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
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

  constructor(private action$: Actions, private authService: AuthService) {}
}
