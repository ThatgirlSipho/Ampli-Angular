import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DeleteConfirmModalComponent } from 'src/app/delete-confirm-modal/delete-confirm-modal.component';
import { Client } from 'src/app/services/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-consultant-view-applicants',
  templateUrl: './consultant-view-applicants.component.html',
  styleUrls: ['./consultant-view-applicants.component.css']
})
export class ConsultantViewApplicantsComponent {

  clients: Client[] = [];

  displayedColumns: string[] = ['nameSurname', 'email', 'businessName', 'actions'];

  constructor(private dataService: DataService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  private location:Location) {}

    ngOnInit(): void {
      this.loadApplicantList();
    }

  loadApplicantList(): void {
    this.dataService.GetAllMyClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching client data', error);
      }
    );
  }
  viewApplication(applicantId: number): void {
    if (applicantId && applicantId > 0) {
      this.router.navigate(['/view-applicant', applicantId] );
    } else {
      console.error('Invalid application ID');
    }
  }
  resendRegistrationLink(email: string): void {
    this.dataService.sendRegistrationRequest(email).subscribe({
      next: (response) => {
        // Show success message
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error sending registration link:', error);

        // Handle specific error cases
        let errorMessage = 'Failed to send registration link';
        if (error.status === 400) {
          // Inspect error structure to determine appropriate message
          errorMessage = error.error?.title || error.error?.message || 'Invalid request - one or more validation errors occurred.';
        } else if (error.status === 404) {
          errorMessage = 'User does not exist';
        } else if (error.status === 500) {
          errorMessage = 'Server error - please try again later.';
        }

        // Show error message
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      },
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

  deleteClient(clientId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete client confirmed for ID:', clientId);
        this.dataService.deleteClient(clientId).subscribe(
          () => {
            this.clients = this.clients.filter(client => client.clientId !== clientId);
            this.snackBar.open('Client deleted successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error deleting client', error);
            this.snackBar.open('Failed to delete client', 'Close', { duration: 3000 });
          }
        );
      } else {
        console.log('Delete client cancelled');
      }
    });
  }

}
