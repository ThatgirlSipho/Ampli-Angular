import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Location } from '@angular/common';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { AssistService } from 'src/app/services/assist.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consultant-linking-delinking',
  templateUrl: './consultant-linking-delinking.component.html',
  styleUrls: ['./consultant-linking-delinking.component.css']
})
export class ConsultantLinkingDelinkingComponent implements OnInit {

  consultantSearch: string = '';
  consultants: any[] = [];
  filteredConsultants: any[] = [];
  selectedConsultant: any = null;
  linkedApplicants: any[] = [];
  availableApplicants: any[] = [];

  constructor(private accountService: AccountService,private location: Location, private assistService: AssistService,   private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.loadConsultants();
    this.loadAvailableApplicants();
  }

  loadConsultants(): void {
    this.accountService.GetAllConsultants().subscribe({
      next: (consultants) => {
        this.consultants = consultants;
        this.filterConsultants();
      },
      error: (err) => {
        console.error('Failed to load consultants', err);
      }
    });
  }

  filterConsultants(): void {
    this.filteredConsultants = this.consultants.filter((consultant: any) =>
      consultant.fullName.toLowerCase().includes(this.consultantSearch.toLowerCase())
    );
  }

  onConsultantSelect(employeeId: number): void {
    this.selectedConsultant = this.consultants.find(c => c.employeeId === employeeId) || null;
    console.log('Selected Consultant:', this.selectedConsultant);
    if (this.selectedConsultant) {
      this.loadLinkedApplicants(employeeId);
      this.loadAvailableApplicants();
    }
  }
  loadLinkedApplicants(employeeId: number): void {
    this.accountService.GetConsultantsLinkedApplicants(employeeId).subscribe({
      next: (response) => {
        this.linkedApplicants = response.applicants || []; // Assign the 'applicants' property to linkedApplicants
      },
      error: (err) => console.error('Failed to load linked applicants', err)
    });
  }

  /* loadLinkedApplicants(employeeId: number): void {
    this.accountService.GetConsultantsLinkedApplicants(employeeId).subscribe({
      next: (applicants) => this.linkedApplicants = applicants,
      error: (err) => console.error('Failed to load linked applicants', err)
    });
  } */

  loadAvailableApplicants(): void {
    this.accountService.GetUnlinkedApplicants().subscribe({
      next: (applicants) => {
        this.availableApplicants = applicants;
      },
      error: (err) => {
        console.error('Failed to load available applicants', err);
      }
    });
  }

  linkApplicant(clientId: number): void {
    if (!this.selectedConsultant) return;
    this.accountService.LinkApplicantConsultant(clientId, this.selectedConsultant.employeeId).subscribe({
      next: () => {
        this.loadLinkedApplicants(this.selectedConsultant.employeeId);
        this.loadAvailableApplicants();
      },
      error: (err) => console.error('Failed to link applicant', err)
    });
  }

  openAssist(page: string): void {
    // Use the correct service method based on the page parameter.
    switch (page.toLowerCase()) {
      case 'legal-entity':
        this.assistService.getLegalContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'forgot-password':
        this.assistService.getForgotContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'start':
        this.assistService.getStartContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'application':
        this.assistService.getApplicationContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'list':
        this.assistService.getListContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'createapplicant':
          this.assistService.getCreateApplicantContentByPage(page).subscribe(content => {
            this.dialog.open(AssistModalComponent, {
              data: content
            });
          });
          break;

          case 'consultantapplications':
            this.assistService.getConsultantApplicationsContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'adminapplications':
            this.assistService.getAdminApplicationsContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'consultantlink':
            this.assistService.getConsultantLinkContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;
  
      default:
        console.error('Unknown page:', page);
        break;
    }
  }

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
  }
  goBack(): void {
    this.location.back();
  }

  delinkApplicant(clientId: number): void {
    this.accountService.DelinkApplicantConsultant(clientId).subscribe({
      next: () => {
        this.loadLinkedApplicants(this.selectedConsultant.employeeId);
        this.loadAvailableApplicants();
      },
      error: (err) => console.error('Failed to delink applicant', err)
    });
  }}
