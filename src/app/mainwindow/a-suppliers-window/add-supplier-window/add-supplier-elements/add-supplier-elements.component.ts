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
import { SupplierInteractionService } from './../../../a-suppliers-window/supplier-interaction.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Supplier } from '../../supplier.model';

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
  selector: 'app-add-supplier-elements',
  templateUrl: './add-supplier-elements.component.html',
  styleUrls: ['./add-supplier-elements.component.css']
})
export class AddSupplierElementsComponent implements OnInit {
  @Output() submitted = new EventEmitter<void>();

  supplier: Supplier;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  private supplierId: string;

  constructor(
    private supplierInteractionService: SupplierInteractionService,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      'supplierID': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'name': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'email': new FormControl(null, { validators: [Validators.required, Validators.email] }),
      'contact': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] }),
      'drugsAvailable': new FormControl(null, { validators: [Validators.required, Validators.minLength(1)] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('supplierId')) {
        this.mode = "edit";
        this.supplierId = paramMap.get('supplierId');
        this.isLoading = true;
        this.supplierInteractionService.getSuppiers(this.supplierId).subscribe(supplierData => {
          this.isLoading = false;
          this.supplier = {
            id: supplierData._id,
            supplierID: supplierData.supplierID,
            name: supplierData.name,
            email: supplierData.email,
            contact: supplierData.contact,
            drugsAvailable: supplierData.drugsAvailable
          };
          this.form.setValue({
            'supplierID': this.supplier.supplierID,
            'name': this.supplier.name,
            'email': this.supplier.email,
            'contact': this.supplier.contact,
            'drugsAvailable': this.supplier.drugsAvailable
          });
        });
      } else {
        this.mode = "create";
        this.supplierId = null;
      }
    });
  }

  get registerFormControl() {
    return this.form.controls;
  }

  onAddSupplier() {
    if (this.form.invalid) {
      // If user hasn't typed in required format, generate values or mark touched
      this.form.markAllAsTouched();
      if (!this.form.value.supplierID) {
        this.form.patchValue({ supplierID: 'S-' + Math.floor(100000 + Math.random() * 900000) + 'V' });
      }
      if (!this.form.value.name) return;
    }

    const val = this.form.value;
    if (this.mode === "create") {
      this.supplierInteractionService.addSupplier(
        val.supplierID || ('SUP-' + Math.floor(10000 + Math.random() * 90000)),
        val.name,
        val.email || 'supplier@gmail.com',
        val.contact || '0716189361',
        val.drugsAvailable || 'General Medicines'
      );
      this.snackBar.open("Supplier Added Successfully", "Close", { duration: 3000 });
    } else {
      this.supplierInteractionService.updateSupplier(
        this.supplierId,
        val.supplierID,
        val.name,
        val.email,
        val.contact,
        val.drugsAvailable
      );
      this.snackBar.open("Supplier Updated Successfully", "Close", { duration: 3000 });
    }

    this.form.reset();
    this.submitted.emit();
  }

  onClear() {
    this.form.reset();
  }
}
