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
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  imports: [
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
    NgApexchartsModule
        ],
  standalone: true,
  selector: 'app-predictionchart-window',
  templateUrl: './predictionchart-window.component.html',
  styleUrls: ['./predictionchart-window.component.css']
})
export class PredictionchartWindowComponent implements OnInit {
  public chartOptions: any;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      series: [
        { name: 'Stock Quantity', data: [350, 450, 280, 520, 190, 410] }
      ],
      chart: {
        type: 'bar',
        height: 250,
        background: '#16212e',
        toolbar: { show: false }
      },
      colors: ['#00d1b2'],
      plotOptions: { bar: { horizontal: false, columnWidth: '45%', borderRadius: 4 } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['Amoxilin', 'Citazin', 'Metformin', 'Panadol', 'Salbutamol', 'Omithrazole'],
        labels: { style: { colors: '#ffffff', fontSize: '10px' } }
      },
      yaxis: {
        labels: { style: { colors: '#ffffff' } },
        title: { text: 'Units in Stock', style: { color: '#ffffff', fontSize: '11px' } }
      },
      title: {
        text: 'Drug Availability Chart',
        align: 'center',
        style: { color: '#ffffff', fontSize: '13px', fontWeight: '700' }
      }
    };
  }

}
