import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../../types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backendErrorMessage.html',
  styleUrls: ['./backendErrorMessage.css'],
})
export class BackendErrorMessageComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface;

  errorMessages: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(',');
        return `${name} ${messages}`;
      }
    );
  }
}

/****
 *
 *  Object.keys вернет нам массив строк ключей
 *
 * ****/
