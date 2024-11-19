import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';
import { DocumentComponent } from './admin-management/document/document.component';
import { EntityComponent } from './admin-management/entity/entity.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FinancialComponent } from './admin-management/financial/financial.component';
import { MainComponent } from './admin-management/main/main.component';
import { SettingsComponent } from './admin-management/settings/settings.component';
import { SupplierComponent } from './admin-management/supplier/supplier.component';
import { UserComponent } from './admin-management/user/user.component';
import { HomeComponent } from './home/home.component';
import { FirstApplicantComponent } from './dashboard/first-applicant/first-applicant.component';
import { SecondapplicantComponent } from './dashboard/secondapplicant/secondapplicant.component';
import { ConsultantComponent } from './dashboard/consultant/consultant.component';
import { ConsultantManagerComponent } from './dashboard/consultant-manager/consultant-manager.component';
import { AdministratorComponent } from './dashboard/administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { AmplifinAdminComponent } from './dashboard/amplifin-admin/amplifin-admin.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { LinkDelinkComponent } from './admin-management/link-delink/link-delink.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';
import { ViewPendingApplicationsComponent } from './view-applicant/view-pending-applications/view-pending-applications.component';
import { ViewSubmittedApplicationsComponent } from './view-applicant/view-submitted-applications/view-submitted-applications.component';
import { ResendRegistrationLinkComponent } from './view-applicant/resend-registration-link/resend-registration-link.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { NewApplicantComponent } from './new-applicant/new-applicant.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { RegisterComponent } from './login/register/register.component';
import { ViewConsultantComponent } from './view-consultant/view-consultant.component';
import { VerifyDocumentsComponent } from './verify-documents/verify-documents.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { VerificationComponent } from './verification/verification.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ApplicantViewSubmittedComponent } from './applicant-view-submitted/applicant-view-submitted.component';
import { ApplicantViewApplicationComponent } from './applicant-view-submitted/applicant-view-application/applicant-view-application.component';
import { ProductScheduleComponent } from './applicant-view-submitted/product-schedule/product-schedule.component';
import { AdminVerifyDocumentComponent } from './admin-verify-document/admin-verify-document.component';
import { Login2faComponent } from './login/login2fa/login2fa.component';
import { AdminViewApplicationComponent } from './admin-view-application/admin-view-application.component';
import { ResumeApplicationComponent } from './resume-application/resume-application.component';
import { ViewApplicationTablesComponent } from './view-application-tables/view-application-tables.component';
import { ProfileComponent } from './login/Profile/Profile.component';
import { ConsultantLinkDelinkComponent } from './admin-management/Consultant-Manager/consultant-link-delink/consultant-link-delink.component';
import { ConsultantLinkingDelinkingComponent } from './admin-management/Admin/consultant-linking-delinking/consultant-linking-delinking.component';
import { ManagerLinkDelinkComponent } from './admin-management/Admin/manager-link-delink/manager-link-delink.component';
import { ViewEmployeesComponent } from './admin-management/View-Employees/View-Employees.component';
import { SiphoApplicationComponent } from './Applicant/Sipho-Application/Sipho-Application.component';
import { ManagementViewApplicationComponent } from './management-view-application/management-view-application.component';
import { ReportManagementComponent } from './report-management/report-management.component';
import { ListofemployeesComponent } from './report-management/listofemployees/listofemployees.component';
import { ListOfApplicationsComponent } from './report-management/list-of-applications/list-of-applications.component';
import { ListOfDocumentsComponent } from './report-management/list-of-documents/list-of-documents.component';
import { AdjustableReportComponent } from './report-management/adjustable-report/adjustable-report.component';
import { ManagerialGraphComponent } from './report-management/managerial-graph/managerial-graph.component';
import { ListOfApplicantsComponent } from './report-management/list-of-applicants/list-of-applicants.component';
import { ListOfProductsComponent } from './report-management/list-of-products/list-of-products.component';
import { ConsultanatReportsComponent } from './report-management/consultanat-reports/consultanat-reports.component';
import { ApplicantDashComponent } from './Applicant/Applicant-dashboard/applicant-dash/applicant-dash.component';
import { ConsultantViewApplicationsComponent } from './Consultant/consultant-view-applications/consultant-view-applications.component';
import { ViewClientApplicationComponent } from './Consultant/view-client-application/view-client-application.component';
import { AuditTrailComponent } from './AuditTrail/AuditTrail.component';
import { ConsultantViewApplicantsComponent } from './Consultant/consultant-view-applicants/consultant-view-applicants.component';
import { AdminViewWIdComponent } from './admin-view-wId/admin-view-wId.component';
import { AdminViewApplicantsComponent } from './admin-view-applicants/admin-view-applicants.component';
import { BackupComponent } from './backup/backup.component';
import { AuthGuard } from './services/auth.guard';
import { GetConsultantsComponent } from './admin-management/Consultant-Manager/getConsultants/getConsultants.component';
const routes: Routes = [
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'backup', component: BackupComponent,canActivate: [AuthGuard] },
  { path: 'get-consultants', component: GetConsultantsComponent,canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'admin-view-applicants', component: AdminViewApplicantsComponent,canActivate: [AuthGuard]
  },
  { 
    path: 'admin-view-applicant/:applicantId', component: AdminViewWIdComponent,canActivate: [AuthGuard]
  },

  {
    path: 'Audit', component: AuditTrailComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-applications', component: ConsultantViewApplicationsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-applicants', component: ConsultantViewApplicantsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-view-application/:applicationId', component:  ViewClientApplicationComponent,canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  /* {
    path: '', redirectTo: '/legal-entity', pathMatch: 'full'
  }, */
  {
    path: 'legal-entity', component: LegalEntityComponent,canActivate: [AuthGuard]
  },
  {
    path: 'first-applicant', component: FirstApplicantComponent,canActivate: [AuthGuard]
  },
  {
    path: 'secondapplicant', component: SecondapplicantComponent,canActivate: [AuthGuard]
  },
  {
    path: 'aaplications', component: ApplicantDashComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant', component: ConsultantComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-manager', component: ConsultantManagerComponent,canActivate: [AuthGuard]
  },
  {
    path: 'administrator', component: AdministratorComponent,canActivate: [AuthGuard]
  },
  {
    path: 'amplifin-admin', component: AmplifinAdminComponent,canActivate: [AuthGuard]
  },
   {
    path: 'application/:applicationId', component: ApplicationComponent,canActivate: [AuthGuard]
  },
  {
    path: 'sapplication/:applicationId', component: SiphoApplicationComponent,canActivate: [AuthGuard]
  },   

  {
    path: 'document', component: DocumentComponent,canActivate: [AuthGuard]
  },

  {
    path: 'entity', component: EntityComponent,canActivate: [AuthGuard]
  },

  {
    path: 'financial', component: FinancialComponent,canActivate: [AuthGuard]
  },

  {
    path: 'main', component: MainComponent,canActivate: [AuthGuard]
  },

  {
    path: 'settings', component: SettingsComponent,canActivate: [AuthGuard]
  },

  {
    path: 'supplier', component: SupplierComponent,canActivate: [AuthGuard]
  },
  {
    path: 'user', component: UserComponent,canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login-2fa', component: Login2faComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },

  {
    path: 'change-password', component: ChangePasswordComponent
  },

  {
    path: 'confirmation-dialog', component: ConfirmationDialogComponent,canActivate: [AuthGuard]
  },

  {
    path: 'view-application/:applicationId', component: ViewApplicationComponent,canActivate: [AuthGuard]
  },

  {
    path: 'link-delink', component: LinkDelinkComponent,canActivate: [AuthGuard]
  },
  {
    path: 'manager-link-delink', component: ManagerLinkDelinkComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-link-delink', component: ConsultantLinkDelinkComponent,canActivate: [AuthGuard]
  },
  {
    path: 'consultant-linking-delinking', component: ConsultantLinkingDelinkingComponent,canActivate: [AuthGuard]
  },

  {
    path: 'view-applicants', component: ViewApplicantComponent,canActivate: [AuthGuard]
  },

  { 
    path: 'view-applicant/pending', component: ViewPendingApplicationsComponent ,canActivate: [AuthGuard]
  },
  
  { 
    path: 'view-applicant/:applicantId', component: ViewSubmittedApplicationsComponent,canActivate: [AuthGuard] 
  },

  { 
    path: 'view-applicant/resend-link', component: ResendRegistrationLinkComponent ,canActivate: [AuthGuard]
  }, 
  {
    path: 'update-details', component: UpdateDetailsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'administrator', component: AdministratorComponent,canActivate: [AuthGuard]
  },
  {
    path: 'new-applicant', component: NewApplicantComponent,canActivate: [AuthGuard]
  },
  {
    path: 'new-employee', component: NewEmployeeComponent,canActivate: [AuthGuard]
  },
  
  {
    path: 'view-consultant', component: ViewConsultantComponent,canActivate: [AuthGuard]
  },
   {
    path: 'verify-documents', component: VerifyDocumentsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'view-employee/:employeeId', component: ViewEmployeeComponent,canActivate: [AuthGuard]
  },

  {
    path: 'view-employees', component: ViewEmployeesComponent,canActivate: [AuthGuard]
  },

  {
    path: 'verification', component: VerificationComponent,canActivate: [AuthGuard]
  },
  {
    path: 'new-password', component: NewPasswordComponent
  },

  { 
    path: 'view-application/submitted', component: ApplicantViewSubmittedComponent ,canActivate: [AuthGuard]
  },

  { 
    path: 'view-applicant/application', component: ApplicantViewApplicationComponent ,canActivate: [AuthGuard]
  },

  { 
    path: 'view-applicant/product-schedule', component: ProductScheduleComponent ,canActivate: [AuthGuard]
  },
  
  {
    path: 'admin-verify', component: AdminVerifyDocumentComponent,canActivate: [AuthGuard]
  },
  {
    path: 'admin-view-application', component: AdminViewApplicationComponent,canActivate: [AuthGuard]
  },
  {
    path: 'resume', component: ResumeApplicationComponent,canActivate: [AuthGuard]
  },
  {
    path: 'view-application-tables', component: ViewApplicationTablesComponent,canActivate: [AuthGuard]
  },

  {
    path: 'management-view-application/:applicationId', component: ManagementViewApplicationComponent,canActivate: [AuthGuard]
  },

  {
    path: 'sapplication', component: SiphoApplicationComponent,canActivate: [AuthGuard]
  },
  
  {
    path: 'report-management', component: ReportManagementComponent,canActivate: [AuthGuard]
  },

  {
    path: 'list-of-employees', component: ListofemployeesComponent,canActivate: [AuthGuard]
  },

  {
    path: 'list-of-documents', component: ListOfDocumentsComponent,canActivate: [AuthGuard]
  },

  {
    path: 'list-of-applications', component: ListOfApplicationsComponent,canActivate: [AuthGuard]
  },

  {
    path: 'adjustable-report', component: AdjustableReportComponent,canActivate: [AuthGuard]
  },

  {
    path: 'managerial-graph', component: ManagerialGraphComponent,canActivate: [AuthGuard]
  },

  {
    path: 'list-of-applicants', component: ListOfApplicantsComponent,canActivate: [AuthGuard]
  },

  {
    path: 'list-of-products', component: ListOfProductsComponent,canActivate: [AuthGuard]
  },

  {
    path: 'consultant-report', component: ConsultanatReportsComponent,canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
