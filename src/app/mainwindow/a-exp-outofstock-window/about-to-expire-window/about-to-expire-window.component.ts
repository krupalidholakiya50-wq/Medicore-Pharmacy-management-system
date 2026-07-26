import {  } from '../../a-suppliers-window/supplier-filter.pipe';
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
import { AboutToExpireItemsComponent } from './about-to-expire-items/about-to-expire-items.component';
import { SearchSupplierWindowComponent } from '../../a-suppliers-window/search-supplier-window/search-supplier-window.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    AboutToExpireItemsComponent,
    SearchSupplierWindowComponent,

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
  selector: 'app-about-to-expire-window',
  templateUrl: './about-to-expire-window.component.html',
  styleUrls: ['./about-to-expire-window.component.css']
})
export class AboutToExpireWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
