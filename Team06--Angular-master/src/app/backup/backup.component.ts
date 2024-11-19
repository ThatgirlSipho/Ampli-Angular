import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssistModalComponent } from '../assist-modal/assist-modal.component';
import { AssistService } from '../services/assist.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  backupForm: FormGroup;
  restoreForm: FormGroup;
  scheduleForm: FormGroup;
  isSubmitting = false;
  isProcessingBackup = false;  // Loader for backup
  isProcessingRestore = false;  // Loader for restore
  lastBackupDate: string | null = null;       
  lastScheduledBackup:any;
  showScheduleForm: boolean = false;
  constructor(
    private fb: FormBuilder,
    private backupService: AccountService,
    private snackBar: MatSnackBar,
    private location: Location,
    private dialog: MatDialog, 
    private assistService: AssistService,
  ) {
    this.backupForm = this.fb.group({});
    this.restoreForm = this.fb.group({});
    this.scheduleForm = this.fb.group({
      frequency: ['', Validators.required],
      dayOfWeek: [''],
      dayOfMonth: [''],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.onFrequencyChange();
    this.fetchLastBackupDetails(); 
  }

  triggerBackup(): void {
    this.isSubmitting = true;
    this.isProcessingBackup = true;

    this.backupService.backupDatabase().pipe(
      finalize(() => {
        this.isSubmitting = false;
        this.isProcessingBackup = false;
      })
    ).subscribe(
      response => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
      },
      error => {
        const errorMessage = error.error?.message || 'Failed to create backup.';
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    );
  }
  toggleScheduleForm() {
    this.showScheduleForm = !this.showScheduleForm;
  }
  triggerRestore(): void {
    this.isSubmitting = true;
    this.isProcessingRestore = true;

    this.backupService.restoreDatabase().pipe(
      finalize(() => {
        this.isSubmitting = false;
        this.isProcessingRestore = false;
      })
    ).subscribe(
      response => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.fetchLastBackupDetails(); 
      },
      error => {
        const errorMessage = error.error?.message || 'Failed to restore database.';
        this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
      }
    );
  }

  scheduleBackup(): void {
    if (this.scheduleForm.valid) {
      this.isSubmitting = true;

      this.backupService.scheduleBackup(this.scheduleForm.value).pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      ).subscribe(
        response => {
          this.snackBar.open(response.message, 'Close', { duration: 3000 });
          this.fetchLastBackupDetails();
        },
        error => {
          const errorMessage = error.error?.message || 'Failed to schedule backup.';
          this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
        }
      );
    }
  }

  onFrequencyChange(): void {
    this.scheduleForm.get('frequency')?.valueChanges.subscribe(frequency => {
      this.scheduleForm.get('dayOfWeek')?.clearValidators();
      this.scheduleForm.get('dayOfMonth')?.clearValidators();
      this.scheduleForm.get('dayOfWeek')?.disable();
      this.scheduleForm.get('dayOfMonth')?.disable();

      if (frequency === 'weekly') {
        this.scheduleForm.get('dayOfWeek')?.setValidators(Validators.required);
        this.scheduleForm.get('dayOfWeek')?.enable();
      } else if (frequency === 'monthly') {
        this.scheduleForm.get('dayOfMonth')?.setValidators(Validators.required);
        this.scheduleForm.get('dayOfMonth')?.enable();
      }

      this.scheduleForm.get('dayOfWeek')?.updateValueAndValidity();
      this.scheduleForm.get('dayOfMonth')?.updateValueAndValidity();
    });
  }

  fetchLastBackupDetails(): void {
    // Fetch last backup date
    this.backupService.getLastBackupDate().subscribe(
      (data: any) => this.lastBackupDate = data.backupDate,
      error => console.error('Error fetching last backup date:', error)
    );

    // Fetch last scheduled backup
    this.backupService.getLastScheduledBackup().subscribe(
      (data: any) => this.lastScheduledBackup = data,
      error => console.error('Error fetching last scheduled backup:', error)
    );
  }

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
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

            case 'getconsultants':
            this.assistService.getGetConsultantsContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'audit':
            this.assistService.getAuditContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'backup':
            this.assistService.getBackupContentByPage(page).subscribe(content => {
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

  goBack(): void {
    this.location.back();
  }
}
