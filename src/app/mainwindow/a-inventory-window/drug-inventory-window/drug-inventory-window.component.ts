import {  } from '../../a-suppliers-window/supplier-filter.pipe';
import {  } from '../inventory-filter.pipe';
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
import { SearchSupplierWindowComponent } from '../../a-suppliers-window/search-supplier-window/search-supplier-window.component';
import { SearchInventoryComponent } from '../search-inventory/search-inventory.component';
import { DrugInventoryItemsComponent } from './drug-inventory-items/drug-inventory-items.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    SearchSupplierWindowComponent,
    SearchInventoryComponent,
    DrugInventoryItemsComponent,

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
  selector: 'app-drug-inventory-window',
  templateUrl: './drug-inventory-window.component.html',
  styleUrls: ['./drug-inventory-window.component.css']
})
export class DrugInventoryWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
