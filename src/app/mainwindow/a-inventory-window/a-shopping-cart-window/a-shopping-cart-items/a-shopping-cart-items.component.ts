import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthDoctorData } from './../../../../auth/doctorAuth/doctorAuth-model';
import { AuthDoctorUserService } from './../../../../auth/doctorAuth/authDoctorUser.service';
import { InventoryInteractionService } from './../../inventory-interaction.service';
import { Inventory } from '../../inventory.model';
import { DoctorOderServices } from '../DoctorOderServices.service';
import { InventoryFilterPipe } from 'src/app/mainwindow/a-inventory-window/inventory-filter.pipe';

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
    InventoryFilterPipe,
  ],
  standalone: true,
  selector: 'app-a-shopping-cart-items',
  templateUrl: './a-shopping-cart-items.component.html',
  styleUrls: ['./a-shopping-cart-items.component.css']
})
export class AShoppingCartItemsComponent implements OnInit, OnDestroy {
  email2: string = '';
  searchTerm: string = '';
  inventorys: Inventory[] = [];
  itemArray: Array<any> = [];
  isLoading = false;
  currentPage = 1;
  totalItems = 10;
  total: number = 0;
  itemsPerPage = 8;
  pageSizeOptions = [8, 12, 16, 20, 24];
  private inventorySubs!: Subscription;
  itemNumber: number = 0;
  dataArray: Array<any> = [];
  details!: AuthDoctorData;
  doc: string = '';
  currentUser!: AuthDoctorData;
  currentUserSubscription!: Subscription;
  users: AuthDoctorData[] = [];
  doctors: Array<any> = [];
  TrimedDoctors: Array<any> = [];
  docArrLength: number = 0;
  oderDetail: Array<any> = [];
  drugNames: Array<any> = [];
  drugId: Array<any> = [];
  drugPrices: Array<any> = [];
  drugQuantities: Array<any> = [];
  realQuantities: Array<any> = [];

  name: string = '';
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(
    private inventoryInteractionService: InventoryInteractionService,
    private authDoctorUserService: AuthDoctorUserService,
    private doctorOderService: DoctorOderServices
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.inventoryInteractionService.getInventory(this.itemsPerPage, this.currentPage);
    this.inventorySubs = this.inventoryInteractionService.getInventoryUpdateListener()
      .subscribe((posts: Inventory[]) => {
        this.isLoading = false;
        this.inventorys = posts;
      });

    this.userIsAuthenticated = this.authDoctorUserService.getIsAuth();
    this.authListenerSubs = this.authDoctorUserService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.authDoctorUserService.getDoctors();
    this.doctors = this.authDoctorUserService.getDoctors();
    this.docArrLength = this.doctors.length;
    this.TrimedDoctors = this.doctors[this.docArrLength - 1] || [];
    console.log(this.TrimedDoctors);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    this.inventoryInteractionService.getInventory(this.itemsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    if (this.inventorySubs) this.inventorySubs.unsubscribe();
    if (this.authListenerSubs) this.authListenerSubs.unsubscribe();
  }

  onAddToCart(itemId: string, name: string, expireDate: string, price: string, form: NgForm, imagePath: string, realQuanntity: string) {
    this.itemArray.push([itemId, name, expireDate, price, form.value.quantityNumber, imagePath]);
    this.drugNames.push(name);
    this.drugPrices.push(price);
    this.drugId.push(itemId);
    this.realQuantities.push(realQuanntity);
    this.drugQuantities.push(form.value.quantityNumber);
    console.log(this.itemArray);
    this.itemNumber = this.itemArray.length;

    let length = this.itemArray.length;
    let x: any;
    let z: any;
    let sum: number;
    this.total = 0;

    for (let count = 0; count < length; count++) {
      x = this.itemArray[count][3];
      z = this.itemArray[count][4];
      sum = +x * +z;
      this.total = this.total + sum;
    }
    return this.total;
  }

  onCheckout(checkoutForm: NgForm) {
    this.oderDetail.push(this.TrimedDoctors, this.itemArray, this.total, checkoutForm.value.pickupDateInput);
    console.log(this.oderDetail);

    let drugId = this.drugId;
    let doctorName = this.TrimedDoctors[0];
    let doctorContact = this.TrimedDoctors[1];
    let doctorId = this.TrimedDoctors[3];
    let doctorEmail = this.TrimedDoctors[2];
    let drugName = this.drugNames;
    let drugPrice = this.drugPrices;
    let drugQuantity = this.drugQuantities;
    let realQuantity = this.realQuantities;
    let totalAmount = this.total;
    let pickupDate = checkoutForm.value.pickupDateInput;
    console.log(drugName);
    this.doctorOderService.createDoctorUser(doctorName, doctorContact, doctorId, doctorEmail, drugId, drugName, drugPrice, drugQuantity, realQuantity, totalAmount, pickupDate);
  }

  onLogout() {
    this.authDoctorUserService.logout();
  }

  onViewUserEmail(email: string, userName?: string) {
    this.email2 = email;
    this.name = userName || email;
    console.log(this.email2, this.name);
  }
}
