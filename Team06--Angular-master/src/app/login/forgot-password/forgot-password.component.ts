import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Import Router
import { AssistService } from 'src/app/services/assist.service';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailDomainValidator } from 'src/app/services/validators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private assistService: AssistService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,emailDomainValidator]] // Adding email validation
    });
  }

  requestPasswordReset(): void {
    if (this.forgotPasswordForm.invalid) {
      this.snackBar.open('Please enter a valid email address.', 'Close', { duration: 3000 });
      return;
    }

    const email = this.forgotPasswordForm.value.email.trim();

    this.dataService.forgotPassword(email).subscribe({
      next: (response) => {
        const message = response?.Message || 'Password reset link sent successfully.';
        //this.snackBar.open(message, 'Close', { duration: 3000 });
        alert("A password reset link has been sent to your email")
        // Optionally, redirect to another page
       // this.router.navigate(['/change-password']); 
     },
      error: (error) => {
        console.error('Error sending password reset link:', error);

        let errorMessage = 'Failed to send password reset link';
        if (error.status === 400) {
          errorMessage = 'Invalid request - one or more validation errors occurred.';
        } else if (error.status === 500) {
          errorMessage = 'Server error - please try again later.';
        }

        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      },
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
  
      default:
        console.error('Unknown page:', page);
        break;
    }
  }

  goBack() {
    this.router.navigate(['/previous-page']); // Replace with the actual route to go back
  }
}