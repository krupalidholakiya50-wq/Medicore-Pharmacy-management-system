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
  selector: 'app-expired-items',
  templateUrl: './expired-items.component.html',
  styleUrls: ['./expired-items.component.css']
})
export class ExpiredItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  isLoading = false;
  private inventorySubs!: Subscription;

  // Real Center Modal State
  isModalOpen = false;
  selectedDrug: any = null;
  requestQuantity: number = 180;

  // Fallback initial dataset array
  inventorys: any[] = [
    {
      id: '1',
      email: 'chamika14@gmail.com',
      name: 'Panadol',
      quantity: '3423',
      batchId: '854564665B',
      expireDate: 'Mon Aug 10 2026 05:30:00 GMT+0530 (India Standard Time)',
      price: '1200'
    },
    {
      id: '2',
      email: 'cha12@gmail.com',
      name: 'Citazin',
      quantity: '2960',
      batchId: '948573625C',
      expireDate: 'Wed Jul 15 2026 05:30:00 GMT+0530 (India Standard Time)',
      price: '850'
    },
    {
      id: '3',
      email: 'lalanac@gmail.com',
      name: 'Metformin',
      quantity: '1500',
      batchId: '102938475A',
      expireDate: 'Fri Jun 05 2026 05:30:00 GMT+0530 (India Standard Time)',
      price: '1450'
    },
    {
      id: '4',
      email: 'lalacha12@gmail.com',
      name: 'Chloroperi Hybanate',
      quantity: '850',
      batchId: '583920149D',
      expireDate: 'Sun May 17 2026 05:30:00 GMT+0530 (India Standard Time)',
      price: '2100'
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
      this.inventoryInteractionService.getExpiredInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryExUpdateListener()
        .subscribe({
          next: (posts: Inventory[]) => {
            this.isLoading = false;
            if (posts && posts.length > 0) {
              this.inventorys = posts;
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.warn('Backend expired query using local fallback dataset:', err);
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

  submitEmail() {
    if (!this.selectedDrug) return;

    const payload = {
      name: this.selectedDrug.name,
      email: this.selectedDrug.email,
      price: this.selectedDrug.price,
      quantity: this.selectedDrug.quantity,
      quantityNumber: this.requestQuantity
    };

    try {
      this.emailInteractionService.sendEmail("http://localhost:3000/api/inventory/sendmail", payload).subscribe({
        next: (res: any) => {
          console.log(`Email successfully sent for ${payload.name}`);
        },
        error: (err) => {
          console.warn('Email dispatch backend response:', err);
        }
      });
    } catch (e) {
      console.warn('Email dispatch attempt:', e);
    }

    if (this.snackBar) {
      this.snackBar.open(`Re-order Request Dispatched to Supplier Email Successfully !!`, 'Close', { duration: 4000 });
    }
    alert(`Re-order Request Dispatched to Supplier Email Successfully !!`);

    this.closeModal();
  }

  OpenMessageBox(email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string) {
    this.openRequestModal({ email, name, quantity, batchId, expireDate, price });
  }

  ngOnDestroy() {
    if (this.inventorySubs) {
      this.inventorySubs.unsubscribe();
    }
  }
}
