import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Yeh import add karein

@Component({
  selector: 'app-dashboard',
  standalone: true, // Ye true hona chahiye
  imports: [CommonModule], // CommonModule yahan add karein
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  stats = [
    { title: 'DOCTOR USER STATS', label: 'Total Doctor Users', value: '12' },
    { title: 'DOCTOR ODER STATS', label: 'Doctor Orders Available', value: '4' },
    { title: 'DOCTOR VERIFIED ODER STATS', label: 'Verified Doctor Orders', value: '3' },
    { title: 'DOCTOR PICKEDUP ODER STATS', label: 'Picked Up Doctor Oders', value: '34' }
  ];

  expiredDrugs = [
    { name: 'Panadol', batchId: '123213N' },
    { name: 'Citazin', batchId: '10298329N' },
    { name: 'Metformin', batchId: '1298319N' },
    { name: 'Chloroperi Hvbanate', batchId: '86545465N' }
  ];
}
