import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-verified-doctor-order-item',
  templateUrl: './verified-doctor-order-item.component.html',
  styleUrls: ['./verified-doctor-order-item.component.css']
})
export class VerifiedDoctorOrderItemComponent implements OnInit, OnDestroy {
  docOders: any[] = [];
  isLoading = false;
  private storeSub!: Subscription;

  constructor(
    private storeService: HospitalCoreStoreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.storeSub = this.storeService.getOrders().subscribe(orders => {
      this.docOders = orders.filter(o => o.status === 'Verified').map(o => ({
        id: o.id,
        doctorName: o.doctorName,
        doctorContact: o.doctorContact,
        doctorId: o.doctorId,
        doctorEmail: o.doctorEmail,
        drugId: o.drugs.map((d: any) => d.id || 'D101'),
        drugName: o.drugs.map(d => d.name),
        drugPrice: o.drugs.map(d => d.price),
        drugQuantity: o.drugs.map(d => d.quantity),
        realQuantity: o.drugs.map(d => d.quantity),
        totalAmount: o.total,
        pickupDate: o.pickupDate
      }));
    });
  }

  onPickup(name: string, email: string, total: number, pickupDate: string, drugId: any[] = [], drugName: any[] = [], drugPrice: any[] = [], drugQuantity: any[] = [], realQuantity: any[] = [], doctorId: string, doctorContact: string, id: string) {
    this.storeService.pickUpOrder(id);

    if (this.snackBar) {
      this.snackBar.open(`Order ${id} Picked Up Successfully by ${name}!`, 'Close', { duration: 3000 });
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
