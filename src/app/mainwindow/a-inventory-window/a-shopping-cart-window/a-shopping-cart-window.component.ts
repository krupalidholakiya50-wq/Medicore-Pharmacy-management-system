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
import { AShoppingCartItemsComponent } from './a-shopping-cart-items/a-shopping-cart-items.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    AShoppingCartItemsComponent,

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
  selector: 'app-a-shopping-cart-window',
  templateUrl: './a-shopping-cart-window.component.html',
  styleUrls: ['./a-shopping-cart-window.component.css']
})
export class AShoppingCartWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


}
