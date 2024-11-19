import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-submitted-applications',
  templateUrl: './view-submitted-applications.component.html',
  styleUrls: ['./view-submitted-applications.component.css']
})
export class ViewSubmittedApplicationsComponent implements OnInit {

  applications: any[] = [];
  applicationStatuses: any[] = [];
  searchTerm: string = '';
  selectedStatus: string | null = null;
applicantId!:number;
  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id= this.route.snapshot.paramMap.get('applicantId');
    if (id !=null){
      this.applicantId = Number(id)
    }
    this.loadApplicationsList(this.applicantId);
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
  

  loadApplicationsList(applicantId:number): void {
    this.dataService.GetClientApplications(applicantId).subscribe(data => {
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

  viewApplication(applicationId: number): void {
    if (applicationId && applicationId > 0) {
      this.router.navigate(['/consultant-view-application', applicationId], { queryParams: { step: 0 } });
    //  this.router.navigate(['/sapplication', applicationId], { queryParams: { step: 0 } });
    } else {
      console.error('Invalid application ID');
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
