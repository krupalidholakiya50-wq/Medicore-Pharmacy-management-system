import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HmsService } from '../hms.service';
import { Patient } from '../hms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospital-billing-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hospital-billing-window.component.html',
  styleUrls: ['./hospital-billing-window.component.css']
})
export class HospitalBillingWindowComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  selectedPatient: Patient | null = null;
  selectedPatientId: string = '';

  // Billing Input Breakdown
  consultationFees: number = 1500;
  roomRent: number = 12000;
  otFees: number = 25000;
  pharmacyTotal: number = 4850;
  labDiagnostic: number = 3200;

  // Deduction & Tax Inputs
  taxAmount: number = 930;
  insuranceDeduction: number = 10000;

  receiptGenerated = false;
  generatedReceiptId: string = '';
  private sub!: Subscription;

  constructor(private hmsService: HmsService) {}

  ngOnInit(): void {
    this.sub = this.hmsService.getPatients().subscribe(data => {
      this.patients = data;
      if (this.patients.length > 0) {
        this.selectedPatient = this.patients[0];
        this.selectedPatientId = this.patients[0].id || '';
      }
    });
  }

  onPatientSelect(): void {
    const found = this.patients.find(p => p.id === this.selectedPatientId || p.patientId === this.selectedPatientId);
    if (found) {
      this.selectedPatient = found;
    }
  }

  get subTotal(): number {
    return (
      (Number(this.consultationFees) || 0) +
      (Number(this.roomRent) || 0) +
      (Number(this.otFees) || 0) +
      (Number(this.pharmacyTotal) || 0) +
      (Number(this.labDiagnostic) || 0)
    );
  }

  get totalPayable(): number {
    const total = this.subTotal + (Number(this.taxAmount) || 0) - (Number(this.insuranceDeduction) || 0);
    return total > 0 ? total : 0;
  }

  generateFinalReceipt(): void {
    if (!this.selectedPatient) return;
    this.generatedReceiptId = 'INV-HMS-' + Math.floor(100000 + Math.random() * 900000);
    this.receiptGenerated = true;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
