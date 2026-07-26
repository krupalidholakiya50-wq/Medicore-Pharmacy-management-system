import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {  } from '../a-suppliers-window/supplier-filter.pipe';
import {  } from '../a-inventory-window/inventory-filter.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailInteractionService } from './../a-doctor-order-window/new-doctor-order-window/email-Interaction.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-xoutofstock-dialog-box',
  templateUrl: './xoutofstock-dialog-box.component.html',
  styleUrls: ['./xoutofstock-dialog-box.component.css']
})
export class XOutofstockDialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any, public emailInteractionService: EmailInteractionService , private snackBar: MatSnackBar,public dialog :MatDialog) { }

  ngOnInit() {
  }

  onSendEmail(name:string,price:string,email:string,quantity:string,form: NgForm){

    console.log(name,price,email,quantity,form.value.quantityNumber);


    let user={
      name : name,
      email : email,
      price : price,
      quantity : quantity,
      quantityNumber : form.value.quantityNumber,

    }
    console.log(user);

    this.emailInteractionService.sendEmail("http://localhost:3000/api/inventory/sendmailOutOfStock", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 ${user.name} an email has been successfully and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);

      }
    );

    this.snackBar.open("Email Has been sent...", 'Close')








  }

}
