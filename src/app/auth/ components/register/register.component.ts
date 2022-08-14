import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { props, select, Store } from '@ngrx/store';
import { ActionTypes } from '../../store/action-types';
import { registerAction } from '../../store/register.actions';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selector';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/currentUser.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup;
  isSubmitting$: Observable<boolean>;

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
  }
  initializeForm(): void {
    console.log('initializeForm');
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: RegisterRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(registerAction({ request }));
    // this.authService
    //   .register(this.form.value)
    //   .subscribe((currentUser: CurrentUserInterface) =>
    //     console.log('currentUser:', currentUser)
    //   );
  }

  private initializeValue() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    console.log('this.isSubmitting$ ', this.isSubmitting$);
  }
}
