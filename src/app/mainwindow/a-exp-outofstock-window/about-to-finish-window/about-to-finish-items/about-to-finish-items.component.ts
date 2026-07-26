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
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { HospitalCoreStoreService } from '../../../../services/hospital-core-store.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';

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
  selector: 'app-about-to-finish-items',
  templateUrl: './about-to-finish-items.component.html',
  styleUrls: ['./about-to-finish-items.component.css']
})
export class AboutToFinishItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  inventorys: any[] = [
    {
      id: "FIN-101",
      email: "sejal.gond@gmail.com",
      name: "Amoxillin 250mg Capsules",
      quantity: 5,
      batchId: "AMX-2026B",
      expireDate: "2026-11-20",
      price: 1200
    },
    {
      id: "FIN-102",
      email: "krupali@gmail.com",
      name: "Demo1 Emergency Vials",
      quantity: 4,
      batchId: "DEM-2026E",
      expireDate: "2026-10-15",
      price: 850
    },
    {
      id: "FIN-103",
      email: "janvi.ramani@gmail.com",
      name: "Citazin 10mg Tablets",
      quantity: 8,
      batchId: "CTZ-2026B",
      expireDate: "2026-12-05",
      price: 1200
    },
    {
      id: "FIN-104",
      email: "janvi.ramani@gmail.com",
      name: "Salvitamol 2mg Syrup",
      quantity: 6,
      batchId: "SLV-2026C",
      expireDate: "2026-10-30",
      price: 950
    }
  ];

  isLoading = false;
  private inventorySubs!: Subscription;
  private storeSub!: Subscription;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private storeService: HospitalCoreStoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = false;

    // Subscribe to master store inventory filtered by quantity < 10
    this.storeSub = this.storeService.getInventory().subscribe(items => {
      if (items && items.length > 0) {
        items.filter(item => Number(item.quantity) < 10).forEach(item => {
          if (!this.inventorys.some(f => f.batchId === item.batchId || f.name === item.name)) {
            this.inventorys.unshift({
              id: item.id,
              email: item.supplier || item.email || 'supplier@apex.org',
              name: item.drugName || item.name,
              quantity: item.quantity,
              batchId: item.batchId || 'BAT-FIN-101',
              expireDate: item.expiryDate || item.expireDate || '2026-12-31',
              price: item.price
            });
          }
        });
      }
    });

    try {
      this.inventoryInteractionService.getAboutToOutofStockInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryAOutUpdateListener()
        .subscribe((posts: Inventory[]) => {
          if (posts && posts.length > 0) {
            posts.forEach(p => {
              if (!this.inventorys.some(f => f.id === p.id || f.batchId === p.batchId)) {
                this.inventorys.unshift({
                  id: p.id,
                  email: p.email,
                  name: p.name,
                  quantity: p.quantity,
                  batchId: p.batchId,
                  expireDate: p.expireDate,
                  price: p.price
                });
              }
            });
          }
        });
    } catch (e) {
      console.warn("About to finish fallback:", e);
    }
  }

  onReorder(item: any) {
    if (this.snackBar) {
      this.snackBar.open(`Emergency Re-Order Dispatched to ${item.email} for ${item.name} Successfully !!`, 'Close', { duration: 4000 });
    } else {
      alert(`Emergency Re-Order Dispatched to ${item.email} for ${item.name} Successfully !!`);
    }
  }

  ngOnDestroy() {
    if (this.inventorySubs) this.inventorySubs.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
