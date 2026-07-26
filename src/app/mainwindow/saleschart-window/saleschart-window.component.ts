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
  selector: 'app-saleschart-window',
  templateUrl: './saleschart-window.component.html',
  styleUrls: ['./saleschart-window.component.css']
})
export class SaleschartWindowComponent implements OnInit {
  public chartOptions: any;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      series: [
        { name: 'Amoxilin', data: [120000, 240000, 310000, 420000, 350000, 280000, 490000] },
        { name: 'Citazin', data: [180000, 290000, 350000, 480000, 410000, 330000, 520000] },
        { name: 'Metformin', data: [90000, 150000, 210000, 310000, 270000, 220000, 380000] },
        { name: 'Panadol', data: [220000, 340000, 410000, 530000, 480000, 390000, 560000] },
        { name: 'Salbutamol', data: [60000, 110000, 160000, 240000, 190000, 150000, 270000] }
      ],
      chart: {
        type: 'bar',
        height: 580,
        stacked: false,
        background: '#16212e',
        toolbar: { show: false }
      },
      colors: ['#00d1b2', '#3273dc', '#ffdd57', '#ff3860', '#9b59b6'],
      plotOptions: { bar: { horizontal: true, barHeight: '80%', borderRadius: 2 } },
      dataLabels: { enabled: false },
      scales: {
        x: { stacked: false },
        y: { stacked: false }
      },
      xaxis: {
        categories: ['Jan-2020', 'Feb-2020', 'Mar-2020', 'Apr-2020', 'May-2020', 'Jun-2020', 'Jul-2020'],
        labels: { style: { colors: '#ffffff' } },
        title: { text: 'Sales(Rs)', style: { color: '#ffffff', fontSize: '11px', fontWeight: '600' } }
      },
      yaxis: {
        labels: { style: { colors: '#ffffff' } },
        title: { text: 'Month', style: { color: '#ffffff', fontSize: '11px', fontWeight: '600' } }
      },
      legend: {
        position: 'right',
        title: { text: 'drugName', style: { color: '#ffffff', fontWeight: '700' } },
        labels: { colors: '#ffffff' }
      },
      title: {
        text: 'Sales with respective to each Drug',
        align: 'center',
        style: { color: '#ffffff', fontSize: '13px', fontWeight: '700' }
      }
    };
  }



}
