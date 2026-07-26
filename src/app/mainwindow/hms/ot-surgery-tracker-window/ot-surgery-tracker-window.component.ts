import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HmsService } from '../hms.service';
import { SurgeryCase } from '../hms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ot-surgery-tracker-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ot-surgery-tracker-window.component.html',
  styleUrls: ['./ot-surgery-tracker-window.component.css']
})
export class OtSurgeryTrackerWindowComponent implements OnInit, OnDestroy {
  surgeries: SurgeryCase[] = [];
  private sub!: Subscription;

  constructor(private hmsService: HmsService) {}

  ngOnInit(): void {
    this.sub = this.hmsService.getSurgeries().subscribe(data => {
      this.surgeries = data;
    });
  }

  onStatusChange(caseId: string, event: Event): void {
    const selectElem = event.target as HTMLSelectElement;
    const newStatus = selectElem.value as 'Scheduled' | 'In-Progress' | 'Completed';
    this.hmsService.updateSurgeryStatus(caseId, newStatus);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
