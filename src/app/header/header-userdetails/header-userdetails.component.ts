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
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

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
  selector: 'app-header-userdetails',
  templateUrl: './header-userdetails.component.html',
  styleUrls: ['./header-userdetails.component.css']
})
export class HeaderUserdetailsComponent implements OnInit {

  userIsAuthenticated =false;
  private authListenerSubs!: Subscription;
  email:string;
  role: string;
  UserRole = false;
  ApharmacistRole = false;
  CashierRole = false;

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
      this.UserRole = true;
    }
    if(this.role === "cashier"){
      this.CashierRole = true;
    }
    if(this.role === "assistantPharmacist" ){
      this.ApharmacistRole = true;
    }


  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  onViewUserEmail(email:string){
    this.email = email;
  }

}
