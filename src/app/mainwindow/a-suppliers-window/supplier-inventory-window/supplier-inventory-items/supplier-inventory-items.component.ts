import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SupplierFilterPipe } from '../../supplier-filter.pipe';
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
import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Supplier } from '../../supplier.model';
import { AuthService } from 'src/app/auth/auth.service';

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
    SupplierFilterPipe,
  ],
  standalone: true,
  selector: 'app-supplier-inventory-items',
  templateUrl: './supplier-inventory-items.component.html',
  styleUrls: ['./supplier-inventory-items.component.css']
})
export class SupplierInventoryItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  isLoading = false;
  userIsAuthenticated = true;

  suppliers: any[] = [
    { supplierId: "18237823V", name: "Krupali Dholakiya", email: "krupali@gmail.com", contact: "07161893612", drugsAvailable: "Dalcolx , Panadol , Citacins" },
    { supplierId: "198273712V", name: "Janvi Ramani", email: "janvi.ramani@gmail.com", contact: "071239121234", drugsAvailable: "Dalcolx , Panadol" },
    { supplierId: "987234233V", name: "Sejal Gond", email: "sejal.gond@gmail.com", contact: "0773247673", drugsAvailable: "Dalcolx , Panadol" },
    { supplierId: "198198917V", name: "Janvi Ramani", email: "janvi.ramani@gmail.com", contact: "0372266348", drugsAvailable: "dalcolx , panadol , citrazin" }
  ];

  private supplierSubs!: Subscription;
  private authStatusSub!: Subscription;

  constructor(
    private supplierInteractionService: SupplierInteractionService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.supplierInteractionService.getSupplier();
    this.supplierSubs = this.supplierInteractionService.getSupplierUpdateListener()
      .subscribe((posts: any[]) => {
        this.isLoading = false;
        if (posts && posts.length > 0) {
          posts.forEach(p => {
            const idToMatch = p.supplierId || p.supplierID || p.id;
            if (!this.suppliers.some(s => (s.supplierId === idToMatch || s.supplierID === idToMatch))) {
              this.suppliers.push({
                supplierId: idToMatch,
                name: p.name,
                email: p.email,
                contact: p.contact,
                drugsAvailable: p.drugsAvailable
              });
            }
          });
        }
      });
  }

  deleteSupplier(supplierId: string) {
    const index = this.suppliers.findIndex(s => s.supplierId === supplierId || s.supplierID === supplierId || s.id === supplierId);
    if (index > -1) {
      this.suppliers.splice(index, 1);
    }
    this.supplierInteractionService.deleteSupplier(supplierId);
    this.snackBar.open("Supplier Deleted Successfully", "Close", { duration: 3000 });
  }

  onDelete(supplierId: string) {
    this.deleteSupplier(supplierId);
  }

  ngOnDestroy() {
    if (this.supplierSubs) this.supplierSubs.unsubscribe();
    if (this.authStatusSub) this.authStatusSub.unsubscribe();
  }
}
