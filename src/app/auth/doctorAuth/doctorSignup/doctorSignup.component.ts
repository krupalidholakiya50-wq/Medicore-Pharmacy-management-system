import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthDoctorUserService } from '../authDoctorUser.service';

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
  templateUrl: './doctorSignup.component.html',
  styleUrls: ['./doctorSignup.component.css']
})
export class DoctorSignupComponent {
  constructor(
    public authDoctorUserService: AuthDoctorUserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onDoctorSignup(form: NgForm) {
    if (form.invalid) {
      if (this.snackBar) {
        this.snackBar.open("Please fill in all required doctor signup fields.", "Close", { duration: 3000 });
      }
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const docId = form.value.docId || form.value.nic || 'DOC-101';

    this.authDoctorUserService.createDoctorUser(
      form.value.name,
      form.value.contact,
      docId,
      email,
      password
    );

    if (this.snackBar) {
      this.snackBar.open("Doctor Registration Successful! Redirecting to Doctor Login...", "Close", { duration: 3000 });
    }

    this.router.navigate(['/doctorLogin'], {
      queryParams: { email, password, docId }
    });
  }

  onImagePicked(event?: Event) {}
}
