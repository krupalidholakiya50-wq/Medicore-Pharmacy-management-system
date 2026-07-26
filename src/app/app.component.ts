import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AiChatbotWidgetComponent } from './mainwindow/hms/ai-chatbot-widget/ai-chatbot-widget.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [
    HeaderComponent,
    SidemenuComponent,
    AiChatbotWidgetComponent,
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pro';
  showMenu = true;
  showSignup = true;
  showShoppingcart = true;
  showDoctorLogin = true;
  showDoctorSignup = true;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const path = event.url.split('?')[0];
        this.showMenu = path !== "/login";
        this.showSignup = path !== "/signup";
        this.showShoppingcart = path !== "/shoppingcart";
        this.showDoctorLogin = path !== "/doctorLogin";
        this.showDoctorSignup = path !== "/doctorSignup";
      }
    });
  }

  get isAuthPage(): boolean {
    return !this.showMenu || !this.showSignup || !this.showDoctorLogin || !this.showDoctorSignup || !this.showShoppingcart;
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
