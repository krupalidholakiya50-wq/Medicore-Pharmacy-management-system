
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
import { SupplierFilterPipe } from 'src/app/mainwindow/a-suppliers-window/supplier-filter.pipe';

import { Inventory } from './inventory.model';

import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'inventoryFilter',
  pure: false
})
export class InventoryFilterPipe implements PipeTransform{

  transform(inventorys: Inventory[], searchTerm: string) :Inventory[] {
    if(!inventorys || !searchTerm){
      return inventorys;
    }

    return inventorys.filter( inventory =>
      inventory.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
