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
  selector: 'app-pickup-order-item',
  templateUrl: './pickup-order-item.component.html',
  styleUrls: ['./pickup-order-item.component.css']
})
export class PickupOrderItemComponent implements OnInit, OnDestroy {
  docPickedUpOders: any[] = [];
  isLoading = false;
  private storeSub!: Subscription;

  constructor(private storeService: HospitalCoreStoreService) {}

  ngOnInit() {
    this.storeSub = this.storeService.getOrders().subscribe(orders => {
      this.docPickedUpOders = orders.filter(o => o.status === 'PickedUp').map(o => ({
        id: o.id,
        doctorName: o.doctorName,
        doctorContact: o.doctorContact,
        doctorId: o.doctorId,
        doctorEmail: o.doctorEmail,
        drugId: o.drugs.map((d: any) => d.id || 'D101'),
        drugName: o.drugs.map(d => d.name),
        drugPrice: o.drugs.map(d => d.price),
        drugQuantity: o.drugs.map(d => d.quantity),
        totalAmount: o.total,
        pickupDate: o.pickupDate,
        acctualDate: new Date().toISOString().split('T')[0]
      }));
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
