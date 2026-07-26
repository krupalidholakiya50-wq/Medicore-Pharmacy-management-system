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
import { EmailInteractionService } from './../../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

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
  selector: 'app-expiredate-window-item',
  templateUrl: './expiredate-window-item.component.html',
  styleUrls: ['./expiredate-window-item.component.css']
})
export class ExpiredateWindowItemComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  inventorys: any[] = [
    { name: 'Panadol', batchId: 'PND-2026A', supplier: 'Krupali Dholakiya', stock: '2,960 Units' },
    { name: 'Citazin', batchId: 'CTZ-2026B', supplier: 'Janvi Ramani', selected: true, stock: '148 Units' },
    { name: 'Metformin', batchId: 'MET-2026C', supplier: 'Sejal Gond', stock: '1,500 Units' },
    { name: 'Chloroperi Hybanate', batchId: 'CPH-2026F', supplier: 'Krupali Dholakiya', stock: '850 Units' }
  ];
  isLoading = false;
  selectedItem: any = null;
  private inventorySubs!: Subscription;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private emailInteractionService: EmailInteractionService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    try {
      this.inventoryInteractionService.getExpiredInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryExUpdateListener()
        .subscribe((posts: Inventory[]) => {
          this.isLoading = false;
          if (posts && posts.length > 0) {
            this.inventorys = posts;
          }
        });
    } catch (e) {
      this.isLoading = false;
    }
  }

  openMedicineActionModal(item: any): void {
    this.selectedItem = item;
  }

  closeModal(): void {
    this.selectedItem = null;
  }

  dispatchEmergencyOrder(): void {
    alert("Emergency Re-Order Dispatched to Supplier Email Successfully !!");
    this.closeModal();
  }

  ngOnDestroy() {
    if (this.inventorySubs) {
      this.inventorySubs.unsubscribe();
    }
  }
}
