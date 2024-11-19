import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface LegalContent {
  title: string;
  content: string;
}

interface ApplicationContent {
  title: string;
  content: string;
}


interface StartContent {
  title: string;
  content: string;
}


interface ForgotContent {
  title: string;
  content: string;
}

interface ListContent {
  title: string;
  content: string;
}

interface CreateApplicantContent {
  title: string;
  content: string;
}

interface ConsultantApplicationsContent {
  title: string;
  content: string;
}

interface AdminApplicationsContent {
  title: string;
  content: string;
}

interface GetConsultantsContent {
  title: string;
  content: string;
}

interface ConsultantLinkContent {
  title: string;
  content: string;
}

interface NewEmployeeContent {
  title: string;
  content: string;
}

interface ViewEmployeeContent {
  title: string;
  content: string;
}

interface ManagerLinkContent {
  title: string;
  content: string;
}

interface AuditContent {
  title: string;
  content: string;
}

interface BackupContent {
  title: string;
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class AssistService {
  private legalContents: LegalContent[] = [];
  private applicationContents: ApplicationContent[] = [];
  private startContents: StartContent[] = [];
  private forgotContents: ForgotContent[] = [];
  private listContents: ListContent[] = [];
  private createApplicantContents:  CreateApplicantContent[] = [];
  private consultantApplicationsContents: ConsultantApplicationsContent[] = [];
  private adminApplicationsContents: AdminApplicationsContent[] = [];
  private getConsultantsContents: GetConsultantsContent[] = [];
  private consultantLinkContents: ConsultantLinkContent[] = [];
  private newEmployeeContents: NewEmployeeContent[] = [];
  private viewEmployeeContents: ViewEmployeeContent[] = [];
  private managerLinkContents: ManagerLinkContent[] = [];
  private auditContents: AuditContent[] = [];
  private backupContents: BackupContent[] = [];
  

  constructor(private http: HttpClient) {
    this.loadLegalContents();
    this.loadStartContents();
    this.loadApplicationContents();
    this.loadForgotContents();
    this.loadListContents();
    this.loadCreateApplicantContents();
    this.loadConsultantApplicationsContents();
    this.loadAdminApplicationsContents();
    this.loadGetConsultantsContents();
    this.loadConsultantLinkContents();
    this.loadNewEmployeeContents();
    this.loadViewEmployeeContents();
    this.loadManagerLinkContents();
    this.loadAuditContents();
    this.loadBackupContents();
  }

  private loadLegalContents(): void {
    this.http.get<LegalContent[]>('/assets/legal-content.json').subscribe(data => {
      this.legalContents = data;
    });
  }

  private loadStartContents(): void {
    this.http.get<StartContent[]>('/assets/start-content.json').subscribe(data => {
      this.startContents = data;
    });
  }

  private loadApplicationContents(): void {
    this.http.get<ApplicationContent[]>('/assets/application-content.json').subscribe(data => {
      this.applicationContents = data;
    });
  }

  private loadForgotContents(): void {
    this.http.get<ForgotContent[]>('/assets/forgot-content.json').subscribe(data => {
      this.forgotContents = data;
    });
  }

  private loadListContents(): void {
    this.http.get<ListContent[]>('/assets/list-content.json').subscribe(data => {
      this.listContents = data;
    });
  }

  private loadCreateApplicantContents(): void {
    this.http.get<CreateApplicantContent[]>('/assets/createApplicant-content.json').subscribe(data => {
      this.createApplicantContents = data;
    });
  }

  private loadConsultantApplicationsContents(): void {
    this.http.get<ConsultantApplicationsContent[]>('/assets/consultantApplications-content.json').subscribe(data => {
      this.consultantApplicationsContents = data;
    });
  }

  private loadAdminApplicationsContents(): void {
    this.http.get<AdminApplicationsContent[]>('/assets/adminApplications-content.json').subscribe(data => {
      this.adminApplicationsContents = data;
    });
  }

  private loadGetConsultantsContents(): void {
    this.http.get<GetConsultantsContent[]>('/assets/getConsultants-content.json').subscribe(data => {
      this.getConsultantsContents = data;
    });
  }

  private loadConsultantLinkContents(): void {
    this.http.get<ConsultantLinkContent[]>('/assets/consultantLink-content.json').subscribe(data => {
      this.consultantLinkContents = data;
    });
  }

  private loadNewEmployeeContents(): void {
    this.http.get<NewEmployeeContent[]>('/assets/newEmployee-content.json').subscribe(data => {
      this.newEmployeeContents = data;
    });
  }

  private loadViewEmployeeContents(): void {
    this.http.get<ViewEmployeeContent[]>('/assets/viewEmployees-content.json').subscribe(data => {
      this.viewEmployeeContents = data;
    });
  }

  private loadManagerLinkContents(): void {
    this.http.get<ManagerLinkContent[]>('/assets/managerLink-content.json').subscribe(data => {
      this.managerLinkContents = data;
    });
  }

  private loadAuditContents(): void {
    this.http.get<AuditContent[]>('/assets/audit-content.json').subscribe(data => {
      this.auditContents = data;
    });
  }

  private loadBackupContents(): void {
    this.http.get<BackupContent[]>('/assets/backup-content.json').subscribe(data => {
      this.backupContents = data;
    });
  }

  getLegalContent(page?: string): Observable<LegalContent[]> {
    return of(this.legalContents);
  }

  getForgotContent(page?: string): Observable<ForgotContent[]> {
    return of(this.forgotContents);
  }

  getStartContent(page?: string): Observable<StartContent[]> {
    return of(this.startContents);
  }

  getApplicationContent(page?: string): Observable<ApplicationContent[]> {
    return of(this.applicationContents);
  }

  getListContent(page?: string): Observable<ListContent[]> {
    return of(this.listContents);
  }

  getCreateApplicantContent(page?: string): Observable<CreateApplicantContent[]> {
    return of(this.createApplicantContents);
  }

  getConsultantApplicationContent(page?: string): Observable<ConsultantApplicationsContent[]> {
    return of(this.consultantApplicationsContents);
  }

  getAdminApplicationContent(page?: string): Observable<AdminApplicationsContent[]> {
    return of(this.adminApplicationsContents);
  }

  getGetConsultantsContent(page?: string): Observable<GetConsultantsContent[]> {
    return of(this.getConsultantsContents);
  }

  getConsultantLinkContent(page?: string): Observable<ConsultantLinkContent[]> {
    return of(this.consultantLinkContents);
  }

  getNewEmployeeContent(page?: string): Observable<NewEmployeeContent[]> {
    return of(this.newEmployeeContents);
  }

  getViewEmployeeContent(page?: string): Observable<ViewEmployeeContent[]> {
    return of(this.viewEmployeeContents);
  }

  getManagerLinkContent(page?: string): Observable<ManagerLinkContent[]> {
    return of(this.managerLinkContents);
  }

  getAuditContent(page?: string): Observable<AuditContent[]> {
    return of(this.auditContents);
  }

  getBackupContent(page?: string): Observable<BackupContent[]> {
    return of(this.backupContents);
  }


  getApplicationContentByPage(page: string): Observable<ApplicationContent | undefined> {
    return of(this.applicationContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getStartContentByPage(page: string): Observable<StartContent | undefined> {
    return of(this.startContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getForgotContentByPage(page: string): Observable<ForgotContent | undefined> {
    return of(this.forgotContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getLegalContentByPage(page: string): Observable<LegalContent | undefined> {
    return of(this.legalContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getListContentByPage(page: string): Observable<ListContent | undefined> {
    return of(this.listContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getCreateApplicantContentByPage(page: string): Observable<CreateApplicantContent | undefined> {
    return of(this.createApplicantContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getConsultantApplicationsContentByPage(page: string): Observable<ConsultantApplicationsContent | undefined> {
    return of(this.consultantApplicationsContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getAdminApplicationsContentByPage(page: string): Observable<AdminApplicationsContent | undefined> {
    return of(this.adminApplicationsContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getGetConsultantsContentByPage(page: string): Observable<GetConsultantsContent | undefined> {
    return of(this.getConsultantsContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getConsultantLinkContentByPage(page: string): Observable<ConsultantLinkContent | undefined> {
    return of(this.consultantLinkContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getNewEmployeeContentByPage(page: string): Observable<NewEmployeeContent | undefined> {
    return of(this.newEmployeeContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getViewEmployeeContentByPage(page: string): Observable<ViewEmployeeContent | undefined> {
    return of(this.viewEmployeeContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getManagerLinkContentByPage(page: string): Observable<ManagerLinkContent | undefined> {
    return of(this.managerLinkContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getAuditContentByPage(page: string): Observable<AuditContent | undefined> {
    return of(this.auditContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }

  getBackupContentByPage(page: string): Observable<BackupContent | undefined> {
    return of(this.backupContents.find(content => content.title.toLowerCase() === page.toLowerCase()));
  }
}
