import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerifiedDoctorOrderItemComponent } from './verified-doctor-order-item/verified-doctor-order-item.component';
import { NewDoctorOrderItemComponent } from '../new-doctor-order-window/new-doctor-order-item/new-doctor-order-item.component';
import { PickupOrderItemComponent } from '../pickup-order-window/pickup-order-item/pickup-order-item.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    VerifiedDoctorOrderItemComponent,
    NewDoctorOrderItemComponent,
    PickupOrderItemComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatRadioModule,
    MatFormFieldModule,
        ],
  standalone: true,
  selector: 'app-verified-doctor-order-window',
  templateUrl: './verified-doctor-order-window.component.html',
  styleUrls: ['./verified-doctor-order-window.component.css']
})
export class VerifiedDoctorOrderWindowComponent implements OnInit {
  activeTab: string = 'Verified';

  constructor() { }

  ngOnInit() {
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

}
