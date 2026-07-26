import {  } from '../../mainwindow/a-suppliers-window/supplier-filter.pipe';
import {  } from '../../mainwindow/a-inventory-window/inventory-filter.pipe';
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
import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
  selector: 'app-header-taskbar',
  templateUrl: './header-taskbar.component.html',
  styleUrls: ['./header-taskbar.component.css']
})
export class HeaderTaskbarComponent implements OnInit, OnDestroy {
  PharamacistRole = false;
  ApharmacistRole = false;
  CashierRole = false;
  role: string;
  userIsAuthenticated =false;
  private authListenerSubs!: Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated= isAuthenticated;
    });

    this.role = this.authService.getUserRole();
    console.log(this.role);
    if(this.role === "pharmacist"){
      this.PharamacistRole = true;
    }
    else if(this.role === "cashier"){
      this.CashierRole = true;
    }
    else if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

}
