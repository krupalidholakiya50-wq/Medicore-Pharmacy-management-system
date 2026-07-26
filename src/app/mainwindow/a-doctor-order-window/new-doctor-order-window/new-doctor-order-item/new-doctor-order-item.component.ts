import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalCoreStoreService, DoctorOrder } from '../../../../services/hospital-core-store.service';
import { EmailInteractionService } from '../email-Interaction.service';

@Component({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  standalone: true,
  selector: 'app-new-doctor-order-item',
  templateUrl: './new-doctor-order-item.component.html',
  styleUrls: ['./new-doctor-order-item.component.css']
})
export class NewDoctorOrderItemComponent implements OnInit, OnDestroy {
  docOders: any[] = [];
  isLoading = false;
  private storeSub!: Subscription;

  constructor(
    private storeService: HospitalCoreStoreService,
    private emailInteractionService: EmailInteractionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.storeSub = this.storeService.getOrders().subscribe(orders => {
      // Filter for 'New' orders
      this.docOders = orders.filter(o => o.status === 'New').map(o => ({
        id: o.id,
        doctorName: o.doctorName,
        doctorContact: o.doctorContact,
        doctorId: o.doctorId,
        doctorEmail: o.doctorEmail,
        drugName: o.drugs.map(d => d.name),
        drugPrice: o.drugs.map(d => d.price),
        drugQuantity: o.drugs.map(d => d.quantity),
        totalAmount: o.total,
        pickupDate: o.pickupDate
      }));
    });
  }

  onOderVerify(name: string, email: string, total: number, pickupDate: string, drugId: any[] = [], drugName: any[] = [], drugPrice: any[] = [], drugQuantity: any[] = [], realQuantity: any[] = [], doctorId: string, doctorContact: string, id: string) {
    this.storeService.verifyOrder(id);

    if (this.snackBar) {
      this.snackBar.open(`Order ${id} Verified Successfully for ${name}!`, 'Close', { duration: 3000 });
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
