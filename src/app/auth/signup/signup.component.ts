import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatFormFieldModule,
  ],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      if (this.snackBar) {
        this.snackBar.open("Please fill in all required registration fields.", "Close", { duration: 3000 });
      }
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role || 'Admin';

    this.authService.createUser(
      form.value.name,
      form.value.contact,
      form.value.nic,
      email,
      password,
      role
    );

    if (this.snackBar) {
      this.snackBar.open("Registration Successful! Redirecting to Login...", "Close", { duration: 3000 });
    }

    this.router.navigate(['/login'], {
      queryParams: { email, password, role }
    });
  }
}
