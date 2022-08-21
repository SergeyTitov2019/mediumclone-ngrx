import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './ components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducer';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessageModule } from '../shared/modules/backendErrorMessages/backendErrorMessage.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginEffect } from './store/effects/login.effect';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
    BackendErrorMessageModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
