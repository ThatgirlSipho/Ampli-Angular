import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssistService } from '../services/assist.service';
import { AssistModalComponent } from '../assist-modal/assist-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  isDisabled: boolean = false;
  disableTime: number | null = null;
  showDisableInput: boolean = false; 
  remainingTime: any = null;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private location: Location,
    private assistService: AssistService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId){
      this.loadEmployeeDetails(Number(employeeId));
    }
  }

  loadEmployeeDetails(employeeId: number): void {
    this.accountService.GetEmployee(employeeId).subscribe({
      next: (data) => {this.employee = data;
      this.isDisabled = data.isDisabled
      if (this.isDisabled) {
        this.getRemainingTime(employeeId); // Fetch remaining time if disabled
      }
    },
      
      error: (err) => console.error('Failed to load employee details', err)
    });
  }
  getRemainingTime(employeeId: number): void {
    this.accountService.getRemainingTime(employeeId).subscribe({
      next: (response) => {
        this.remainingTime = response; // Store the remaining time
      },
      error: (err) => console.error('Failed to load remaining time', err)
    });
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.accountService.DeleteUser(this.employee.userId).subscribe({
        next: (response) => {
          alert(response.message);
          this.router.navigate(['/view-employees']); // Adjust the route as needed
        },
        error: (err) => {
          console.error('Failed to delete employee', err);
          alert(err.error.message || 'Failed to delete employee');
        }
      });
    }
  }

  toggleEmployeeStatus(): void {
    if (this.isDisabled) {
      if (confirm('Are you sure you want to enable this employee?')) {
        this.accountService.EnableEmployee(this.employee.employeeId).subscribe({
          next: (response) => {
            alert(response.message);
            this.isDisabled = false; // Toggle status
            this.showDisableInput = false; // Hide input field
          },
          error: (err) => {
            console.error('Failed to enable employee', err);
            alert(err.error.message || 'Failed to enable employee');
          }
        });
      }
    } else {
      this.showDisableInput = !this.showDisableInput; // Toggle input field visibility
      this.accountService.DisableEmployee(this.employee.employeeId).subscribe({
        next: (response) => {
          alert(response.message);
          this.isDisabled = true; // Toggle status
          this.showDisableInput = false; // Hide input field
        },
        error: (err) => {
          console.error('Failed to disable employee', err);
          alert(err.error.message || 'Failed to disable employee');
        }
      });
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

        case 'newemployee':
        this.assistService.getNewEmployeeContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'viewemployee':
        this.assistService.getViewEmployeeContentByPage(page).subscribe(content => {
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


  disableEmployee(): void {
    if (confirm('Are you sure you want to disable this employee?')) {
      if (this.disableTime && this.disableTime > 0) {
        this.accountService.DisableEmployeeWithTime(this.employee.employeeId, this.disableTime).subscribe({
          next: (response) => {
            alert(response.message);
            this.isDisabled = true; // Toggle status
            this.showDisableInput = false; // Hide input field
            this.disableTime = null; // Reset time input
            this.getRemainingTime(this.employee.employeeId); 
          },
          error: (err) => {
            console.error('Failed to disable employee', err);
            alert(err.error.message || 'Failed to disable employee');
          }
        });
      } else {
        this.accountService.DisableEmployee(this.employee.employeeId).subscribe({
          next: (response) => {
            alert(response.message);
            this.isDisabled = true; // Toggle status
            this.showDisableInput = false; // Hide input field
            this.getRemainingTime(this.employee.employeeId); 
          },
          error: (err) => {
            console.error('Failed to disable employee', err);
            alert(err.error.message || 'Failed to disable employee');
          }
        });
      }
    }
  }
}
