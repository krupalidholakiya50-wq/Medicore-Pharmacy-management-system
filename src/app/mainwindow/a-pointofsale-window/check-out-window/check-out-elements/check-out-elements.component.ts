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
import { Component, OnInit } from '@angular/core';
import { HospitalCoreStoreService } from '../../../../services/hospital-core-store.service';

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
  selector: 'app-check-out-elements',
  templateUrl: './check-out-elements.component.html',
  styleUrls: ['./check-out-elements.component.css']
})
export class CheckOutElementsComponent implements OnInit {
  totalAmount: number = 3600;
  taxAmount: number = 180;
  paidAmount: number = 4000;
  balance: number = 220;

  constructor(private storeService: HospitalCoreStoreService) {}

  ngOnInit() {
    this.calculateBalance();
  }

  // Dynamic Keyup/Change Accounting: Balance = Paid Amount - (Total + Tax)
  calculateBalance() {
    const totalWithTax = (Number(this.totalAmount) || 0) + (Number(this.taxAmount) || 0);
    const paid = Number(this.paidAmount) || 0;
    this.balance = paid - totalWithTax;
  }

  printBill() {
    // 1. Record Sale transaction log in central store
    this.storeService.recordSale({
      id: 'SALE-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      totalAmount: this.totalAmount + this.taxAmount,
      itemsCount: 3,
      paymentMethod: 'Cash'
    });

    // 2. Deduct purchased items from Inventory live stocks
    this.storeService.deductStock('Panadol', 2);
    this.storeService.deductStock('Citazin', 1);

    // 3. Trigger receipt stream print window
    window.print();
  }
}
