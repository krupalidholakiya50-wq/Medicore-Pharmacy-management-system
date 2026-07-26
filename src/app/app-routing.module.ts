import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { APointofsaleWindowComponent } from './mainwindow/a-pointofsale-window/a-pointofsale-window.component';
import { ASuppliersWindowComponent } from './mainwindow/a-suppliers-window/a-suppliers-window.component';
import { APredictionReportWindowComponent } from './mainwindow/a-prediction-report-window/a-prediction-report-window.component';
import { ASalesWindowComponent } from './mainwindow/a-sales-window/a-sales-window.component';
import { AInventoryWindowComponent } from './mainwindow/a-inventory-window/a-inventory-window.component';
import { AShoppingCartWindowComponent } from './mainwindow/a-inventory-window/a-shopping-cart-window/a-shopping-cart-window.component';
import { AddDoctorUserComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-doctor-user/add-doctor-user.component';
import { ManageDoctorAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-doctor-account/manage-doctor-account.component';
import { AddNewUsersComponent } from './mainwindow/x-configuration-settings-admin/add-new-users/add-new-users.component';
import { ManageCashierAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-cashier-account/manage-cashier-account.component';
import { ManageAssistantPharmasistAccountComponent } from './mainwindow/x-configuration-settings-admin/manage-assistant-pharmasist-account/manage-assistant-pharmasist-account.component';
import { SalesChartComponent } from './mainwindow/a-sales-window/sales-chart/sales-chart.component';
import { SalesReportComponent } from './mainwindow/a-sales-window/sales-report/sales-report.component';
import { AboutToFinishWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-finish-window/about-to-finish-window.component';
import { OutOfStockWindowComponent } from './mainwindow/a-exp-outofstock-window/out-of-stock-window/out-of-stock-window.component';
import { AExpOutofstockWindowComponent } from './mainwindow/a-exp-outofstock-window/a-exp-outofstock-window.component';
import { AboutToExpireWindowComponent } from './mainwindow/a-exp-outofstock-window/about-to-expire-window/about-to-expire-window.component';
import { ExpiredWindowComponent } from './mainwindow/a-exp-outofstock-window/expired-window/expired-window.component';
import { ADoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/a-doctor-order-window.component';
import { PickupOrderWindowComponent } from './mainwindow/a-doctor-order-window/pickup-order-window/pickup-order-window.component';
import { VerifiedDoctorOrderWindowComponent } from './mainwindow/a-doctor-order-window/verified-doctor-order-window/verified-doctor-order-window.component';
import { DoctorSignupComponent } from './auth/doctorAuth/doctorSignup/doctorSignup.component';
import { AuthGuard } from './auth/auth.guard';
import { DrugInventoryWindowComponent } from './mainwindow/a-inventory-window/drug-inventory-window/drug-inventory-window.component';
import { SupplierInventoryWindowComponent } from './mainwindow/a-suppliers-window/supplier-inventory-window/supplier-inventory-window.component';
import { AddSupplierWindowComponent } from './mainwindow/a-suppliers-window/add-supplier-window/add-supplier-window.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInventoryWindowComponent } from './mainwindow/a-inventory-window/add-inventory-window/add-inventory-window.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DoctorLoginComponent } from './auth/doctorAuth/doctorLogin/doctorLogin.component';
import { XConfigurationSettingsAdminComponent } from './mainwindow/x-configuration-settings-admin/x-configuration-settings-admin.component';

// HMS Module Imports
import { ReceptionOpdWindowComponent } from './mainwindow/hms/reception-opd-window/reception-opd-window.component';
import { DoctorsStaffWindowComponent } from './mainwindow/hms/doctors-staff-window/doctors-staff-window.component';
import { OtSurgeryTrackerWindowComponent } from './mainwindow/hms/ot-surgery-tracker-window/ot-surgery-tracker-window.component';
import { HospitalBillingWindowComponent } from './mainwindow/hms/hospital-billing-window/hospital-billing-window.component';
import { AiChatbotWidgetComponent } from './mainwindow/hms/ai-chatbot-widget/ai-chatbot-widget.component';
import { PatientPanelWindowComponent } from './mainwindow/hms/patient-panel-window/patient-panel-window.component';
import { DoctorPanelWindowComponent } from './mainwindow/hms/doctor-panel-window/doctor-panel-window.component';

export const routes: Routes = [
  { path: '', component: MainwindowComponent },

  // HOSPITAL WINGS
  { path: 'dashboard', component: MainwindowComponent },
  { path: 'reception', component: ReceptionOpdWindowComponent },
  { path: 'patient-panel', component: PatientPanelWindowComponent },
  { path: 'doctors', component: DoctorsStaffWindowComponent },
  { path: 'doctor-panel', component: DoctorPanelWindowComponent },
  { path: 'surgery', component: OtSurgeryTrackerWindowComponent },
  { path: 'billing', component: HospitalBillingWindowComponent },

  // MEDICORE PHARMACY WINGS
  { path: 'pos', component: APointofsaleWindowComponent },
  { path: 'doctororders', component: ADoctorOrderWindowComponent },
  { path: 'doctororders/new', component: VerifiedDoctorOrderWindowComponent },
  { path: 'doctororders/pickedUp', component: PickupOrderWindowComponent },

  { path: 'inventory', component: AddInventoryWindowComponent },
  { path: 'inventory/all', component: AInventoryWindowComponent },
  { path: 'inventory/create', component: DrugInventoryWindowComponent },

  { path: 'outofstock', component: OutOfStockWindowComponent },
  { path: 'outofstock/abouttofinish', component: AboutToFinishWindowComponent },

  { path: 'expoutofstock', component: AExpOutofstockWindowComponent },
  { path: 'expoutofstock/abouttoexpire', component: AboutToExpireWindowComponent },

  { path: 'suppliers', component: ASuppliersWindowComponent },
  { path: 'suppliers/all', component: ASuppliersWindowComponent },
  { path: 'suppliers/create', component: ASuppliersWindowComponent },

  { path: 'salesreport', component: SalesChartComponent },
  { path: 'salesreport/all', component: ASalesWindowComponent },
  { path: 'salesreport/report', component: SalesReportComponent },

  { path: 'predictionreport', component: APredictionReportWindowComponent },

  { path: 'settings', component: XConfigurationSettingsAdminComponent },
  { path: 'settings/APharmasistAccounts', component: ManageAssistantPharmasistAccountComponent },
  { path: 'settings/CashierAccounts', component: ManageCashierAccountComponent },
  { path: 'settings/DoctorAccount', component: ManageDoctorAccountComponent },

  // INTELLIGENT INTEGRATION
  { path: 'chatbot', component: AiChatbotWidgetComponent },

  // Auth & Fallbacks
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'doctorLogin', component: DoctorLoginComponent },
  { path: 'doctorSignup', component: DoctorSignupComponent },
  { path: 'shoppingcart', component: AShoppingCartWindowComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
