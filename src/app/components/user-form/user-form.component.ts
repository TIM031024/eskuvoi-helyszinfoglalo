import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../services/user.service';
import { User } from '../../models';

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
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: Partial<User> = {
    name: '',
    email: '',
    phone: ''
  };

  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      // create új felhasználó a service segítségével
      this.userService.create(this.user as Omit<User, 'id'>)
        .then(() => {
          this.successMessage = 'Felhasználó sikeresen létrehozva.';
          this.errorMessage = '';
          form.resetForm();
          this.submitted = false;
        })
        .catch(err => {
          console.error('Hiba a felhasználó mentésekor:', err);
          this.errorMessage = 'Hiba történt a felhasználó létrehozásakor.';
        });
    }
  }
}
