import { CommonModule } from '@angular/common';
import { NewDoctorOrderItemComponent } from './new-doctor-order-item/new-doctor-order-item.component';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    CommonModule,
    NewDoctorOrderItemComponent
  ],
  standalone: true,
  selector: 'app-new-doctor-order-window',
  templateUrl: './new-doctor-order-window.component.html',
  styleUrls: ['./new-doctor-order-window.component.css']
})
export class NewDoctorOrderWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
