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
import { OutofstockWindowItemComponent } from './outofstock-window-item/outofstock-window-item.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    OutofstockWindowItemComponent,

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
  selector: 'app-outofstock-window',
  templateUrl: './outofstock-window.component.html',
  styleUrls: ['./outofstock-window.component.css']
})
export class OutofstockWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
