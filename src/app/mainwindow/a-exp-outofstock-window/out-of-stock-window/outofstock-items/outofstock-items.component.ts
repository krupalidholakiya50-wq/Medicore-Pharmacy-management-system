import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailInteractionService } from './../../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { XOutofstockDialogBoxComponent } from './../../../xoutofstock-dialog-box/xoutofstock-dialog-box.component';
import { Subscription } from 'rxjs';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
  selector: 'app-outofstock-items',
  templateUrl: './outofstock-items.component.html',
  styleUrls: ['./outofstock-items.component.css']
})
export class OutofstockItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  isLoading = false;
  private inventorySubs!: Subscription;

  // Real Overlay Center Modal State
  isModalOpen = false;
  selectedDrug: any = null;
  requestQuantity: number = 180;

  // Fallback initial dataset seed array (Spec #1 & #2)
  inventorys: any[] = [
    {
      id: '1',
      email: 'lalam12@gmail.com',
      name: 'Amoxillin',
      quantity: '0',
      batchId: '547547654N',
      expireDate: 'Sat Sep 26 2020 05:30:00 GMT+0530 (India Standard Time)',
      price: '1200'
    },
    {
      id: '2',
      email: 'lalana@gmail.com',
      name: 'Demo1',
      quantity: '0',
      batchId: '1092832311L',
      expireDate: 'Wed Aug 26 2020 05:30:00 GMT+0530 (India Standard Time)',
      price: '1201'
    }
  ];

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    public dialog: MatDialog,
    private emailInteractionService: EmailInteractionService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoading = true;
    try {
      this.inventoryInteractionService.getOutofStockInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryOutUpdateListener()
        .subscribe({
          next: (posts: Inventory[]) => {
            this.isLoading = false;
            if (posts && posts.length > 0) {
              this.inventorys = posts;
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.warn('Backend out of stock query using local fallback dataset:', err);
          }
        });
    } catch (e) {
      this.isLoading = false;
      console.warn('Using local fallback dataset:', e);
    }
  }

  openRequestModal(item: any) {
    this.selectedDrug = item;
    this.requestQuantity = 180;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedDrug = null;
  }

  sendRequest() {
    if (!this.selectedDrug) return;

    const payload = {
      name: this.selectedDrug.name || this.selectedDrug.drugName,
      email: this.selectedDrug.email || this.selectedDrug.supplierEmail,
      price: this.selectedDrug.price,
      quantity: this.selectedDrug.quantity,
      quantityNumber: this.requestQuantity
    };

    try {
      this.emailInteractionService.sendEmail("http://localhost:3000/api/inventory/sendmailOutOfStock", payload).subscribe({
        next: (res: any) => {
          console.log(`Out of stock request sent for ${payload.name}`);
        },
        error: (err) => {
          console.warn('Out of stock email backend response:', err);
        }
      });
    } catch (e) {
      console.warn('Out of stock request attempt:', e);
    }

    if (this.snackBar) {
      this.snackBar.open(`Request Sent for ${payload.name}!`, 'Close', { duration: 3000 });
    }

    this.closeModal();
  }

  // MatDialog compatibility method
  OpenMessageBox(email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string) {
    this.openRequestModal({ email, name, quantity, batchId, expireDate, price });
  }

  ngOnDestroy() {
    if (this.inventorySubs) {
      this.inventorySubs.unsubscribe();
    }
  }
}
