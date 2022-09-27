import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { props, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  isSubmittingSelector,
  validationErrorSelector,
} from '../../store/selector';
import { AuthService } from '../../services/auth.service';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { loginAction } from '../../store/actions/loging.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  isSubmitting$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
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
      email: '',
      password: '',
    });
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: LoginRequestInterface = {
      user: this.form.value,
    };
    this.store.dispatch(loginAction({ request }));
  }

  private initializeValue() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }
}
