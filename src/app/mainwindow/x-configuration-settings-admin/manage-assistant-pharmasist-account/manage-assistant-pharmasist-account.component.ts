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
import { AuthService } from 'src/app/auth/auth.service';

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
  selector: 'app-manage-assistant-pharmasist-account',
  templateUrl: './manage-assistant-pharmasist-account.component.html',
  styleUrls: ['./manage-assistant-pharmasist-account.component.css']
})
export class ManageAssistantPharmasistAccountComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  users: any[] = [
    { id: 'PH-101', name: 'Janvi Ramani', email: 'janvi.ramani@gmail.com', contact: '+91 97129 67890', nic: 'PHARM-8821', role: 'Head Pharmacist' },
    { id: 'PH-102', name: 'Sejal Gond', email: 'sejal.gond@gmail.com', contact: '+91 98980 11223', nic: 'PHARM-9912', role: 'Senior Pharmacist' },
    { id: 'PH-103', name: 'Amit Patel', email: 'amit.patel@gmail.com', contact: '+91 98240 55667', nic: 'PHARM-4451', role: 'Assistant Pharmacist' }
  ];
  isLoading = false;
  userSubs!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    try {
      this.authService.getUser();
      this.userSubs = this.authService.getUserUpdateListener()
        .subscribe((posts) => {
          this.isLoading = false;
          if (posts && posts.length > 0) {
            this.users = posts;
          }
        });
    } catch (e) {
      this.isLoading = false;
    }
  }

  onDelete(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    alert(`Pharmacy User Account ${id} Decommissioned Successfully!`);
  }

  ngOnDestroy() {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
