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
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    SalesChartComponent,

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
  selector: 'app-a-sales-window',
  templateUrl: './a-sales-window.component.html',
  styleUrls: ['./a-sales-window.component.css']
})
export class ASalesWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
