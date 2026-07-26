import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HmsService } from '../hms.service';
import { Patient } from '../hms.model';

@Component({
  selector: 'app-patient-panel-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-panel-window.component.html',
  styleUrls: ['./patient-panel-window.component.css']
})
export class PatientPanelWindowComponent implements OnInit {
  activeTab: 'casefiles' | 'labhistory' | 'prescriptions' = 'casefiles';
  patients: Patient[] = [];

  constructor(private hmsService: HmsService) {}

  ngOnInit(): void {
    this.hmsService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }
}
