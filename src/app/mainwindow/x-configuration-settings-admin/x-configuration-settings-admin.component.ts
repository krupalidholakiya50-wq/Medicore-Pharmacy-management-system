import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  } from '../a-suppliers-window/supplier-filter.pipe';
import {  } from '../a-inventory-window/inventory-filter.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddNewUsersComponent } from './add-new-users/add-new-users.component';
import { AuthDoctorUserService } from './../../auth/doctorAuth/authDoctorUser.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    AddNewUsersComponent,

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
  selector: 'app-x-configuration-settings-admin',
  templateUrl: './x-configuration-settings-admin.component.html',
  styleUrls: ['./x-configuration-settings-admin.component.css']
})
export class XConfigurationSettingsAdminComponent  {

  constructor(public authService : AuthService,public authDoctorUserService : AuthDoctorUserService){}



  onDoctorSignup(form1:NgForm){

    if(form1.invalid){
      return;
    }
    this.authDoctorUserService.createDoctorUser(form1.value.name, form1.value.contact, form1.value.nic, form1.value.email, form1.value.password);

  }

  onImagePicked(){

  }

  onSignup(form:  NgForm){

    if(form.invalid){
      return;
    }
    console.log(form.value.role)
    this.authService.createUser(form.value.name,form.value.contact,form.value.nic,form.value.email,form.value.password,form.value.role);
  };

}
