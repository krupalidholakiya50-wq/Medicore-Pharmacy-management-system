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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HospitalCoreStoreService, InventoryItem } from '../../../../services/hospital-core-store.service';
import { InventoryInteractionService } from '../../inventory-interaction.service';

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
  selector: 'app-drug-inventory-items',
  templateUrl: './drug-inventory-items.component.html',
  styleUrls: ['./drug-inventory-items.component.css']
})
export class DrugInventoryItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  inventorys: InventoryItem[] = [];
  isLoading = false;
  selectedItem: any = null;
  private storeSub!: Subscription;

  constructor(
    private storeService: HospitalCoreStoreService,
    private inventoryInteractionService: InventoryInteractionService
  ) {}

  ngOnInit() {
    this.storeSub = this.storeService.getInventory().subscribe(items => {
      this.inventorys = items;
    });
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

  onDelete(id: string): void {
    this.inventorys = this.inventorys.filter(i => i.id !== id);
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
