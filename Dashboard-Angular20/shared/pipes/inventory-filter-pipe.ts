import { Pipe, PipeTransform } from '@angular/core';
import { Inventory } from '../../services/inventory.model';

@Pipe({
  name: 'inventoryFilter',
  standalone: true
})
export class InventoryFilterPipe implements PipeTransform {
  transform(items: Inventory[], searchTerm: string): Inventory[] {
    if (!items || !searchTerm) {
      return items;
    }
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
      item.name?.toLowerCase().includes(term) ||
      item.batchId?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term)
    );
  }
}
