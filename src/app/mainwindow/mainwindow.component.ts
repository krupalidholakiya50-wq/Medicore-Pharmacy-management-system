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
import { StatPanelComponent } from './stat-panel/stat-panel.component';
import { ExpiredateWindowComponent } from './expiredate-window/expiredate-window.component';
import { SaleschartWindowComponent } from './saleschart-window/saleschart-window.component';
import { OutofstockWindowComponent } from './outofstock-window/outofstock-window.component';
import { PredictionchartWindowComponent } from './predictionchart-window/predictionchart-window.component';
import { AboutToOutofStockWindowComponent } from './about-to-outof-stock-window/about-to-outof-stock-window.component';
import { Component, OnInit } from '@angular/core';

export interface MedicineNotificationItem {
  name: string;
  batchId: string;
  stock: number | string;
  warningType: string;
  supplier: string;
  expiryDate?: string;
  price?: number;
}

@Component({
  imports: [
    StatPanelComponent,
    ExpiredateWindowComponent,
    SaleschartWindowComponent,
    OutofstockWindowComponent,
    PredictionchartWindowComponent,
    AboutToOutofStockWindowComponent,
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
  selector: 'app-mainwindow',
  templateUrl: './mainwindow.component.html',
  styleUrls: ['./mainwindow.component.css']
})
export class MainwindowComponent implements OnInit {
  // Modal State
  selectedItem: any = null;

  // Local Mock Notification Datasets with Batch IDs
  expiringNotifications: MedicineNotificationItem[] = [
    { name: 'Panadol', batchId: 'PND-2026A', stock: '2,960 Units', warningType: 'About To Expire (August 2026)', supplier: 'Krupali Dholakiya', price: 1200 },
    { name: 'Citazin', batchId: 'CTZ-2026B', stock: '148 Units', warningType: 'About To Expire (July 2026)', supplier: 'Janvi Ramani', price: 850 },
    { name: 'Metformin', batchId: 'MET-2026C', stock: '1,500 Units', warningType: 'About To Expire (June 2026)', supplier: 'Sejal Gond', price: 1450 }
  ];

  outOfStockNotifications: MedicineNotificationItem[] = [
    { name: 'Amoxillin', batchId: 'AMX-2026D', stock: '0 Units (Critical Deficit)', warningType: 'Out of Stock Alert', supplier: 'Janvi Ramani', price: 1200 },
    { name: 'Demo1', batchId: 'DEM-2026E', stock: '4 Units (Low Stock)', warningType: 'About To Get Out Of Stock', supplier: 'Sejal Gond', price: 1201 }
  ];

  constructor() {}

  ngOnInit(): void {}

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
}
