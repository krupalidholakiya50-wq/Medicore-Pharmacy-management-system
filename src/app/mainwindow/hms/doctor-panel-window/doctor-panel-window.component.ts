import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HmsService } from '../hms.service';
import { Patient } from '../hms.model';

@Component({
  selector: 'app-doctor-panel-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-panel-window.component.html',
  styleUrls: ['./doctor-panel-window.component.css']
})
export class DoctorPanelWindowComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;

  // Diagnosis & Vitals State
  bp: string = '120/80 mmHg';
  pulse: number = 74;
  temp: number = 98.6;
  spo2: number = 99;
  diagnosisNotes: string = '';
  vitalsLogged = false;

  constructor(private hmsService: HmsService) {}

  ngOnInit(): void {
    this.hmsService.getPatients().subscribe(data => {
      this.patients = data;
      if (this.patients.length > 0) {
        this.selectedPatient = this.patients[0];
      }
    });
  }

  selectPatient(p: Patient): void {
    this.selectedPatient = p;
    this.vitalsLogged = false;
  }

  logVitalsAndDiagnosis(): void {
    this.vitalsLogged = true;
    setTimeout(() => {
      this.vitalsLogged = false;
      this.diagnosisNotes = '';
      alert('Vitals & Clinical Diagnosis logged successfully!');
    }, 2000);
  }
}
