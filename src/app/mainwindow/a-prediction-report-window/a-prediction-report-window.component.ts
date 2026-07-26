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
import { ChartWindowComponent } from './chart-window/chart-window.component';
import { PredictionChartWindowComponent } from './prediction-chart-window/prediction-chart-window.component';
import { from } from 'rxjs';
import { SalesInteractionService } from './../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit } from '@angular/core';

import * as tf from '@tensorflow/tfjs';

@Component({
  imports: [
    ChartWindowComponent,
    PredictionChartWindowComponent,

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
  selector: 'app-a-prediction-report-window',
  templateUrl: './a-prediction-report-window.component.html',
  styleUrls: ['./a-prediction-report-window.component.css']
})
export class APredictionReportWindowComponent implements OnInit {


  constructor( ) { }

  ngOnInit() {



  }





}
