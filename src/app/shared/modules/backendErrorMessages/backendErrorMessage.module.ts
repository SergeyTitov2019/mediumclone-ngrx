import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessageComponent } from './components/backendErrorMessage';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessageComponent],
  exports: [BackendErrorMessageComponent],
})
export class BackendErrorMessageModule {}
