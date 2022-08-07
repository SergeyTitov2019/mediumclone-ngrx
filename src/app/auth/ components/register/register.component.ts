import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    console.log('initializeForm');
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('submit', this.form.value, this.form.valid);
  }
}
