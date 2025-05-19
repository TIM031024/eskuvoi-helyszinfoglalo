import { Component, OnInit } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule, NgForm }     from '@angular/forms';
import { MatCardModule }           from '@angular/material/card';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatButtonModule }         from '@angular/material/button';
import { Router }                  from '@angular/router';

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

  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (form.valid && this.user.email && this.user.password) {
      // 1) Hozzuk létre az Auth felhasználót
      this.authService.register(this.user.email, this.user.password)
        .then(cred => {
          const profile: User = {
            id:    cred.user.uid,
            name:  this.user.name!,
            email: this.user.email!,
            phone: this.user.phone
          };
          return this.userService.create(profile);
        })
        .then(() => {
          this.successMessage = 'Regisztráció sikeres! Be vagy jelentkezve.';
          // Ha szeretnéd, azonnal átirányítod a főoldalra:
          this.router.navigate(['/venues']);
        })
        .catch(err => {
          console.error('Regisztráció hiba:', err);
          this.errorMessage = err.message || 'Hiba a regisztráció során.';
        });
    }
  }
}
