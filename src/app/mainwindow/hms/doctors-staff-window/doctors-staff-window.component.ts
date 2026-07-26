import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HmsService } from '../hms.service';
import { Doctor, Appointment } from '../hms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors-staff-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-staff-window.component.html',
  styleUrls: ['./doctors-staff-window.component.css']
})
export class DoctorsStaffWindowComponent implements OnInit, OnDestroy {
  selectedDepartment: string = 'All Departments';
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];

  // Appointment Modal State
  isModalOpen = false;
  selectedDoctorForModal: Doctor | null = null;
  patientName: string = '';
  patientContact: string = '';
  appointmentDept: string = '';
  appointmentDocName: string = '';
  symptomsReason: string = '';
  appointmentDate: string = '';
  appointmentTime: string = '10:00 AM';

  // Inline Success Banner Message
  successNotification: string | null = null;

  private sub!: Subscription;

  departments: string[] = [
    'All Departments',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Gynecology',
    'General Surgery'
  ];

  constructor(private hmsService: HmsService) {}

  ngOnInit(): void {
    this.sub = this.hmsService.getDoctors().subscribe(data => {
      this.doctors = data;
      this.applyFilter();
    });

    // Default Date tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.appointmentDate = tomorrow.toISOString().split('T')[0];
  }

  onDepartmentChange(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    if (this.selectedDepartment === 'All Departments') {
      this.filteredDoctors = [...this.doctors];
    } else {
      this.filteredDoctors = this.doctors.filter(d => d.department === this.selectedDepartment);
    }
  }

  openBookingModal(doctor: Doctor): void {
    this.selectedDoctorForModal = doctor;
    this.appointmentDept = doctor.department;
    this.appointmentDocName = doctor.name;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedDoctorForModal = null;
  }

  submitAppointment(): void {
    if (!this.patientName || !this.patientContact || !this.appointmentDate) {
      alert('Please fill out all required fields (Patient Name, Contact, Date).');
      return;
    }

    const app: Appointment = {
      appointmentId: '',
      patientName: this.patientName,
      patientContact: this.patientContact,
      department: this.appointmentDept,
      doctorName: this.appointmentDocName,
      symptomsReason: this.symptomsReason,
      date: this.appointmentDate,
      time: this.appointmentTime
    };

    this.hmsService.addAppointment(app);

    // Set exact required inline notification banner
    this.successNotification = `Appointment Successfully Scheduled for ${this.patientName} with ${this.appointmentDocName} on ${this.appointmentDate} at ${this.appointmentTime} !!`;

    // Reset Form & Close Modal
    this.patientName = '';
    this.patientContact = '';
    this.symptomsReason = '';
    this.closeModal();

    // Auto dismiss notification after 8 seconds
    setTimeout(() => {
      this.successNotification = null;
    }, 8000);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
