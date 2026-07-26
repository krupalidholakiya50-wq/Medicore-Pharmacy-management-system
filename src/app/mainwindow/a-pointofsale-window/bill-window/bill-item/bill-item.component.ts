import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalesInformationArray } from './../../salesInformationArray.model';
import { InventoryInteractionService } from './../../../a-inventory-window/inventory-interaction.service';
import { Inventory } from './../../../a-inventory-window/inventory.model';
import { SalesInteractionService } from './../../sales-interaction.service';
import { InventoryFilterPipe } from 'src/app/mainwindow/a-inventory-window/inventory-filter.pipe';

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
    InventoryFilterPipe,
  ],
  standalone: true,
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css']
})
export class BillItemComponent implements OnInit, OnDestroy {
  array: Array<SalesInformationArray> = [];
  items: Array<any> = [];
  arr: Array<any> = [];
  arr1: Array<any> = [];
  itemArray: Array<any> = [
    ['I101', 'Panadol', '2027-12-31', 1200, 4, '500'],
    ['I102', 'Citazin', '2027-10-15', 1200, 4, '350'],
    ['I103', 'Metformin', '2028-05-20', 1200, 3, '600'],
    ['I104', 'Diamicrozole', '2027-09-10', 1200, 2, '400']
  ];
  searchTerm: string = '';
  inventorys: any[] = [];
  inven: Inventory[] = [];
  newArray: Array<any> = [];
  num: string = '';
  total: number = 15600;
  tax: number = 0;
  paidAmount: number = 40000;
  balance: number = 24400;
  dataArray: Array<any> = [
    ['Panadol', 4],
    ['Citazin', 4],
    ['Metformin', 3],
    ['Diamicrozole', 2]
  ];

  showToast: boolean = true;
  isLoading = false;
  private inventorySubs!: Subscription;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private salesInteractionService: SalesInteractionService,
    private snackbar: MatSnackBar
  ) {
    this.items = [
      { name: 'https://i.ibb.co/L9X6wKM/pharmacare-logo-hori-tagline-2.png' },
    ];
  }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(null, null);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        if (posts && posts.length > 0) {
          this.inventorys = posts.map((p, index) => ({
            ...p,
            quantityInput: index === 0 ? 4 : (index === 1 ? 4 : (index === 2 ? 3 : (index === 3 ? 2 : '')))
          }));
        } else {
          this.inventorys = [
            { id: 'I101', name: 'Panadol', expireDate: '2027-12-31', price: '1200', quantity: '500', email: 'supplier@pharmacare.com', batchId: 'B-001', imagePath: 'assets/images/panadol.jpg', quantityInput: 4 },
            { id: 'I102', name: 'Citazin', expireDate: '2027-10-15', price: '1200', quantity: '350', email: 'supplier@pharmacare.com', batchId: 'B-002', imagePath: 'assets/images/citazin.jpg', quantityInput: 4 },
            { id: 'I103', name: 'Metformin', expireDate: '2028-05-20', price: '1200', quantity: '600', email: 'supplier@pharmacare.com', batchId: 'B-003', imagePath: 'assets/images/metformin.jpg', quantityInput: 3 },
            { id: 'I104', name: 'Diamicrozole', expireDate: '2027-09-10', price: '1200', quantity: '400', email: 'supplier@pharmacare.com', batchId: 'B-004', imagePath: 'assets/images/diamicrozole.jpg', quantityInput: 2 },
            { id: 'I105', name: 'Amoxillin', expireDate: '2027-11-25', price: '1200', quantity: '450', email: 'supplier@pharmacare.com', batchId: 'B-005', imagePath: 'assets/images/amoxillin.jpg', quantityInput: '' },
            { id: 'I106', name: 'Omithrazole', expireDate: '2028-01-18', price: '1200', quantity: '300', email: 'supplier@pharmacare.com', batchId: 'B-006', imagePath: 'assets/images/omithrazole.jpg', quantityInput: '' },
            { id: 'I107', name: 'Chloroperi Hybanate', expireDate: '2027-08-30', price: '1200', quantity: '250', email: 'supplier@pharmacare.com', batchId: 'B-007', imagePath: 'assets/images/chloroperi.jpg', quantityInput: '' }
          ];
        }
        this.calculateTotal();
      });
  }

  ngOnDestroy() {
    if (this.inventorySubs) {
      this.inventorySubs.unsubscribe();
    }
  }

  scrollCarousel(direction: 'left' | 'right') {
    const el = document.getElementById('drug-carousel');
    if (el) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  onAddToBill(inventory: any) {
    const qty = inventory.quantityInput ? +inventory.quantityInput : 1;
    const existingIndex = this.itemArray.findIndex(item => item[0] === inventory.id);
    if (existingIndex > -1) {
      this.itemArray[existingIndex][4] += qty;
    } else {
      this.itemArray.push([inventory.id, inventory.name, inventory.expireDate, +inventory.price, qty, inventory.quantity || '0']);
    }
    this.dataArray.push([inventory.name, qty]);
    this.calculateTotal();
  }

  calculateTotal(): number {
    this.total = 0;
    for (let count = 0; count < this.itemArray.length; count++) {
      let price = +this.itemArray[count][3];
      let qty = +this.itemArray[count][4];
      this.total += price * qty;
    }
    this.calculateBalance();
    return this.total;
  }

  calculateBalance(): void {
    let paid = +this.paidAmount || 0;
    let taxVal = +this.tax || 0;
    let reducingAmount = paid + taxVal;
    this.balance = reducingAmount - this.total;
  }

  onAddToCheckout(checkoutArray: Array<any> = []) {
    this.calculateTotal();
    let length = checkoutArray.length;
    for (let count = 0; count < length; count++) {
      let quantity = +checkoutArray[count][5] - +checkoutArray[count][4];
      this.inventoryInteractionService.updateQuantity(
        checkoutArray[count][0],
        quantity
      );
    }
    this.showToast = true;
    this.snackbar.open("Transaction Added to Sales Report !!", 'Close', { duration: 3000 });
    return this.total;
  }

  onPrintBill() {
    this.calculateBalance();
    this.salesInteractionService.addSales(
      this.dataArray,
      this.total,
      this.tax,
      this.paidAmount,
      this.balance
    );
    this.showToast = true;
    this.snackbar.open("Transaction Added to Sales Report !!", 'Close', { duration: 3000 });
  }

  closeToast() {
    this.showToast = false;
  }

  print(): void {
    let printContents: any, popupWin: any;
    const printElem = document.getElementById('print-section');
    if (printElem) {
      printContents = printElem.innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Print Bill</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { color: #00bfa5; }
              </style>
            </head>
            <body onload="window.print();window.close()">${printContents}</body>
          </html>`
        );
        popupWin.document.close();
      }
    }
  }
}
