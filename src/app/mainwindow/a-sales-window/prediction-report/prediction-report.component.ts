import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediction-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction-report.component.html',
  styleUrls: ['./prediction-report.component.css']
})
export class PredictionReportComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
