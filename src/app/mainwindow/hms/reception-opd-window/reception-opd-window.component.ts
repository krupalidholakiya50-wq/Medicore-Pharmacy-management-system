import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HmsService } from '../hms.service';
import { Patient } from '../hms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reception-opd-window',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reception-opd-window.component.html',
  styleUrls: ['./reception-opd-window.component.css']
})
export class ReceptionOpdWindowComponent implements OnInit, OnDestroy {
  activeTab: 'form' | 'list' = 'form';
  patients: Patient[] = [];
  patientForm!: FormGroup;
  private sub!: Subscription;

  constructor(private hmsService: HmsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.sub = this.hmsService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1)]],
      gender: ['Male', Validators.required],
      contact: ['', Validators.required],
      bloodGroup: ['O+', Validators.required],
      emergencyContact: ['', Validators.required],
      roomType: ['General Ward', Validators.required],
      symptoms: ['', Validators.required]
    });
  }

  onRegisterPatient(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const val = this.patientForm.value;
    const newPatient: Patient = {
      patientId: '',
      name: val.name,
      age: val.age,
      gender: val.gender,
      contact: val.contact,
      bloodGroup: val.bloodGroup,
      emergencyContact: val.emergencyContact,
      roomType: val.roomType,
      symptoms: val.symptoms
    };

    this.hmsService.addPatient(newPatient);
    this.patientForm.reset({
      gender: 'Male',
      bloodGroup: 'O+',
      roomType: 'General Ward'
    });
    this.activeTab = 'list';
  }

  onDischargePatient(id: string | undefined): void {
    if (!id) return;
    this.hmsService.dischargePatient(id);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
