import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { Inventory as InventoryModel } from '../../services/inventory.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class Inventory implements OnInit {
  inventoryItems: InventoryModel[] = [];
  filteredItems: InventoryModel[] = [];
  readonly inventoryItemsSignal = signal<InventoryModel[]>([]);
  searchText = '';
  selectedItem: InventoryModel | null = null;
  loading = false;
  inventoryForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  isEditing = false;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 1;

  sortColumn = '';
  sortAscending = true;

  constructor(private inventoryService: InventoryService, private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadInventory();
  }

  buildForm(): void {
    this.inventoryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      batchId: ['', [Validators.required, Validators.minLength(2)]],
      expireDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['General'],
      supplier: ['Unknown'],
      imagePath: ['']
    });
  }

  get f() {
    return this.inventoryForm.controls;
  }

  searchInventory(): void {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.filteredItems = [...this.inventoryItems];
      this.updatePagination();
      return;
    }

    this.filteredItems = this.inventoryItems.filter((item) => {
      const name = item.name?.toLowerCase() ?? '';
      const batchId = item.batchId?.toLowerCase() ?? '';
      const category = item.category?.toLowerCase() ?? '';
      const supplier = item.supplier?.toLowerCase() ?? '';

      return name.includes(keyword) || batchId.includes(keyword) || category.includes(keyword) || supplier.includes(keyword);
    });

    this.updatePagination();
  }

  addItem(): void {
    this.isEditing = false;
    this.selectedItem = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.inventoryForm.reset({
      email: '',
      name: '',
      quantity: '',
      batchId: '',
      expireDate: '',
      price: '',
      category: 'General',
      supplier: 'Unknown',
      imagePath: ''
    });
  }

  editItem(item: InventoryModel): void {
    this.isEditing = true;
    this.selectedItem = item;
    this.errorMessage = '';
    this.successMessage = '';
    this.inventoryForm.patchValue({
      email: item.email ?? '',
      name: item.name ?? '',
      quantity: item.quantity ?? '',
      batchId: item.batchId ?? '',
      expireDate: item.expireDate ?? '',
      price: item.price ?? '',
      category: item.category ?? 'General',
      supplier: item.supplier ?? 'Unknown',
      imagePath: item.imagePath ?? ''
    });
  }

  submitInventory(): void {
    if (this.inventoryForm.invalid) {
      this.inventoryForm.markAllAsTouched();
      this.errorMessage = 'Please correct the highlighted fields before saving.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = this.inventoryForm.value;
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const request = this.isEditing && this.selectedItem?._id
      ? this.api.put<{ message: string }>(`/inventory/${this.selectedItem._id}`, Object.fromEntries(Array.from(formData.entries())))
      : this.api.post<{ message: string; inventory?: InventoryModel }>(`/inventory`, Object.fromEntries(Array.from(formData.entries())));

    request.subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = this.isEditing ? 'Medicine updated successfully.' : 'Medicine added successfully.';
        this.loadInventory();
        this.addItem();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = this.isEditing ? 'Unable to update medicine. Please try again.' : 'Unable to add medicine. Please try again.';
      }
    });
  }

  deleteItem(item: InventoryModel): void {
    const confirmed = confirm(`Delete "${item.name}" ?`);
    if (!confirmed || !item._id) {
      return;
    }

    this.loading = true;
    this.api.delete<{ message: string }>(`/inventory/${item._id}`).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Medicine deleted successfully.';
        this.loadInventory();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to delete medicine. Please try again.';
      }
    });
  }

  refreshTable(): void {
    this.loadInventory();
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'In Stock':
        return 'status-success';
      case 'Low Stock':
        return 'status-warning';
      case 'Out Of Stock':
        return 'status-danger';
      default:
        return '';
    }
  }

  trackByItem(index: number, item: InventoryModel): string {
    return item._id ?? `${item.name}-${index}`;
  }

  updatePagination(): void {
    this.totalItems = this.filteredItems.length;
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  sort(column: keyof InventoryModel): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.filteredItems.sort((a, b) => {
      const valueA = a[column] ?? '';
      const valueB = b[column] ?? '';
      const left = String(valueA).toLowerCase();
      const right = String(valueB).toLowerCase();

      if (left < right) {
        return this.sortAscending ? -1 : 1;
      }

      if (left > right) {
        return this.sortAscending ? 1 : -1;
      }

      return 0;
    });
  }

  resetSearch(): void {
    this.searchText = '';
    this.filteredItems = [...this.inventoryItems];
    this.currentPage = 1;
    this.updatePagination();
  }

  loadInventory(): void {
    this.loading = true;
    this.api.get<{ message: string; inventorys?: InventoryModel[] }>('/inventory').subscribe({
      next: (response) => {
        this.inventoryItems = (response.inventorys ?? []).map((item) => ({
          ...item,
          category: item.category ?? 'General',
          supplier: item.supplier ?? 'Unknown',
          status: this.getDerivedStatus(item.quantity)
        }));
        this.inventoryItemsSignal.set(this.inventoryItems);
        this.filteredItems = [...this.inventoryItems];
        this.updatePagination();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load medicine stock right now.';
      }
    });
  }

  private getDerivedStatus(quantity: number | string | undefined): 'In Stock' | 'Low Stock' | 'Out Of Stock' {
    const value = Number(quantity);
    if (Number.isNaN(value)) {
      return 'In Stock';
    }
    if (value <= 0) {
      return 'Out Of Stock';
    }
    if (value <= 10) {
      return 'Low Stock';
    }
    return 'In Stock';
  }
}
