
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
@Injectable({providedIn: 'root'})
export class DoctorOderServices {
  private docOders: any[] = [
    {
      id: "O-001", doctorName: "Krupali Dholakiya", doctorContact: "0716189361", doctorId: "9182739182V", doctorEmail: "krupali@gmail.com", totalAmount: 9600, pickupDate: "2026-08-22", status: "New",
      drugId: ["D101", "D102", "D103"],
      drugName: ["Panadol", "Amoxillin", "Chloroperi Hybanate"],
      drugPrice: [1200, 1200, 1200],
      drugQuantity: [3, 3, 2],
      realQuantity: [3, 3, 2]
    },
    {
      id: "O-002", doctorName: "Janvi Ramani", doctorContact: "0723456789", doctorId: "982734612V", doctorEmail: "janvi.ramani@gmail.com", totalAmount: 3600, pickupDate: "2026-08-23", status: "New",
      drugId: ["D101"],
      drugName: ["Panadol"],
      drugPrice: [1200],
      drugQuantity: [3],
      realQuantity: [3]
    },
    {
      id: "O-003", doctorName: "Sejal Gond", doctorContact: "0756789123", doctorId: "951234876V", doctorEmail: "sejal.gond@gmail.com", totalAmount: 4800, pickupDate: "2026-08-24", status: "New",
      drugId: ["D104"],
      drugName: ["Citazin"],
      drugPrice: [1200],
      drugQuantity: [4],
      realQuantity: [4]
    }
  ];
  private docOdersUpdated = new Subject<any[]>();

  private VerifiedDocOders: any[] = [
    {
      id: "O-004", doctorName: "Janvi Ramani", doctorContact: "+94716189361", doctorId: "973273616V", doctorEmail: "janvi.ramani@gmail.com", totalAmount: 6000, pickupDate: "2026-07-26", status: "Verified",
      drugId: ["D101", "D104", "D105", "D106"],
      drugName: ["Panadol", "Citazin", "Metformin", "Salvitamol"],
      drugPrice: [1200, 1200, 1200, 1200],
      drugQuantity: [1, 1, 1, 2],
      realQuantity: [1, 1, 1, 2]
    },
    {
      id: "O-005", doctorName: "Sejal Gond", doctorContact: "0716189361", doctorId: "9182739182V", doctorEmail: "sejal.gond@gmail.com", totalAmount: 14400, pickupDate: "2026-09-21", status: "Verified",
      drugId: ["D105"],
      drugName: ["Metformin"],
      drugPrice: [1200],
      drugQuantity: [12],
      realQuantity: [12]
    },
    {
      id: "O-006", doctorName: "Krupali Dholakiya", doctorContact: "0779876543", doctorId: "891276345V", doctorEmail: "krupali@gmail.com", totalAmount: 2400, pickupDate: "2026-09-25", status: "Verified",
      drugId: ["D102"],
      drugName: ["Amoxillin"],
      drugPrice: [1200],
      drugQuantity: [2],
      realQuantity: [2]
    }
  ];
  private VerifiedDocOdersUpdated = new Subject<any[]>();

  private PickedUpDocOders: any[] = [
    {
      id: "O-007", doctorName: "Krupali Dholakiya", doctorContact: "0771234567", doctorId: "851234567V", doctorEmail: "krupali.dholakiya@gmail.com", totalAmount: 2400, pickupDate: "2026-07-20", acctualDate: "2026-07-20", status: "PickedUp",
      drugId: ["D102"],
      drugName: ["Amoxillin"],
      drugPrice: [1200],
      drugQuantity: [2]
    }
  ];
  private PickedUpDocOdersUpdated = new Subject<any[]>();

  constructor(private http: HttpClient, private router: Router) {}

  createDoctorUser(doctorName: string, doctorContact: string, doctorId: string, doctorEmail: string, drugId: Array<any> = [], drugName: Array<any> = [], drugPrice: Array<any> = [], drugQuantity: Array<any> = [], realQuantity: Array<any> = [], totalAmount: number, pickupDate: string) {
    const DoctorOderData = { doctorName, doctorContact, doctorId, doctorEmail, drugId, drugName, drugPrice, drugQuantity, realQuantity, totalAmount, pickupDate };
    this.http.post("http://localhost:3000/api/doctorOder", DoctorOderData).subscribe({
      next: (res) => console.log("Added doctor order:", res),
      error: (err) => console.log(err)
    });
  }

  createVerifiedDoctorOder(doctorName: string, doctorEmail: string, doctorId: string, totalAmount: number, pickupDate: string, drugId: Array<any> = [], drugName: Array<any> = [], drugPrice: Array<any> = [], drugQuantity: Array<any> = [], realQuantity: Array<any> = [], doctorContact: string, id?: string) {
    const newVerifiedItem = {
      id: id || 'O-VERIFIED-' + Date.now(),
      doctorName, doctorContact, doctorId, doctorEmail, drugId, drugName, drugPrice, drugQuantity, realQuantity, totalAmount, pickupDate, status: 'Verified'
    };

    // 1. Remove from New Orders list
    if (id) {
      this.docOders = this.docOders.filter(o => o.id !== id);
    } else {
      this.docOders.shift();
    }
    this.docOdersUpdated.next([...this.docOders]);

    // 2. Add to Verified Orders list
    this.VerifiedDocOders.push(newVerifiedItem);
    this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders]);

    // 3. Post to backend
    this.http.post("http://localhost:3000/api/verifiedDoctorOder", newVerifiedItem).subscribe({
      next: (res) => console.log("Verified order created:", res),
      error: (err) => console.log(err)
    });
  }

  createPickedUpDoctorOder(doctorName: string, doctorEmail: string, doctorId: string, totalAmount: number, pickupDate: string, drugId: Array<any> = [], drugName: Array<any> = [], drugPrice: Array<any> = [], drugQuantity: Array<any> = [], doctorContact: string, id?: string) {
    const newPickedUpItem = {
      id: id || 'O-PICKED-' + Date.now(),
      doctorName, doctorContact, doctorId, doctorEmail, drugId, drugName, drugPrice, drugQuantity, totalAmount, pickupDate, acctualDate: pickupDate || "2026-07-20", status: 'PickedUp'
    };

    // 1. Remove from Verified Orders list
    if (id) {
      this.VerifiedDocOders = this.VerifiedDocOders.filter(o => o.id !== id);
    } else {
      this.VerifiedDocOders.shift();
    }
    this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders]);

    // 2. Add to Picked Up Orders list
    this.PickedUpDocOders.push(newPickedUpItem);
    this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders]);

    // 3. Post to backend
    this.http.post("http://localhost:3000/api/pickedUpOders", newPickedUpItem).subscribe({
      next: (res) => console.log("PickedUp order created:", res),
      error: (err) => console.log(err)
    });
  }

  getDocOders() {
    this.docOdersUpdated.next([...this.docOders]);
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3000/api/doctorOder")
      .pipe(map(docOderData => {
        if (!docOderData || !docOderData.doctorOders || docOderData.doctorOders.length === 0) return [];
        return docOderData.doctorOders.map(doctorOder => ({
          doctorName: doctorOder.doctorName || 'Krupali Dholakiya',
          doctorContact: doctorOder.doctorContact || '0716189361',
          doctorId: doctorOder.doctorID || doctorOder.doctorId || '9182739182V',
          doctorEmail: doctorOder.doctorEmail || 'krupali@gmail.com',
          drugId: doctorOder.drugId || [],
          drugName: Array.isArray(doctorOder.drugNames) ? doctorOder.drugNames : (Array.isArray(doctorOder.drugName) ? doctorOder.drugName : [doctorOder.drugName || 'Panadol']),
          drugPrice: Array.isArray(doctorOder.drugPrice) ? doctorOder.drugPrice : [doctorOder.drugPrice || 1200],
          drugQuantity: Array.isArray(doctorOder.drugQuantity) ? doctorOder.drugQuantity : [doctorOder.drugQuantity || 1],
          realQuantity: doctorOder.realQuantity || [],
          totalAmount: doctorOder.totalAmount || 9600,
          pickupDate: doctorOder.pickupDate || '2026-08-22',
          id: doctorOder._id || doctorOder.id
        }));
      }))
      .subscribe({
        next: (transformedDocOders) => {
          if (transformedDocOders && transformedDocOders.length > 0) {
            this.docOders = transformedDocOders;
            this.docOdersUpdated.next([...this.docOders]);
          }
        },
        error: (err) => console.error("Error fetching doctor orders:", err)
      });
  }

  getDocOdersUpdateListener() {
    return this.docOdersUpdated.asObservable();
  }

  getVerifiedDocOders() {
    this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders]);
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3000/api/verifiedDoctorOder")
      .pipe(map(docOderData => {
        if (!docOderData || !docOderData.doctorOders || docOderData.doctorOders.length === 0) return [];
        return docOderData.doctorOders.map(doctorOder => ({
          doctorName: doctorOder.doctorName || 'Janvi Ramani',
          doctorContact: doctorOder.doctorContact || '+94716189361',
          doctorId: doctorOder.doctorID || doctorOder.doctorId || '973273616V',
          doctorEmail: doctorOder.doctorEmail || 'janvi.ramani@gmail.com',
          drugId: doctorOder.drugId || [],
          drugName: Array.isArray(doctorOder.drugNames) ? doctorOder.drugNames : (Array.isArray(doctorOder.drugName) ? doctorOder.drugName : [doctorOder.drugName || 'Metformin']),
          drugPrice: Array.isArray(doctorOder.drugPrice) ? doctorOder.drugPrice : [doctorOder.drugPrice || 1200],
          drugQuantity: Array.isArray(doctorOder.drugQuantity) ? doctorOder.drugQuantity : [doctorOder.drugQuantity || 1],
          realQuantity: doctorOder.realQuantity || [],
          totalAmount: doctorOder.totalAmount || 6000,
          pickupDate: doctorOder.pickupDate || '2026-07-26',
          id: doctorOder._id || doctorOder.id
        }));
      }))
      .subscribe({
        next: (transformedDocOders) => {
          if (transformedDocOders && transformedDocOders.length > 0) {
            this.VerifiedDocOders = transformedDocOders;
            this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders]);
          }
        },
        error: (err) => console.error("Error fetching verified orders:", err)
      });
  }

  getVerifiedDocOdersUpdateListener() {
    return this.VerifiedDocOdersUpdated.asObservable();
  }

  getPickedUpDocOders() {
    this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders]);
    this.http.get<{message: string, doctorOders: any}>("http://localhost:3000/api/pickedUpOders")
      .pipe(map(docOderData => {
        if (!docOderData || !docOderData.doctorOders || docOderData.doctorOders.length === 0) return [];
        return docOderData.doctorOders.map(doctorOder => ({
          doctorName: doctorOder.doctorName || 'Krupali Dholakiya',
          doctorContact: doctorOder.doctorContact || '0771234567',
          doctorId: doctorOder.doctorID || doctorOder.doctorId || '851234567V',
          doctorEmail: doctorOder.doctorEmail || 'krupali.dholakiya@gmail.com',
          drugName: Array.isArray(doctorOder.drugNames) ? doctorOder.drugNames : (Array.isArray(doctorOder.drugName) ? doctorOder.drugName : [doctorOder.drugName || 'Amoxillin']),
          drugPrice: Array.isArray(doctorOder.drugPrice) ? doctorOder.drugPrice : [doctorOder.drugPrice || 1200],
          drugQuantity: Array.isArray(doctorOder.drugQuantity) ? doctorOder.drugQuantity : [doctorOder.drugQuantity || 2],
          totalAmount: doctorOder.totalAmount || 2400,
          pickupDate: doctorOder.pickupDate || '2026-07-20',
          acctualDate: doctorOder.dateTime || doctorOder.pickupDate || '2026-07-20',
          id: doctorOder._id || doctorOder.id
        }));
      }))
      .subscribe({
        next: (transformedPickedUpDocOders) => {
          if (transformedPickedUpDocOders && transformedPickedUpDocOders.length > 0) {
            this.PickedUpDocOders = transformedPickedUpDocOders;
            this.PickedUpDocOdersUpdated.next([...this.PickedUpDocOders]);
          }
        },
        error: (err) => console.error("Error fetching pickedup orders:", err)
      });
  }

  getPickedUpDocOdersUpdateListener() {
    return this.PickedUpDocOdersUpdated.asObservable();
  }

  deleteItem(oderId: string) {
    this.docOders = this.docOders.filter(order => order.id !== oderId);
    this.docOdersUpdated.next([...this.docOders]);
    this.http.delete('http://localhost:3000/api/doctorOder/' + oderId).subscribe({
      next: (res) => console.log("Deleted new order:", res),
      error: (err) => console.log(err)
    });
  }

  deleteVerifiedItem(oderId: string) {
    this.VerifiedDocOders = this.VerifiedDocOders.filter(order => order.id !== oderId);
    this.VerifiedDocOdersUpdated.next([...this.VerifiedDocOders]);
    this.http.delete('http://localhost:3000/api/verifiedDoctorOder/' + oderId).subscribe({
      next: (res) => console.log("Deleted verified order:", res),
      error: (err) => console.log(err)
    });
  }
}
