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
import { Component, OnInit } from '@angular/core';
import { AddSupplierWindowComponent } from './add-supplier-window/add-supplier-window.component';
import { SupplierInventoryItemsComponent } from './supplier-inventory-window/supplier-inventory-items/supplier-inventory-items.component';

@Component({
  imports: [
    AddSupplierWindowComponent,
    SupplierInventoryItemsComponent,
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
  selector: 'app-a-suppliers-window',
  templateUrl: './a-suppliers-window.component.html',
  styleUrls: ['./a-suppliers-window.component.css']
})
export class ASuppliersWindowComponent implements OnInit {
  activeTab: 'form' | 'list' = 'list';

  constructor() { }

  ngOnInit() {
  }

  setActiveTab(tab: 'form' | 'list') {
    this.activeTab = tab;
  }
}
