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
  selector: 'app-manage-cashier-account',
  templateUrl: './manage-cashier-account.component.html',
  styleUrls: ['./manage-cashier-account.component.css']
})
export class ManageCashierAccountComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  users: any[] = [
    { id: 'CSH-101', name: 'Rohan Verma', email: 'rohan.verma@gmail.com', contact: '+91 98999 44556', nic: 'CASH-1102', role: 'Head Cashier' },
    { id: 'CSH-102', name: 'Pooja Patel', email: 'pooja.patel@gmail.com', contact: '+91 97111 22334', nic: 'CASH-2291', role: 'Billing Cashier' }
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
    alert(`Cashier Account ${id} Decommissioned Successfully!`);
  }

  ngOnDestroy() {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
