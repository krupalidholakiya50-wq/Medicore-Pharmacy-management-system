import {  } from '../supplier-filter.pipe';
import {  } from '../../a-inventory-window/inventory-filter.pipe';
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
import { SearchSupplierWindowComponent } from '../search-supplier-window/search-supplier-window.component';
import { SupplierInventoryItemsComponent } from './supplier-inventory-items/supplier-inventory-items.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    SearchSupplierWindowComponent,
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
  selector: 'app-supplier-inventory-window',
  templateUrl: './supplier-inventory-window.component.html',
  styleUrls: ['./supplier-inventory-window.component.css']
})
export class SupplierInventoryWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
