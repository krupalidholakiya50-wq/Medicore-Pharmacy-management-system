export interface Patient {
  id?: string;
  patientId: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  bloodGroup: string;
  emergencyContact: string;
  roomType: string;
  symptoms: string;
  admittedDate?: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  designation: string;
  credentials: string;
  experience: string;
  status: 'In OPD' | 'In Operation Theater' | 'On Break';
  avatar: string;
}

export interface SurgeryCase {
  caseId: string;
  patientName: string;
  surgeryType: string;
  otRoomNo: string;
  leadSurgeon: string;
  status: 'Scheduled' | 'In-Progress' | 'Completed';
  scheduledTime: string;
}

export interface InvoiceReceipt {
  receiptId: string;
  patientName: string;
  consultationFees: number;
  roomRent: number;
  otFees: number;
  pharmacyTotal: number;
  labDiagnostic: number;
  subTotal: number;
  taxAmount: number;
  insuranceDeduction: number;
  totalPayable: number;
  createdDate: string;
}

export interface Appointment {
  id?: string;
  appointmentId: string;
  patientName: string;
  patientContact: string;
  department: string;
  doctorName: string;
  symptomsReason: string;
  date: string;
  time: string;
  createdDate?: string;
}
