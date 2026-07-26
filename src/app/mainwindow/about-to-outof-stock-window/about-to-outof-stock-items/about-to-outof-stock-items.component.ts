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
  selector: 'app-about-to-outof-stock-items',
  templateUrl: './about-to-outof-stock-items.component.html',
  styleUrls: ['./about-to-outof-stock-items.component.css']
})
export class AboutToOutofStockItemsComponent implements OnInit, OnDestroy {
  inventorys: any[] = [
    { name: 'Demo1', batchId: 'DEM-2026E', supplier: 'Sejal Gond', stock: '4 Units' },
    { name: 'Citazin', batchId: 'CTZ-2026B', supplier: 'Janvi Ramani', stock: '148 Units' }
  ];
  isLoading = false;
  selectedItem: any = null;
  private inventorySubs!: Subscription;

  constructor(private inventoryInteractionService: InventoryInteractionService) {}

  ngOnInit() {
    this.isLoading = true;
    try {
      this.inventoryInteractionService.getAboutToOutofStockInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryAOutUpdateListener()
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
