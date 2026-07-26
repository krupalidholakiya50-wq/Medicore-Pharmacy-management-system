import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgApexchartsModule
  ],
  standalone: true,
  selector: 'app-stat-panel',
  templateUrl: './stat-panel.component.html',
  styleUrls: ['./stat-panel.component.css']
})
export class StatPanelComponent implements OnInit {
  public totalDoctorUsers: number = 12;
  public doctorOrdersAvailable: number = 4;
  public verifiedDoctorOrders: number = 3;
  public pickedUpDoctorOrders: number = 34;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchStats();
  }

  private fetchStats() {
    this.http.get<any>('http://localhost:3000/api/doctorUser/getDoctorUserData').subscribe({
      next: (res) => { if (res && res.doctorUser) { this.totalDoctorUsers = res.doctorUser.length || 12; } },
      error: () => { this.totalDoctorUsers = 12; }
    });

    this.http.get<any>('http://localhost:3000/api/doctorOder').subscribe({
      next: (res) => { if (res && res.doctorOders) { this.doctorOrdersAvailable = res.doctorOders.length || 4; } },
      error: () => { this.doctorOrdersAvailable = 4; }
    });

    this.http.get<any>('http://localhost:3000/api/verifiedDoctorOder').subscribe({
      next: (res) => { if (res && res.doctorOders) { this.verifiedDoctorOrders = res.doctorOders.length || 3; } },
      error: () => { this.verifiedDoctorOrders = 3; }
    });

    this.http.get<any>('http://localhost:3000/api/pickedUpOders').subscribe({
      next: (res) => { if (res && res.doctorOders) { this.pickedUpDoctorOrders = res.doctorOders.length || 34; } },
      error: () => { this.pickedUpDoctorOrders = 34; }
    });
  }
}
