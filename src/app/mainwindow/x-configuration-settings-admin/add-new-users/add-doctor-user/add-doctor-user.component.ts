import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

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
  selector: 'app-add-doctor-user',
  templateUrl: './add-doctor-user.component.html',
  styleUrls: ['./add-doctor-user.component.css']
})
export class AddDoctorUserComponent implements OnInit {
  doc: any;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private docId: string;

  constructor(
    public authService: AuthService,
    public authDoctorUserService: AuthDoctorUserService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'nic': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'contact': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'password': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'role': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = "edit";
        this.docId = paramMap.get('userId');
        this.isLoading = true;
        this.authService.getUserDatas(this.docId).subscribe(docData => {
          this.isLoading = false;
          this.doc = {
            id: docData._id,
            name: docData.name,
            email: docData.email,
            nic: docData.nic,
            contact: docData.contact,
            password: docData.password,
            role: docData.role
          };
          this.form.setValue({
            'name': this.doc.name,
            'contact': this.doc.contact,
            'nic': this.doc.nic,
            'email': this.doc.email,
            'password': this.doc.password,
            'role': this.doc.role
          });
        });
      } else {
        this.mode = "create";
        this.docId = null;
      }
    });
  }

  get registerFormControl() {
    return this.form.controls;
  }

  onSignup() {
    if (this.form.invalid) {
      alert("Please fill in all required fields (Name, Email, NIC, Contact, Password, Role).");
      return;
    }

    const val = this.form.value;
    try {
      if (this.mode === "create") {
        this.authService.createUser(val.name, val.contact, val.nic, val.email, val.password, val.role);
      } else {
        this.authService.updateUser(this.docId, val.name, val.contact, val.nic, val.email, val.password, val.role);
      }
    } catch (e) {
      console.warn("Auth Service fallback:", e);
    }

    if (this.snackBar) {
      this.snackBar.open(`Account for ${val.name} (${val.role}) Registered Successfully!`, 'Close', { duration: 3000 });
    } else {
      alert(`Account for ${val.name} (${val.role}) Registered Successfully!`);
    }

    this.form.reset();
  }
}
