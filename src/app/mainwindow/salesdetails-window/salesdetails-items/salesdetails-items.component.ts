import {  } from '../../a-suppliers-window/supplier-filter.pipe';
import {  } from '../../a-inventory-window/inventory-filter.pipe';
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
import { InventoryInteractionService } from './../../a-inventory-window/inventory-interaction.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../a-inventory-window/inventory.model';

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
  selector: 'app-salesdetails-items',
  templateUrl: './salesdetails-items.component.html',
  styleUrls: ['./salesdetails-items.component.css']
})
export class SalesdetailsItemsComponent implements OnInit {

  searchTerm : string;
  inventoryis: any[] = [];
  isLoading= false;
  private inventorySubs!: Subscription;
  displayConfirmBox = false;
  displayMain = true;

  constructor(private inventoryInteractionService: InventoryInteractionService) { }

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getAboutToExpireInventory();
    this.inventorySubs = this.inventoryInteractionService.getInventoryAExUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventoryis = posts;
      });
  }

}
