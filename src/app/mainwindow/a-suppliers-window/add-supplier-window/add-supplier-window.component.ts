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
import { AddSupplierElementsComponent } from './add-supplier-elements/add-supplier-elements.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  imports: [
    AddSupplierElementsComponent,
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
  selector: 'app-add-supplier-window',
  templateUrl: './add-supplier-window.component.html',
  styleUrls: ['./add-supplier-window.component.css']
})
export class AddSupplierWindowComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
}
