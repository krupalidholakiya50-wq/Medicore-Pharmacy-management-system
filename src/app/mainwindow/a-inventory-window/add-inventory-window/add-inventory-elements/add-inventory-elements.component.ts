import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { HospitalCoreStoreService } from '../../../../services/hospital-core-store.service';
import { Inventory } from './../../inventory.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  imports: [
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
  selector: 'app-add-inventory-elements',
  templateUrl: './add-inventory-elements.component.html',
  styleUrls: ['./add-inventory-elements.component.css']
})
export class AddInventoryElementsComponent implements OnInit {
  enteredEmail = "";
  enteredName = "";
  enteredQuantity = "";
  enteredBatchId = "";
  enteredExpireDate = "";
  enteredPrice = "";

  inventory: Inventory;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private inventoryId: string;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private storeService: HospitalCoreStoreService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'name': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'quantity': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'batchId': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'expireDate': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'price': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'image': new FormControl(null)
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('inventoryId')) {
        this.mode = "edit";
        this.inventoryId = paramMap.get('inventoryId');
        this.isLoading = true;
        this.inventoryInteractionService.getInventorys(this.inventoryId).subscribe(inventoryData => {
          this.isLoading = false;
          this.inventory = {
            id: inventoryData._id,
            email: inventoryData.email,
            name: inventoryData.name,
            quantity: inventoryData.quantity,
            batchId: inventoryData.batchId,
            expireDate: inventoryData.expireDate,
            price: inventoryData.price,
            imagePath: inventoryData.imagePath
          };
          this.form.setValue({
            'email': this.inventory.email,
            'name': this.inventory.name,
            'quantity': this.inventory.quantity,
            'batchId': this.inventory.batchId,
            'expireDate': this.inventory.expireDate,
            'price': this.inventory.price,
            'image': this.inventory.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.inventoryId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onAddInventory() {
    if (this.form.invalid) {
      return;
    }

    const item = {
      email: this.form.value.email,
      name: this.form.value.name,
      drugName: this.form.value.name,
      quantity: this.form.value.quantity,
      batchId: this.form.value.batchId,
      expireDate: this.form.value.expireDate,
      expiryDate: this.form.value.expireDate,
      price: this.form.value.price,
      supplier: this.form.value.email
    };

    // Live Unshifted Push into Master Store
    this.storeService.addInventoryItem(item);

    try {
      if (this.mode === "create") {
        this.inventoryInteractionService.addInventory(
          item.email, item.name, item.quantity, item.batchId, item.expireDate, item.price, this.form.value.image
        );
      } else {
        this.inventoryInteractionService.updateInventory(
          this.inventoryId, item.email, item.name, item.quantity, item.batchId, item.expireDate, item.price, this.form.value.image
        );
      }
    } catch (e) {
      console.warn("Backend add inventory fallback:", e);
    }

    if (this.snackBar) {
      this.snackBar.open("Drug Added Live Successfully!", "Close", { duration: 3000 });
    }

    this.form.reset();
  }
}
