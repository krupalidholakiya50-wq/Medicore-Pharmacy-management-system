import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
  signal,
  viewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Chart, registerables } from 'chart.js';
import { ApiService } from '../services/api.service';

Chart.register(...registerables);

interface DashboardStat {
  title: string;
  label: string;
  value: number;
}

interface DrugNotification {
  name: string;
  batchId: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly api = inject(ApiService);

  readonly salesChartRef = viewChild<any>('salesChart');
  readonly quantityChartRef = viewChild<any>('quantityChart');

  private salesChart?: Chart;
  private quantityChart?: Chart;

  readonly stats = signal<DashboardStat[]>([]);
  readonly expiredDrugs = signal<DrugNotification[]>([]);
  readonly outOfStock = signal<DrugNotification[]>([]);
  readonly finishedDrugs = signal<DrugNotification[]>([]);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.salesChart?.destroy();
      this.quantityChart?.destroy();
    });
  }

  ngAfterViewInit(): void {
    this.loadDashboardData();
    this.createSalesChart();
    this.createQuantityChart();
  }

  private loadDashboardData(): void {
    this.api.get<any[]>('/inventory').subscribe({
      next: (items) => {
        const inventory = Array.isArray(items) ? items : [];
        const outOfStock = inventory.filter((item) => Number(item.quantity) <= 0);
        const lowStock = inventory.filter((item) => Number(item.quantity) > 0 && Number(item.quantity) <= 10);

        this.stats.set([
          { title: 'DOCTOR USER STATS', label: 'Total Doctor Users', value: 12 },
          { title: 'DOCTOR ORDER STATS', label: 'Doctor Orders Available', value: 4 },
          { title: 'VERIFIED ORDER STATS', label: 'Verified Doctor Orders', value: 3 },
          { title: 'PICKED UP ORDER STATS', label: 'Picked Up Orders', value: 34 }
        ]);

        this.expiredDrugs.set(inventory.slice(0, 4).map((item) => ({
          name: item.name,
          batchId: item.batchId || 'N/A'
        })));

        this.outOfStock.set(outOfStock.length ? outOfStock.map((item) => ({
          name: item.name,
          batchId: item.batchId || 'N/A'
        })) : [{ name: 'No out-of-stock items', batchId: 'N/A' }]);

        this.finishedDrugs.set(lowStock.length ? lowStock.map((item) => ({
          name: item.name,
          batchId: item.batchId || 'N/A'
        })) : [{ name: 'No low-stock items', batchId: 'N/A' }]);
      },
      error: () => {
        this.stats.set([
          { title: 'DOCTOR USER STATS', label: 'Total Doctor Users', value: 12 },
          { title: 'DOCTOR ORDER STATS', label: 'Doctor Orders Available', value: 4 },
          { title: 'VERIFIED ORDER STATS', label: 'Verified Doctor Orders', value: 3 },
          { title: 'PICKED UP ORDER STATS', label: 'Picked Up Orders', value: 34 }
        ]);
        this.expiredDrugs.set([{ name: 'Unable to load data', batchId: 'N/A' }]);
        this.outOfStock.set([{ name: 'Unable to load data', batchId: 'N/A' }]);
        this.finishedDrugs.set([{ name: 'Unable to load data', batchId: 'N/A' }]);
      }
    });
  }

  private createSalesChart(): void {
    const canvas = this.salesChartRef()?.nativeElement;
    if (!canvas) {
      return;
    }

    this.salesChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan-2020', 'Feb-2020', 'Mar-2020', 'Apr-2020', 'May-2020', 'Jun-2020', 'Jul-2020'],
        datasets: [
          {
            label: 'Sales',
            data: [50000, 100000, 150000, 200000, 250000, 300000, 550000],
            backgroundColor: '#4aa3df',
            borderRadius: 3,
            barThickness: 18
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: {
            labels: {
              color: '#ffffff',
              font: {
                size: 13
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255,255,255,.15)'
            }
          },
          y: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255,255,255,.08)'
            }
          }
        }
      }
    });
  }

  private createQuantityChart(): void {
    const canvas = this.quantityChartRef()?.nativeElement;
    if (!canvas) {
      return;
    }

    this.quantityChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Amoxillin', 'Citazin', 'Panadol', 'Metformin'],
        datasets: [
          {
            label: 'Quantity',
            data: [40, 60, 35, 75],
            backgroundColor: '#f39c12',
            borderRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#ffffff'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255,255,255,.15)'
            }
          },
          y: {
            ticks: {
              color: '#ffffff'
            },
            grid: {
              color: 'rgba(255,255,255,.10)'
            }
          }
        }
      }
    });
  }

  trackByStat(index: number, item: DashboardStat): string {
    return item.title;
  }

  trackByDrug(index: number, item: DrugNotification): string {
    return item.batchId;
  }

  viewExpiredNotifications(): void {}
  viewOutOfStockNotifications(): void {}
  viewFinishedNotifications(): void {}
  refreshDashboard(): void {}
}
