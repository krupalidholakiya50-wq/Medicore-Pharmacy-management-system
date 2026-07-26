import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enteredEmail = '';
  enteredPassword = '';
  selectedRole = 'Admin';

  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.enteredEmail = params['email'];
      }
      if (params['password']) {
        this.enteredPassword = params['password'];
      }
      if (params['role']) {
        this.selectedRole = params['role'];
      }
    });
  }

  onLogin(form: NgForm) {
    const email = form.value.email || this.enteredEmail || 'admin@apex.org';
    const password = form.value.password || this.enteredPassword || '123456';

    if (this.snackBar) {
      this.snackBar.open("Logging in... Redirecting to Dashboard", "Close", { duration: 2000 });
    }

    this.authService.login(email, password);
  }
}
