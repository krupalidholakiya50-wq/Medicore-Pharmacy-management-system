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
import { PredictionReportItemsComponent } from './prediction-report-items/prediction-report-items.component';
import { SalesInteractionService } from './../../a-pointofsale-window/sales-interaction.service';
import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';



@Component({
  imports: [
    PredictionReportItemsComponent,

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
  selector: 'app-prediction-chart-window',
  templateUrl: './prediction-chart-window.component.html',
  styleUrls: ['./prediction-chart-window.component.css']
})
export class PredictionChartWindowComponent implements OnInit {

  arr: Array<any> =[];
  linearModel: tf.Sequential;
  prediction: any;

  constructor(  ) { }

  ngOnInit() {



  }



}
