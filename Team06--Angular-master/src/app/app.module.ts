import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DocumentComponent } from './admin-management/document/document.component';
import { EntityComponent } from './admin-management/entity/entity.component';
import { FinancialComponent } from './admin-management/financial/financial.component';
import { SettingsComponent } from './admin-management/settings/settings.component';
import { SupplierComponent } from './admin-management/supplier/supplier.component';
import { UserComponent } from './admin-management/user/user.component';
import { HomeComponent } from './home/home.component';
import { FirstApplicantComponent } from './dashboard/first-applicant/first-applicant.component';
import { SecondapplicantComponent } from './dashboard/secondapplicant/secondapplicant.component';
import { ConsultantComponent } from './dashboard/consultant/consultant.component';
import { AmplifinAdminComponent } from './dashboard/amplifin-admin/amplifin-admin.component';
import { MainComponent } from './admin-management/main/main.component';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { LinkDelinkComponent } from './admin-management/link-delink/link-delink.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';
import { ViewPendingApplicationsComponent } from './view-applicant/view-pending-applications/view-pending-applications.component';
import { ViewSubmittedApplicationsComponent } from './view-applicant/view-submitted-applications/view-submitted-applications.component';
import { ResendRegistrationLinkComponent } from './view-applicant/resend-registration-link/resend-registration-link.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { AdministratorComponent } from './dashboard/administrator/administrator.component';
import { NewApplicantComponent } from './new-applicant/new-applicant.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ConsultantManagerComponent } from './dashboard/consultant-manager/consultant-manager.component';
import { RegisterComponent } from './login/register/register.component';
import { ViewConsultantComponent } from './view-consultant/view-consultant.component';
import { VerifyDocumentsComponent } from './verify-documents/verify-documents.component';
import { DocumentAgeComponent } from './document-age/document-age.component';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { VerificationComponent } from './verification/verification.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ApplicantViewSubmittedComponent } from './applicant-view-submitted/applicant-view-submitted.component';
import { ApplicantViewApplicationComponent } from './applicant-view-submitted/applicant-view-application/applicant-view-application.component';
import { ProductScheduleComponent } from './applicant-view-submitted/product-schedule/product-schedule.component';
import { AdminVerifyDocumentComponent } from './admin-verify-document/admin-verify-document.component';
import { AdminViewApplicationComponent } from './admin-view-application/admin-view-application.component';
import { ResumeApplicationComponent } from './resume-application/resume-application.component';
import { ViewApplicationTablesComponent } from './view-application-tables/view-application-tables.component';
import { Login2faComponent } from './login/login2fa/login2fa.component';
import { AuthInterceptor } from './services/auth.interterceptor';
import { ProfileComponent } from './login/Profile/Profile.component';
import { ConsultantLinkDelinkComponent } from './admin-management/Consultant-Manager/consultant-link-delink/consultant-link-delink.component';
import { ConsultantLinkingDelinkingComponent } from './admin-management/Admin/consultant-linking-delinking/consultant-linking-delinking.component';
import { ManagerLinkDelinkComponent } from './admin-management/Admin/manager-link-delink/manager-link-delink.component';
import { ViewEmployeesComponent } from './admin-management/View-Employees/View-Employees.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SiphoApplicationComponent } from './Applicant/Sipho-Application/Sipho-Application.component';
import { ManagementViewApplicationComponent } from './management-view-application/management-view-application.component';
import { AssistComponent } from './assist/assist.component';
import { AssistModalComponent } from './assist-modal/assist-modal.component';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import { ReportManagementComponent } from './report-management/report-management.component';
import { ListofemployeesComponent } from './report-management/listofemployees/listofemployees.component';
import { ListOfApplicationsComponent } from './report-management/list-of-applications/list-of-applications.component';
import { ListOfDocumentsComponent } from './report-management/list-of-documents/list-of-documents.component';
import { AdjustableReportComponent } from './report-management/adjustable-report/adjustable-report.component';
import { ManagerialGraphComponent } from './report-management/managerial-graph/managerial-graph.component';
import { NgChartsModule } from 'ng2-charts';
import { ListOfApplicantsComponent } from './report-management/list-of-applicants/list-of-applicants.component';
import { ListOfProductsComponent } from './report-management/list-of-products/list-of-products.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import { ConsultanatReportsComponent } from './report-management/consultanat-reports/consultanat-reports.component';
import { ApplicantDashComponent } from './Applicant/Applicant-dashboard/applicant-dash/applicant-dash.component';
import { CommentSideBarComponent } from './CommentSideBar/CommentSideBar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LineGraphComponent } from './line-graph/line-graph.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { ConsultantViewApplicationsComponent } from './Consultant/consultant-view-applications/consultant-view-applications.component';
import { ViewClientApplicationComponent } from './Consultant/view-client-application/view-client-application.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AuditTrailComponent } from './AuditTrail/AuditTrail.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AuditLogDetailDialogComponent } from './AuditTrail/AuditLogDetailDialog/AuditLogDetailDialog.component';
import { ConsultantViewApplicantsComponent } from './Consultant/consultant-view-applicants/consultant-view-applicants.component';
import { AdminViewApplicantsComponent } from './admin-view-applicants/admin-view-applicants.component';
import { AdminViewWIdComponent } from './admin-view-wId/admin-view-wId.component';
import { BackupComponent } from './backup/backup.component';
import { AdminComponent } from './side-bar/admin/admin.component';
import { AdministratorSideComponent } from './side-bar/administrator-side/administrator-side.component';
import { ConsultantSideComponent } from './side-bar/consultant-side/consultant-side.component';
import { ConManagerComponent } from './side-bar/con-manager/con-manager.component';
import { SharedSideComponent } from './side-bar/shared-side/shared-side.component';
import { GetConsultantsComponent } from './admin-management/Consultant-Manager/getConsultants/getConsultants.component';
@NgModule({
  declarations: [						
    AppComponent,
    GetConsultantsComponent,
    SharedSideComponent,
    ConManagerComponent,
    ConsultantSideComponent,
    AdminComponent,
    AdministratorSideComponent,
    AuditLogDetailDialogComponent,
    ConsultantViewApplicantsComponent,
    ViewClientApplicationComponent,
    ApplicantDashComponent,
    ApplicationComponent,
    LegalEntityComponent,
    DocumentComponent,
    EntityComponent,
    FinancialComponent,
    SettingsComponent,
    SupplierComponent,
    UserComponent,
    HomeComponent,
    FirstApplicantComponent,
    SecondapplicantComponent,
    ConsultantComponent,
    AmplifinAdminComponent,
    MainComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ViewApplicationComponent,
    LinkDelinkComponent,
    ViewApplicantComponent,
    ViewPendingApplicationsComponent,
    ViewSubmittedApplicationsComponent,
    ResendRegistrationLinkComponent,
    UpdateDetailsComponent,
    AdministratorComponent,
    NewApplicantComponent,
    NewEmployeeComponent, 
    ConsultantManagerComponent, 
    RegisterComponent, 
    DeleteConfirmModalComponent, 
    ViewEmployeeComponent, 
    VerificationComponent, 
    NewPasswordComponent,
    RegisterComponent, 
    ViewConsultantComponent, 
    VerifyDocumentsComponent, 
    DocumentAgeComponent, 
    AdminVerifyDocumentComponent, 
    AdminViewApplicationComponent, 
    ResumeApplicationComponent,
    ProductScheduleComponent, 
    ApplicantViewSubmittedComponent, 
    ApplicantViewApplicationComponent, 
    ViewApplicationTablesComponent,
    ApplicantViewApplicationComponent,
    Login2faComponent ,
    ProfileComponent ,
    ConsultantLinkDelinkComponent,
    ConsultantLinkingDelinkingComponent,
    ManagerLinkDelinkComponent,
    ViewEmployeesComponent,
    SiphoApplicationComponent,
    ManagementViewApplicationComponent,
    AssistComponent,
    AssistModalComponent,
    ReportManagementComponent,
    ListofemployeesComponent,
    ListOfApplicationsComponent,
    ListOfDocumentsComponent,
    AdjustableReportComponent,
    ManagerialGraphComponent,
    ListOfApplicantsComponent,
    ListOfProductsComponent,
    ConsultanatReportsComponent,
    CalendarComponent,
    LineGraphComponent,
    WidgetsComponent,      
    CommentSideBarComponent,
    ConsultantViewApplicationsComponent,
    AuditTrailComponent,
      AdminViewApplicantsComponent,
      AdminViewWIdComponent,
      BackupComponent
   ],

  imports: [
    NgxMatDatetimePickerModule,
    CdkTableModule,
    MatExpansionModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MaterialModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGoogleMapsAutocompleteModule.forRoot('AIzaSyC5eqzcJ3szPIQFvQFRArEyAJNJOnoMJzM'),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
