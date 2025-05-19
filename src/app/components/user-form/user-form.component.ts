import { Component, OnInit } from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule, NgForm }  from '@angular/forms';
import { MatCardModule }        from '@angular/material/card';
import { MatFormFieldModule }   from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatButtonModule }      from '@angular/material/button';
import { Router }               from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User }        from '../../models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: Partial<User> & { password?: string } = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.valid && this.user.email && this.user.password) {
      this.authService
  .register(this.user.email!, this.user.password!)
  .then(cred => {
    if (!cred.user) throw new Error('Üres felhasználó a regisztrációnál.');
    const profile = {
      id: cred.user.uid,
      name: this.user.name!,
      email: this.user.email!,
      phone: this.user.phone ?? ''
    };
    return this.userService.create(profile);
  })
        .then(() => {
          this.successMessage = 'Regisztráció sikeres, beléptél!';
          this.router.navigate(['/venues']);
        })
        .catch(err => {
          console.error('Regisztrációs hiba:', err);
          this.errorMessage = err.message || 'Ismeretlen hiba a regisztráció során.';
        });
    }
  }
}
