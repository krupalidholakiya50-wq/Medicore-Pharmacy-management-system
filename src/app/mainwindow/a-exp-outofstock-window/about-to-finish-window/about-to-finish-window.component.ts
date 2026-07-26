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
import { AboutToFinishItemsComponent } from './about-to-finish-items/about-to-finish-items.component';
import { SearchSupplierWindowComponent } from '../../a-suppliers-window/search-supplier-window/search-supplier-window.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    AboutToFinishItemsComponent,
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
  selector: 'app-about-to-finish-window',
  templateUrl: './about-to-finish-window.component.html',
  styleUrls: ['./about-to-finish-window.component.css']
})
export class AboutToFinishWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
