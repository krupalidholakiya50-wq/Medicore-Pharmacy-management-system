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
import { SearchSupplierWindowComponent } from '../../a-suppliers-window/search-supplier-window/search-supplier-window.component';
import { AddDoctorUserComponent } from './add-doctor-user/add-doctor-user.component';
import { AddPhamacyUserComponent } from './add-phamacy-user/add-phamacy-user.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    SearchSupplierWindowComponent,
    AddDoctorUserComponent,
    AddPhamacyUserComponent,

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
  selector: 'app-add-new-users',
  templateUrl: './add-new-users.component.html',
  styleUrls: ['./add-new-users.component.css']
})
export class AddNewUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
