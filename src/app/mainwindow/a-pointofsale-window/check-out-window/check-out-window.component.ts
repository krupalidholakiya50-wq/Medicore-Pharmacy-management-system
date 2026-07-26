import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutElementsComponent } from './check-out-elements/check-out-elements.component';

@Component({
  selector: 'app-check-out-window',
  standalone: true,
  imports: [CommonModule, RouterModule, CheckOutElementsComponent],
  templateUrl: './check-out-window.component.html',
  styleUrls: ['./check-out-window.component.css']
})
export class CheckOutWindowComponent implements OnInit {

  ngOnInit(): void {}

  printBill(): void {
    window.print();
  }
}
