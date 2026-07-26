import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewDoctorOrderItemComponent } from './new-doctor-order-window/new-doctor-order-item/new-doctor-order-item.component';
import { VerifiedDoctorOrderItemComponent } from './verified-doctor-order-window/verified-doctor-order-item/verified-doctor-order-item.component';
import { PickupOrderItemComponent } from './pickup-order-window/pickup-order-item/pickup-order-item.component';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    NewDoctorOrderItemComponent,
    VerifiedDoctorOrderItemComponent,
    PickupOrderItemComponent
  ],
  standalone: true,
  selector: 'app-a-doctor-order-window',
  templateUrl: './a-doctor-order-window.component.html',
  styleUrls: ['./a-doctor-order-window.component.css']
})
export class ADoctorOrderWindowComponent implements OnInit {
  // Expanded 8 Unique Orders Pipeline
  newOrders: any[] = [
    {
      id: "O-001", doctorName: "Dr. Krupali Dholakiya", doctorContact: "+91 98250 12345", doctorId: "DOC-CARD-101", doctorEmail: "krupali@apex.org", total: 9600, pickupDate: "2026-07-28", status: "New",
      drugs: [
        { name: "Panadol 500mg", price: 1200, quantity: 3 },
        { name: "Amoxillin 500mg", price: 1200, quantity: 3 },
        { name: "Chloroperi Hybanate", price: 1200, quantity: 2 }
      ]
    },
    {
      id: "O-002", doctorName: "Dr. Janvi Ramani", doctorContact: "+91 97129 67890", doctorId: "DOC-NEURO-102", doctorEmail: "janvi.ramani@apex.org", total: 3600, pickupDate: "2026-07-28", status: "New",
      drugs: [
        { name: "Panadol 500mg", price: 1200, quantity: 3 }
      ]
    },
    {
      id: "O-003", doctorName: "Dr. Sejal Gond", doctorContact: "+91 98980 11223", doctorId: "DOC-ORTHO-103", doctorEmail: "sejal.gond@apex.org", total: 4800, pickupDate: "2026-07-29", status: "New",
      drugs: [
        { name: "Citazin 10mg", price: 1200, quantity: 4 }
      ]
    },
    {
      id: "O-004", doctorName: "Dr. Rajesh Mehta", doctorContact: "+91 98240 55667", doctorId: "DOC-SURG-104", doctorEmail: "rajesh.mehta@apex.org", total: 6000, pickupDate: "2026-07-29", status: "New",
      drugs: [
        { name: "Metformin 850mg", price: 1200, quantity: 5 }
      ]
    },
    {
      id: "O-005", doctorName: "Dr. Priya Desai", doctorContact: "+91 97111 22334", doctorId: "DOC-GYN-105", doctorEmail: "priya.desai@apex.org", total: 2400, pickupDate: "2026-07-30", status: "New",
      drugs: [
        { name: "Salvitamol Syrup", price: 1200, quantity: 2 }
      ]
    }
  ];

  verifiedOrders: any[] = [
    {
      id: "O-006", doctorName: "Dr. Janvi Ramani", doctorContact: "+91 97129 67890", doctorId: "DOC-NEURO-102", doctorEmail: "janvi.ramani@apex.org", total: 6000, pickupDate: "2026-07-27", status: "Verified",
      drugs: [
        { name: "Panadol", price: 1200, quantity: 1 },
        { name: "Citazin", price: 1200, quantity: 1 },
        { name: "Metformin", price: 1200, quantity: 1 },
        { name: "Salvitamol", price: 1200, quantity: 2 }
      ]
    },
    {
      id: "O-007", doctorName: "Dr. Sejal Gond", doctorContact: "+91 98980 11223", doctorId: "DOC-ORTHO-103", doctorEmail: "sejal.gond@apex.org", total: 14400, pickupDate: "2026-07-27", status: "Verified",
      drugs: [
        { name: "Metformin", price: 1200, quantity: 12 }
      ]
    }
  ];

  pickedUpOrders: any[] = [
    {
      id: "O-008", doctorName: "Dr. Krupali Dholakiya", doctorContact: "+91 98250 12345", doctorId: "DOC-CARD-101", doctorEmail: "krupali@apex.org", total: 2400, pickupDate: "2026-07-26", status: "PickedUp", timestamp: "2026-07-26 11:30 AM",
      drugs: [
        { name: "Amoxillin 500mg", price: 1200, quantity: 2 }
      ]
    }
  ];

  activeTab: string = 'New';
  currentOrders: any[] = [];

  constructor() { }

  ngOnInit() {
    this.currentOrders = [...this.newOrders];
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'New') this.currentOrders = [...this.newOrders];
    if (tabName === 'Verified') this.currentOrders = [...this.verifiedOrders];
    if (tabName === 'PickedUp') this.currentOrders = [...this.pickedUpOrders];
  }

  // Stage 1 -> Stage 2: Move from New to Verified
  verifyOrder(orderId: string) {
    const index = this.newOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      const order = this.newOrders.splice(index, 1)[0];
      order.status = 'Verified';
      this.verifiedOrders.unshift(order);
      this.setActiveTab(this.activeTab);
    }
  }

  // Stage 2 -> Stage 3: Move from Verified to PickedUp with delivery timestamp log
  pickUpOrder(orderId: string) {
    const index = this.verifiedOrders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      const order = this.verifiedOrders.splice(index, 1)[0];
      order.status = 'PickedUp';
      order.timestamp = new Date().toLocaleString();
      this.pickedUpOrders.unshift(order);
      this.setActiveTab(this.activeTab);
    }
  }
}
