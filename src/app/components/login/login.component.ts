// src/app/components/login/login.component.ts
import { Component }                        from '@angular/core';
import { Router }                           from '@angular/router';
import { CommonModule, NgIf }               from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { MatFormFieldModule }               from '@angular/material/form-field';
import { MatInputModule }                   from '@angular/material/input';
import { MatCardModule }                    from '@angular/material/card';
import { MatButtonModule }                  from '@angular/material/button';

import { AuthService }                      from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private auth:   AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if ( this.form.invalid ) {
      return;
    }
    const { email, password } = this.form.value;
    this.auth.signIn(email!, password!)
      .then(() => this.router.navigate(['/venues']))
      .catch((err: any) => alert('Hiba: ' + err.message));
  }
}
