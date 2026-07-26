import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthDoctorUserService } from 'src/app/auth/doctorAuth/authDoctorUser.service';

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
  selector: 'app-manage-doctor-account',
  templateUrl: './manage-doctor-account.component.html',
  styleUrls: ['./manage-doctor-account.component.css']
})
export class ManageDoctorAccountComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  doctors: any[] = [
    { id: 'DOC-101', name: 'Dr. Krupali Dholakiya', email: 'krupali@apex.org', contact: '+91 98250 12345', nic: 'DOC-CARD-101', role: 'Chief Cardiologist' },
    { id: 'DOC-102', name: 'Dr. Janvi Ramani', email: 'janvi.ramani@apex.org', contact: '+91 97129 67890', nic: 'DOC-NEURO-102', role: 'Head Neurologist' },
    { id: 'DOC-103', name: 'Dr. Sejal Gond', email: 'sejal.gond@apex.org', contact: '+91 98980 11223', nic: 'DOC-ORTHO-103', role: 'Senior Orthopedist' }
  ];
  isLoading = false;
  userSubs!: Subscription;

  constructor(private authDoctorUserService: AuthDoctorUserService) {}

  ngOnInit() {
    this.isLoading = true;
    try {
      this.authDoctorUserService.getDoctorData();
      this.userSubs = this.authDoctorUserService.getDoctorUpdateListener()
        .subscribe((posts) => {
          this.isLoading = false;
          if (posts && posts.length > 0) {
            this.doctors = posts;
          }
        });
    } catch (e) {
      this.isLoading = false;
    }
  }

  onDelete(id: string) {
    this.doctors = this.doctors.filter(d => d.id !== id);
    alert(`Doctor Account ${id} Decommissioned Successfully!`);
  }

  ngOnDestroy() {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
