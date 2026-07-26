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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { SalesInteractionService } from './../../../a-pointofsale-window/sales-interaction.service';
import { HospitalCoreStoreService } from '../../../../services/hospital-core-store.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  selector: 'app-sales-report-items',
  templateUrl: './sales-report-items.component.html',
  styleUrls: ['./sales-report-items.component.css']
})
export class SalesReportItemsComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  sales: any[] = [
    {
      id: "S-1001",
      drugName: ["Panadol 500mg", "Citazin 10mg"],
      dateTime: "2026-07-26 14:30:00",
      totalPrice: "2,400.00",
      tax: "120.00",
      paidAmount: "2,520.00",
      balance: "0.00"
    },
    {
      id: "S-1002",
      drugName: ["Metformin 850mg", "Salvitamol 2mg"],
      dateTime: "2026-07-26 11:15:22",
      totalPrice: "4,800.00",
      tax: "240.00",
      paidAmount: "5,000.00",
      balance: "-40.00"
    },
    {
      id: "S-1003",
      drugName: ["Amoxillin 250mg Capsules"],
      dateTime: "2026-07-25 18:45:10",
      totalPrice: "1,200.00",
      tax: "60.00",
      paidAmount: "1,300.00",
      balance: "-40.00"
    },
    {
      id: "S-1004",
      drugName: ["Panadol 500mg", "Metformin 850mg", "Citazin 10mg"],
      dateTime: "2026-07-25 09:20:05",
      totalPrice: "3,600.00",
      tax: "180.00",
      paidAmount: "3,780.00",
      balance: "0.00"
    }
  ];
  isLoading = false;
  userIsAuthenticated = false;
  private salesSubs!: Subscription;
  private storeSub!: Subscription;
  private authStatusSub!: Subscription;

  constructor(
    private salesInteractionService: SalesInteractionService,
    private storeService: HospitalCoreStoreService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = false;

    // Subscribe to live HospitalCoreStoreService sales stream
    this.storeSub = this.storeService.getSales().subscribe(storeSales => {
      if (storeSales && storeSales.length > 0) {
        storeSales.forEach((s: any) => {
          if (!this.sales.some(existing => existing.id === s.id)) {
            const items = s.items ? s.items.map((i: any) => i.name) : [s.drugName || 'Medication'];
            this.sales.unshift({
              id: s.id,
              drugName: items,
              dateTime: s.date || new Date().toLocaleString(),
              totalPrice: s.total !== undefined ? Number(s.total).toFixed(2) : "1,200.00",
              tax: s.tax !== undefined ? Number(s.tax).toFixed(2) : "60.00",
              paidAmount: s.paid !== undefined ? Number(s.paid).toFixed(2) : "1,260.00",
              balance: s.balance !== undefined ? Number(s.balance).toFixed(2) : "0.00"
            });
          }
        });
      }
    });

    try {
      this.salesInteractionService.getSales();
      this.salesSubs = this.salesInteractionService.getSalesUpdateListener()
        .subscribe((posts: any[]) => {
          if (posts && posts.length > 0) {
            posts.forEach(p => {
              if (!this.sales.some(s => s.id === p._id || s.id === p.id)) {
                this.sales.unshift({
                  id: p._id || p.id,
                  drugName: Array.isArray(p.drugName) ? p.drugName : [p.drugName],
                  dateTime: p.dateTime || new Date().toLocaleString(),
                  totalPrice: p.totalPrice,
                  tax: p.tax,
                  paidAmount: p.paidAmount,
                  balance: p.balance
                });
              }
            });
          }
        });
    } catch (e) {
      console.warn("Sales interaction service fallback:", e);
    }

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  formatDrugNames(drugName: any): string {
    if (!drugName) return 'Standard Medication';
    if (Array.isArray(drugName)) {
      return drugName.filter(n => typeof n === 'string' && n.length > 1).join(', ') || drugName.join('');
    }
    return String(drugName);
  }

  downloard() {
    if (this.snackBar) {
      this.snackBar.open("Preparing Sales Report PDF...", "Close", { duration: 2500 });
    }
    setTimeout(() => {
      window.print();
    }, 500);
  }

  ngOnDestroy() {
    if (this.salesSubs) this.salesSubs.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();
    if (this.authStatusSub) this.authStatusSub.unsubscribe();
  }
}
