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
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { HospitalCoreStoreService } from '../../../../services/hospital-core-store.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inventory } from 'src/app/mainwindow/a-inventory-window/inventory.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { XExpiredDialogBoxComponent } from 'src/app/mainwindow/x-expired-dialog-box/x-expired-dialog-box.component';

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
  selector: 'app-about-to-expire-items',
  templateUrl: './about-to-expire-items.component.html',
  styleUrls: ['./about-to-expire-items.component.css']
})
export class AboutToExpireItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  inventoryis: any[] = [
    {
      id: "EXP-101",
      email: "krupali@gmail.com",
      name: "Citazin 10mg Tablets",
      quantity: 45,
      batchId: "BAT-9901",
      expireDate: "2026-08-15",
      price: 1200
    },
    {
      id: "EXP-102",
      email: "janvi.ramani@gmail.com",
      name: "Salvitamol 2mg Syrup",
      quantity: 20,
      batchId: "BAT-8821",
      expireDate: "2026-08-30",
      price: 950
    },
    {
      id: "EXP-103",
      email: "sejal.gond@gmail.com",
      name: "Panadol 500mg Extra",
      quantity: 110,
      batchId: "BAT-7712",
      expireDate: "2026-09-10",
      price: 1200
    },
    {
      id: "EXP-104",
      email: "krupali@gmail.com",
      name: "Metformin 850mg",
      quantity: 35,
      batchId: "BAT-6651",
      expireDate: "2026-09-25",
      price: 1400
    }
  ];

  isLoading = false;
  private inventorySubs!: Subscription;
  private storeSub!: Subscription;
  displayConfirmBox = false;
  displayMain = true;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private storeService: HospitalCoreStoreService,
    public dialog: MatDialog,
    private emailInteractionService: EmailInteractionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = false;

    // Subscribe to master store inventory
    this.storeSub = this.storeService.getInventory().subscribe(items => {
      if (items && items.length > 0) {
        items.forEach(item => {
          if (!this.inventoryis.some(e => e.batchId === item.batchId || e.name === item.name)) {
            this.inventoryis.push({
              id: item.id,
              email: item.supplier || item.email || 'supplier@apex.org',
              name: item.drugName || item.name,
              quantity: item.quantity,
              batchId: item.batchId || 'BAT-101',
              expireDate: item.expiryDate || item.expireDate || '2026-09-30',
              price: item.price
            });
          }
        });
      }
    });

    try {
      this.inventoryInteractionService.getAboutToExpireInventory();
      this.inventorySubs = this.inventoryInteractionService.getInventoryAExUpdateListener()
        .subscribe((posts: Inventory[]) => {
          if (posts && posts.length > 0) {
            posts.forEach(p => {
              if (!this.inventoryis.some(e => e.id === p.id || e.batchId === p.batchId)) {
                this.inventoryis.push({
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
      console.warn("About to expire fallback:", e);
    }
  }

  calcRemainingDays(expireDate: string) {
    if (!expireDate) return 45;
    let expDate = new Date(expireDate);
    let currentDate = new Date();
    let diff = expDate.getTime() - currentDate.getTime();
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : Math.abs(days);
  }

  OpenMessageBox(email: string, name: string, quantity: string, batchId: string, expireDate: string, price: string) {
    if (this.snackBar) {
      this.snackBar.open(`Re-order Request Dispatched to ${email} for ${name} Successfully !!`, 'Close', { duration: 4000 });
    }

    try {
      let dialogRef = this.dialog.open(XExpiredDialogBoxComponent, {
        data: { email, name, quantity, batchId, expireDate, price }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog results: ${result}`);
      });
    } catch (e) {
      console.warn("Dialog launch fallback:", e);
    }
  }

  ClickYes() {
    this.displayMain = false;
  }

  ClickNo() {
    this.displayConfirmBox = false;
  }

  ngOnDestroy() {
    if (this.inventorySubs) this.inventorySubs.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
  }
}
