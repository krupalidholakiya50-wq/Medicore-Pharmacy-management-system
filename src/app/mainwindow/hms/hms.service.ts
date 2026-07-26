import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient, Doctor, SurgeryCase, InvoiceReceipt, Appointment } from './hms.model';

@Injectable({
  providedIn: 'root'
})
export class HmsService {
  private apiUrl = 'http://localhost:3000/api/hms';

  // Seed Data: Active Patients
  private initialPatients: Patient[] = [
    {
      id: 'p101',
      patientId: 'HMS-PAT-1001',
      name: 'Rohan Sharma',
      age: 42,
      gender: 'Male',
      contact: '+91 98250 12345',
      bloodGroup: 'O+',
      emergencyContact: '+91 98250 54321',
      roomType: 'ICU',
      symptoms: 'Acute Cardiac Arrhythmia & Breathlessness',
      admittedDate: '2026-07-25'
    },
    {
      id: 'p102',
      patientId: 'HMS-PAT-1002',
      name: 'Ananya Patel',
      age: 29,
      gender: 'Female',
      contact: '+91 97129 67890',
      bloodGroup: 'B+',
      emergencyContact: '+91 97129 09876',
      roomType: 'Deluxe Room',
      symptoms: 'Post-Op Knee Arthroscopy Recovery',
      admittedDate: '2026-07-26'
    },
    {
      id: 'p103',
      patientId: 'HMS-PAT-1003',
      name: 'Vikram Joshi',
      age: 58,
      gender: 'Male',
      contact: '+91 98980 11223',
      bloodGroup: 'A+',
      emergencyContact: '+91 98980 33221',
      roomType: 'Semi-Private',
      symptoms: 'Type 2 Diabetes & Neuropathy Evaluation',
      admittedDate: '2026-07-24'
    }
  ];

  // Seed Data: Doctors Grid
  private initialDoctors: Doctor[] = [
    {
      id: 'doc1',
      name: 'Dr. Krupali Dholakiya',
      department: 'Cardiology',
      designation: 'Chief Interventional Cardiologist',
      credentials: 'MBBS, MD, DM (Cardiology) - AIIMS New Delhi',
      experience: '16+ Years Experience in Complex Angioplasty',
      status: 'In OPD',
      avatar: 'assets/img/doctor-f.png'
    },
    {
      id: 'doc2',
      name: 'Dr. Janvi Ramani',
      department: 'Neurology',
      designation: 'Head of Neuro-Surgery',
      credentials: 'MBBS, MS, MCh (Neurosurgery) - NIMHANS',
      experience: '14+ Years Experience in Brain & Spinal Surgery',
      status: 'In Operation Theater',
      avatar: 'assets/img/doctor-f2.png'
    },
    {
      id: 'doc3',
      name: 'Dr. Sejal Gond',
      department: 'Orthopedics',
      designation: 'Senior Joint Replacement Surgeon',
      credentials: 'MBBS, MS (Orthopedics), FRCS (UK)',
      experience: '12+ Years Experience in Robotic Knee Surgeries',
      status: 'In OPD',
      avatar: 'assets/img/doctor-f3.png'
    },
    {
      id: 'doc4',
      name: 'Dr. Rajesh Mehta',
      department: 'General Surgery',
      designation: 'Lead Laparoscopic Specialist',
      credentials: 'MBBS, MS (General Surgery), FMAS',
      experience: '18+ Years Experience in Trauma & Abdominal Surgery',
      status: 'On Break',
      avatar: 'assets/img/doctor-m.png'
    },
    {
      id: 'doc5',
      name: 'Dr. Priya Desai',
      department: 'Gynecology',
      designation: 'Senior Consultant Obstetrician',
      credentials: 'MBBS, MD, DGO (Gynecology & Obstetrics)',
      experience: '15+ Years Experience in High-Risk Pregnancy Care',
      status: 'In OPD',
      avatar: 'assets/img/doctor-f4.png'
    }
  ];

  // Seed Data: OT & Surgery Tracker
  private initialSurgeries: SurgeryCase[] = [
    {
      caseId: 'OT-2026-801',
      patientName: 'Ananya Patel',
      surgeryType: 'Laparoscopic Cholecystectomy',
      otRoomNo: 'OT Suite 3',
      leadSurgeon: 'Dr. Rajesh Mehta',
      status: 'In-Progress',
      scheduledTime: '10:30 AM'
    },
    {
      caseId: 'OT-2026-802',
      patientName: 'Rohan Sharma',
      surgeryType: 'Coronary Artery Bypass Grafting (CABG)',
      otRoomNo: 'OT Suite 1 (Cardiac)',
      leadSurgeon: 'Dr. Krupali Dholakiya',
      status: 'Scheduled',
      scheduledTime: '02:00 PM'
    },
    {
      caseId: 'OT-2026-803',
      patientName: 'Suresh Verma',
      surgeryType: 'Total Hip Replacement',
      otRoomNo: 'OT Suite 4 (Ortho)',
      leadSurgeon: 'Dr. Sejal Gond',
      status: 'Completed',
      scheduledTime: '08:00 AM'
    }
  ];

  // Seed Data: Appointments
  private initialAppointments: Appointment[] = [
    {
      id: 'app1',
      appointmentId: 'APT-901',
      patientName: 'Rohan Sharma',
      patientContact: '+91 98250 12345',
      department: 'Cardiology',
      doctorName: 'Dr. Krupali Dholakiya',
      symptomsReason: 'Routine post-angioplasty checkup & ECG review',
      date: '2026-07-28',
      time: '11:00 AM'
    }
  ];

  private patientsSubject = new BehaviorSubject<Patient[]>(this.initialPatients);
  private doctorsSubject = new BehaviorSubject<Doctor[]>(this.initialDoctors);
  private surgeriesSubject = new BehaviorSubject<SurgeryCase[]>(this.initialSurgeries);
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.initialAppointments);

  constructor(private http: HttpClient) {}

  // --- PATIENTS CRUD ---
  getPatients(): Observable<Patient[]> {
    return this.patientsSubject.asObservable();
  }

  addPatient(patient: Patient): void {
    patient.id = 'p' + (Date.now() % 10000);
    patient.patientId = 'HMS-PAT-' + Math.floor(1000 + Math.random() * 9000);
    patient.admittedDate = new Date().toISOString().split('T')[0];

    const current = this.patientsSubject.getValue();
    const updated = [patient, ...current];
    this.patientsSubject.next(updated);

    this.http.post(`${this.apiUrl}/patients`, patient).subscribe({
      next: (res) => console.log('Patient saved to database:', res),
      error: (err) => console.warn('Database sync using local state:', err)
    });
  }

  dischargePatient(id: string): void {
    const current = this.patientsSubject.getValue();
    const updated = current.filter(p => p.id !== id && p.patientId !== id);
    this.patientsSubject.next(updated);

    this.http.delete(`${this.apiUrl}/patients/${id}`).subscribe({
      next: (res) => console.log('Patient discharged:', res),
      error: (err) => console.warn('Database delete using local state:', err)
    });
  }

  // --- DOCTORS STREAM ---
  getDoctors(): Observable<Doctor[]> {
    return this.doctorsSubject.asObservable();
  }

  // --- APPOINTMENTS CRUD ---
  getAppointments(): Observable<Appointment[]> {
    return this.appointmentsSubject.asObservable();
  }

  addAppointment(app: Appointment): void {
    app.id = 'app' + (Date.now() % 10000);
    app.appointmentId = 'APT-' + Math.floor(100 + Math.random() * 900);
    app.createdDate = new Date().toISOString().split('T')[0];

    const current = this.appointmentsSubject.getValue();
    const updated = [app, ...current];
    this.appointmentsSubject.next(updated);

    this.http.post(`${this.apiUrl}/appointments`, app).subscribe({
      next: (res) => console.log('Appointment saved to database:', res),
      error: (err) => console.warn('Database appointment sync using local state:', err)
    });
  }

  // --- SURGERY TRACKER CRUD ---
  getSurgeries(): Observable<SurgeryCase[]> {
    return this.surgeriesSubject.asObservable();
  }

  updateSurgeryStatus(caseId: string, newStatus: 'Scheduled' | 'In-Progress' | 'Completed'): void {
    const current = this.surgeriesSubject.getValue();
    const updated = current.map(s => {
      if (s.caseId === caseId) {
        return { ...s, status: newStatus };
      }
      return s;
    });
    this.surgeriesSubject.next(updated);

    this.http.patch(`${this.apiUrl}/surgeries/${caseId}`, { status: newStatus }).subscribe({
      next: (res) => console.log('Surgery status updated:', res),
      error: (err) => console.warn('Database update using local state:', err)
    });
  }
}
