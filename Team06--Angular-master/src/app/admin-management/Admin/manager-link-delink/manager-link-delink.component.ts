import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Location } from '@angular/common';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { AssistService } from 'src/app/services/assist.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-link-delink',
  templateUrl: './manager-link-delink.component.html',
  styleUrls: ['./manager-link-delink.component.css']
})
export class ManagerLinkDelinkComponent implements OnInit {

  ManagerSearch: string = '';
  managers: any[] = [];
  filteredManagers: any[] = [];
  selectedManager: any = null;
  linkedConsultants: any[] = [];
  availableConsultants: any[] = [];

  constructor(private accountService: AccountService,private location: Location, private assistService: AssistService,   private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.loadManagers();
    this.loadAvailableConsultants();
  }

  loadManagers(): void {
    this.accountService.GetAllConsultantManagers().subscribe({
      next: (managers) => {
        this.managers = managers;
        this.filterManagers();
      },
      error: (err) => {
        console.error('Failed to load consultants', err);
      }
    });
  }

  filterManagers(): void {
    this.filteredManagers = this.managers.filter((manager: any) =>
      manager.fullName.toLowerCase().includes(this.ManagerSearch.toLowerCase())
    );
  }

  onManagerSelect(employeeId: number): void {
    this.selectedManager = this.managers.find(c => c.employeeId === employeeId) || null;
    console.log('Selected Consultant:', this.selectedManager);
    if (this.selectedManager) {
      this.loadLinkedConsultants(employeeId);
      this.loadAvailableConsultants();
    }
  }

  loadLinkedConsultants(managerId: number): void {
    this.accountService.GetConsultantManagerConsultants(managerId).subscribe({
      next: (consultants) => this.linkedConsultants = consultants,
      error: (err) => console.error('Failed to load linked applicants', err)
    });
  }

  loadAvailableConsultants(): void {
    this.accountService.GetUnlinkedConsultants().subscribe({
      next: (consultants) => {
        this.availableConsultants = consultants;
      },
      error: (err) => {
        console.error('Failed to load available applicants', err);
      }
    });
  }

  linkConsultant(consultantId: number): void {
    if (!this.selectedManager) return;
    var managerId=this.selectedManager.employeeId;
    this.accountService.LinkConsultantConsultantManager(consultantId, managerId).subscribe({
      next: () => {
        this.loadLinkedConsultants(this.selectedManager.employeeId);
        this.loadAvailableConsultants();
      },
      error: (err) => console.error('Failed to link applicant', err)
    });
  }

  delinkConsultant(consultantId: number): void {
    this.accountService.DelinkConsultantConsultantManager(consultantId).subscribe({
      next: () => {
        this.loadLinkedConsultants(this.selectedManager.employeeId);
        this.loadAvailableConsultants();
      },
      error: (err) => console.error('Failed to delink applicant', err)
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

            case 'managerlink':
              this.assistService.getManagerLinkContentByPage(page).subscribe(content => {
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
}
