import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { AssistService } from 'src/app/services/assist.service';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-consultant-view-applications',
  templateUrl: './consultant-view-applications.component.html',
  styleUrls: ['./consultant-view-applications.component.css']
})
export class ConsultantViewApplicationsComponent implements OnInit {

  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private assistService: AssistService,
  ) { }

  ngOnInit() {
    this.loadApplicationsList();
    this.loadApplicationStatuses();
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending Upload':
        return 'status-pending-upload';
      case 'Uploaded':
        return 'status-uploaded';
      case 'Submitted':
        return 'status-submitted';
      case 'Approved':
        return 'status-approved';
      case 'Declined':
        return 'status-declined';
      default:
        return '';
    }
  }
  

  loadApplicationsList(): void {
    this.dataService.GetMyClientsApplications().subscribe(data => {
      this.applications = data;
      this.applyFilters(); // Apply filters after loading applications
   
    this.applications.forEach(application => {
      this.dataService.getProgressBar(application.applicationId).subscribe(progress => {
        application.progress = progress; // Assign progress to each application
        console.log("hi")
      });
    });
  });
  }

  loadApplicationStatuses(): void {
    this.dataService.GetAllApplicationStatus().subscribe(data => {
      this.applicationStatuses = data;
    });
  }

  applyFilters(): void {
    this.filteredApplications();
  }

  filteredApplications(): any[] {
    return this.applications.filter(application => {
      const matchesSearchTerm = this.searchTerm
        ? Object.values(application).some(val => val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;
      const matchesStatus = this.selectedStatus
        ? application.applicationStatusDescription === this.selectedStatus
        : true;
      return matchesSearchTerm && matchesStatus;
    });
  }

  viewApplication(applicationId: number): void {
    if (applicationId && applicationId > 0) {
      this.router.navigate(['/consultant-view-application', applicationId], { queryParams: { step: 0 } });
    } else {
      console.error('Invalid application ID');
    }
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
