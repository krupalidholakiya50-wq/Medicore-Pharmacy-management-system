import {  } from '../a-suppliers-window/supplier-filter.pipe';
import {  } from '../a-inventory-window/inventory-filter.pipe';
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
import { BillItemComponent } from './bill-window/bill-item/bill-item.component';
import { AddToBillComponent } from './add-to-bill/add-to-bill.component';
import { BillWindowComponent } from './bill-window/bill-window.component';
import { CheckOutWindowComponent } from './check-out-window/check-out-window.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    BillItemComponent,
    AddToBillComponent,
    BillWindowComponent,
    CheckOutWindowComponent,

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
  selector: 'app-a-pointofsale-window',
  templateUrl: './a-pointofsale-window.component.html',
  styleUrls: ['./a-pointofsale-window.component.css']
})
export class APointofsaleWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
