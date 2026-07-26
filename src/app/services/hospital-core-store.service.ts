import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface InventoryItem {
  id?: string;
  email: string;
  name: string;
  drugName?: string;
  quantity: string | number;
  batchId: string;
  expireDate: string;
  expiryDate?: string;
  price: string | number;
  supplier?: string;
  imagePath?: string;
}

export interface DoctorOrder {
  id: string;
  doctorName: string;
  doctorContact: string;
  doctorId: string;
  doctorEmail: string;
  total: number;
  pickupDate: string;
  status: 'New' | 'Verified' | 'PickedUp';
  timestamp?: string;
  drugs: { name: string; price: number; quantity: number }[];
}

export interface SaleRecord {
  id: string;
  date: string;
  totalAmount: number;
  itemsCount: number;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class HospitalCoreStoreService {

  // 1. Central Inventory State Array
  private initialInventory: InventoryItem[] = [
    { id: 'INV-101', email: 'krupali@gmail.com', name: 'Panadol', drugName: 'Panadol', quantity: 2960, batchId: 'PND-2026A', expireDate: '2028-12-15', expiryDate: '2028-12-15', price: 1200, supplier: 'Krupali Dholakiya', imagePath: 'assets/img/panadol.jpg' },
    { id: 'INV-102', email: 'janvi.ramani@gmail.com', name: 'Citazin', drugName: 'Citazin', quantity: 148, batchId: 'CTZ-2026B', expireDate: '2027-06-20', expiryDate: '2027-06-20', price: 850, supplier: 'Janvi Ramani', imagePath: 'assets/img/citazin.jpg' },
    { id: 'INV-103', email: 'sejal.gond@gmail.com', name: 'Metformin', drugName: 'Metformin', quantity: 9791, batchId: 'MET-2026C', expireDate: '2029-03-10', expiryDate: '2029-03-10', price: 1450, supplier: 'Sejal Gond', imagePath: 'assets/img/metformin.jpg' },
    { id: 'INV-104', email: 'janvi.ramani@gmail.com', name: 'Amoxillin', drugName: 'Amoxillin', quantity: 5, batchId: 'AMX-2026D', expireDate: '2028-09-05', expiryDate: '2028-09-05', price: 1200, supplier: 'Janvi Ramani', imagePath: 'assets/img/amoxillin.jpg' },
    { id: 'INV-105', email: 'sejal.gond@gmail.com', name: 'Demo1', drugName: 'Demo1', quantity: 4, batchId: 'DEM-2026E', expireDate: '2026-11-18', expiryDate: '2026-11-18', price: 1201, supplier: 'Sejal Gond', imagePath: 'assets/img/demo1.jpg' },
    { id: 'INV-106', email: 'krupali@gmail.com', name: 'Chloroperi Hybanate', drugName: 'Chloroperi Hybanate', quantity: 3423, batchId: 'CPH-2026F', expireDate: '2026-08-12', expiryDate: '2026-08-12', price: 1200, supplier: 'Krupali Dholakiya', imagePath: 'assets/img/chloroperi.jpg' }
  ];

  private inventorySubject = new BehaviorSubject<InventoryItem[]>(this.initialInventory);

  // 2. Central 7-Order State Pipeline
  private initialOrders: DoctorOrder[] = [
    {
      id: 'O-001', doctorName: 'Dr. Krupali Dholakiya', doctorContact: '+91 98250 12345', doctorId: 'DOC-CARD-101', doctorEmail: 'krupali@apex.org', total: 9600, pickupDate: '2026-07-28', status: 'New',
      drugs: [{ name: 'Panadol 500mg', price: 1200, quantity: 3 }, { name: 'Amoxillin 500mg', price: 1200, quantity: 3 }]
    },
    {
      id: 'O-002', doctorName: 'Dr. Janvi Ramani', doctorContact: '+91 97129 67890', doctorId: 'DOC-NEURO-102', doctorEmail: 'janvi.ramani@apex.org', total: 3600, pickupDate: '2026-07-28', status: 'New',
      drugs: [{ name: 'Panadol 500mg', price: 1200, quantity: 3 }]
    },
    {
      id: 'O-003', doctorName: 'Dr. Sejal Gond', doctorContact: '+91 98980 11223', doctorId: 'DOC-ORTHO-103', doctorEmail: 'sejal.gond@apex.org', total: 4800, pickupDate: '2026-07-29', status: 'New',
      drugs: [{ name: 'Citazin 10mg', price: 1200, quantity: 4 }]
    },
    {
      id: 'O-004', doctorName: 'Dr. Amit Sharma', doctorContact: '+91 98240 55667', doctorId: 'DOC-SURG-104', doctorEmail: 'amit.sharma@apex.org', total: 6000, pickupDate: '2026-07-29', status: 'New',
      drugs: [{ name: 'Metformin 850mg', price: 1200, quantity: 5 }]
    },
    {
      id: 'O-005', doctorName: 'Dr. Pooja Patel', doctorContact: '+91 97111 22334', doctorId: 'DOC-GYN-105', doctorEmail: 'pooja.patel@apex.org', total: 2400, pickupDate: '2026-07-30', status: 'New',
      drugs: [{ name: 'Amoxillin 500mg', price: 1200, quantity: 2 }]
    },
    {
      id: 'O-006', doctorName: 'Dr. Rohan Verma', doctorContact: '+91 98999 44556', doctorId: 'DOC-PED-106', doctorEmail: 'rohan.verma@apex.org', total: 6000, pickupDate: '2026-07-27', status: 'Verified',
      drugs: [{ name: 'Citazin 10mg', price: 1200, quantity: 5 }]
    },
    {
      id: 'O-007', doctorName: 'Dr. Neha Gupta', doctorContact: '+91 98777 88990', doctorId: 'DOC-DERM-107', doctorEmail: 'neha.gupta@apex.org', total: 3600, pickupDate: '2026-07-26', status: 'PickedUp', timestamp: '2026-07-26 11:30 AM',
      drugs: [{ name: 'Panadol 500mg', price: 1200, quantity: 3 }]
    }
  ];

  private ordersSubject = new BehaviorSubject<DoctorOrder[]>(this.initialOrders);

  // 3. Central Sales Log State Array
  private initialSales: SaleRecord[] = [
    { id: 'SALE-1001', date: '2026-07-25', totalAmount: 4800, itemsCount: 4, paymentMethod: 'Cash' },
    { id: 'SALE-1002', date: '2026-07-26', totalAmount: 3600, itemsCount: 3, paymentMethod: 'UPI' }
  ];

  private salesSubject = new BehaviorSubject<SaleRecord[]>(this.initialSales);

  constructor() {}

  // Inventory Observables & Methods
  getInventory(): Observable<InventoryItem[]> {
    return this.inventorySubject.asObservable();
  }

  addInventoryItem(item: InventoryItem): void {
    const current = this.inventorySubject.value;
    const newItem = { ...item, id: 'INV-' + Date.now() };
    this.inventorySubject.next([newItem, ...current]);
  }

  deductStock(drugName: string, quantityDeducted: number): void {
    const current = this.inventorySubject.value;
    const updated = current.map(item => {
      if (item.name.toLowerCase() === drugName.toLowerCase() || item.drugName?.toLowerCase() === drugName.toLowerCase()) {
        const currentQty = Number(item.quantity) || 0;
        const newQty = Math.max(0, currentQty - quantityDeducted);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    this.inventorySubject.next(updated);
  }

  // Doctor Orders Observables & Methods
  getOrders(): Observable<DoctorOrder[]> {
    return this.ordersSubject.asObservable();
  }

  verifyOrder(id: string): void {
    const current = this.ordersSubject.value;
    const updated = current.map(o => {
      if (o.id === id) {
        return { ...o, status: 'Verified' as const };
      }
      return o;
    });
    this.ordersSubject.next(updated);
  }

  pickUpOrder(id: string): void {
    const current = this.ordersSubject.value;
    const updated = current.map(o => {
      if (o.id === id) {
        return { ...o, status: 'PickedUp' as const, timestamp: new Date().toLocaleString() };
      }
      return o;
    });
    this.ordersSubject.next(updated);
  }

  // Sales Observables & Methods
  getSales(): Observable<SaleRecord[]> {
    return this.salesSubject.asObservable();
  }

  recordSale(sale: SaleRecord): void {
    const current = this.salesSubject.value;
    this.salesSubject.next([sale, ...current]);
  }
}
