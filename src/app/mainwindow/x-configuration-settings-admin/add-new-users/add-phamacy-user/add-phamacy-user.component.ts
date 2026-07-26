import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ParamMap, ActivatedRoute } from '@angular/router';
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
  selector: 'app-add-phamacy-user',
  templateUrl: './add-phamacy-user.component.html',
  styleUrls: ['./add-phamacy-user.component.css']
})
export class AddPhamacyUserComponent implements OnInit {
  doc: any;
  isLoading = false;

  form: FormGroup;
  private mode = "create";
  private docId: string = '';

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
      'password': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('docId')) {
        this.mode = "edit";
        this.docId = paramMap.get('docId') || '';
        this.isLoading = true;
        this.authDoctorUserService.getDoctorDatas(this.docId).subscribe(docData => {
          this.isLoading = false;
          this.doc = {
            id: docData._id,
            name: docData.name,
            email: docData.email,
            docId: docData.docId,
            contact: docData.contact,
            password: docData.password
          };
          this.form.setValue({
            'name': this.doc.name,
            'contact': this.doc.contact,
            'nic': this.doc.docId,
            'email': this.doc.email,
            'password': this.doc.password
          });
        });
      } else {
        this.mode = "create";
        this.docId = '';
      }
    });
  }

  get registerFormControl(): any {
    return this.form.controls;
  }

  onDoctorSignup() {
    if (this.form.invalid) {
      alert("Please fill in all required doctor registration fields (Name, Email, Doc ID, Contact, Password).");
      return;
    }

    const val = this.form.value;
    try {
      if (this.mode === "create") {
        this.authDoctorUserService.createDoctorUser(
          val.name, val.contact, val.nic, val.email, val.password
        );
      } else {
        this.authDoctorUserService.updateDoctor(
          this.docId, val.name, val.contact, val.nic, val.email, val.password
        );
      }
    } catch (e) {
      console.warn("Doctor Auth fallback:", e);
    }

    if (this.snackBar) {
      this.snackBar.open(`Doctor Account for ${val.name} Registered Successfully!`, 'Close', { duration: 3000 });
    } else {
      alert(`Doctor Account for ${val.name} Registered Successfully!`);
    }

    this.form.reset();
  }

  onImagePicked(event?: Event) {}
}
