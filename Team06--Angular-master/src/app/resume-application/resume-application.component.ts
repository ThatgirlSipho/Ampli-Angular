import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { LegalEntityTypes } from '../services/model';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Application } from '../services/model';

@Component({
  selector: 'app-resume-application',
  templateUrl: './resume-application.component.html',
  styleUrls: ['./resume-application.component.css']
})
export class ResumeApplicationComponent implements OnInit {

  applicationForm!: FormGroup;
  applicationId!: number;
  applications: Application[] = [];
  stepIndex: number = 0;
  selectedFiles: any[] = [];
  oneFormGroup!: FormGroup;
  displayVatForm: boolean = false;
  industryRegulatoryBody = [];
  identificationType = [];
  legalEntityTypesMap: { [id: number]: LegalEntityTypes } = {};

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = +params.get('id')!;
    });
    this.loadApplicationsList();
    this.loadLegalEntityTypes();
  }

  loadApplicationsList(): void {
    this.dataService.GetApplications().subscribe(data => {
      this.applications = data;
    });
  }

  loadLegalEntityTypes(): void {
    this.dataService.GetAllLegalEntityTypes().subscribe(types => {
      // Type assertion to specify the expected type of 'types'
      const legalEntityTypesArray = types as LegalEntityTypes[];

      // Explicitly type the parameters for the reduce function
      this.legalEntityTypesMap = legalEntityTypesArray.reduce<{ [id: number]: LegalEntityTypes }>((map, type) => {
        map[type.legalEntityTypeId] = type;
        return map;
      }, {} as { [id: number]: LegalEntityTypes });
    });
  }

  resumeApplication(applicationId: number): void {
    console.log('Resume button clicked with application ID:', applicationId);
    const id = applicationId;
    if (id && id > 0) {
      this.router.navigate(['/sapplication', id], { queryParams: { step: this.stepIndex } });
    } else {
      console.error('Invalid application ID');
    }
  }

  deleteApplication(applicationId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete application confirmed for ID:', applicationId);
        this.dataService.deleteApplication(applicationId).subscribe(
          response => {
            this.loadApplicationsList();
            this.snackBar.open('Application deleted successfully', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error deleting application', error);
            this.snackBar.open('Error deleting application: ' + (error.error.message || 'Error'), 'Close', { duration: 3000 });
          }
        );
      } else {
        console.log('Delete application cancelled');
      }
    });
  }
}
