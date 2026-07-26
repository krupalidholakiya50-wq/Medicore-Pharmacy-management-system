
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

import { InventoryFilterPipe } from 'src/app/mainwindow/a-inventory-window/inventory-filter.pipe';
import { Supplier } from './supplier.model';
import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'supplierFilter',
  pure: false
})
export class SupplierFilterPipe implements PipeTransform{

  transform(suppliers: Supplier[], searchTerm: string) :Supplier[] {
    if(!suppliers || !searchTerm){
      return suppliers;
    }

    return suppliers.filter( supplier =>
                           supplier.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
