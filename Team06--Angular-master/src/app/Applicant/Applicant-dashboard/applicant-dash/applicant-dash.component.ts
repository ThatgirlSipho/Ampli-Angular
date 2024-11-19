import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';
import { AssistService } from 'src/app/services/assist.service';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';

@Component({
  selector: 'app-applicant-dash',
  templateUrl: './applicant-dash.component.html',
  styleUrls: ['./applicant-dash.component.css']
})
export class ApplicantDashComponent implements OnInit {
  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;
  showHelp = false; // Flag to toggle help message visibility
  progressValue: number = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private assistService: AssistService,
    private location: Location
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
    this.dataService.GetMyApplication().subscribe(data => {
      this.applications = data;
      this.applyFilters(); // Apply filters after loading applications
      this.applications.forEach(application => {
        this.dataService.getProgressBar(application.applicationId).subscribe(progress => {
          application.progress = progress; // Assign progress to each application
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

  resumeApplication(applicationId: number): void {
    if (applicationId && applicationId > 0) {
      this.router.navigate(['/sapplication', applicationId], { queryParams: { step: 0 } });
    } else {
      console.error('Invalid application ID');
    }
  }
  loadProgress(applicationId: number) {
    this.dataService.getProgressBar(applicationId).subscribe(
      (response: any) => {
        this.progressValue = response; // Assign percentage to progressValue
      },
      (error) => {
        console.error('Error fetching progress', error);
      }
    );
  }

  deleteApplication(applicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteApplication(applicationId).subscribe(
          () => {
            this.loadApplicationsList();
            this.snackBar.open('Application deleted successfully', 'Close', { duration: 3000 });
          },
          error => {
            alert(error.error.message)
            console.error('Error deleting application', error);
          }
        );
      } else {
        console.log('Delete application cancelled');
      }
    });
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

  // Method to toggle the help message visibility
  toggleHelpMessage(): void {
    this.showHelp = !this.showHelp;
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

      default:
        console.error('Unknown page:', page);
        break;
    }
  }
  
}



























/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-applicant-dash',
  templateUrl: './applicant-dash.component.html',
  styleUrls: ['./applicant-dash.component.css']
})
export class ApplicantDashComponent implements OnInit {
  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: number | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadApplicationsList();
    this.loadApplicationStatuses();
  }

  loadApplicationsList(): void {
    this.dataService.GetApplicationsDto().subscribe(data => {
      this.applications = data;
    });
  }

  loadApplicationStatuses(): void {
    this.dataService.GetAllApplicationStatus().subscribe(data => {
      this.applicationStatuses = data;
    });
  }

  filteredApplications(): any[] {
    return this.applications.filter(application => {
      const term = this.searchTerm.toLowerCase();
      const matchesSearchTerm = 
        application.legalEntityName?.toLowerCase().includes(term) ||
        application.applicationId.toString().includes(term) ||
        application.applicationStatusDescription?.toLowerCase().includes(term) ||
        application.legalEntityTypeDescription?.toLowerCase().includes(term);

      const matchesStatus = this.selectedStatus
        ? application.applicationStatusId === this.selectedStatus
        : true;

      return matchesSearchTerm && matchesStatus;
    });
  }

  sortApplications(): void {
    this.applications = this.filteredApplications(); // Update the applications list based on the filter
  }

  resumeApplication(applicationId: number): void {
    if (applicationId && applicationId > 0) {
      this.router.navigate(['/sapplication', applicationId], { queryParams: { step: 0 } });
    } else {
      console.error('Invalid application ID');
    }
  }

  deleteApplication(applicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.deleteApplication(applicationId).subscribe(
          () => {
            this.loadApplicationsList();
            this.snackBar.open('Application deleted successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error deleting application', error);
          }
        );
      } else {
        console.log('Delete application cancelled');
      }
    });
  }
}
 */