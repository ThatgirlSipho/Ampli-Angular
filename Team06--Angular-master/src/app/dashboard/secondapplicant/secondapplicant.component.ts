import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Application } from 'src/app/services/model';
import { Location } from '@angular/common';
import { AssistService } from 'src/app/services/assist.service';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-secondapplicant',
  templateUrl: './secondapplicant.component.html',
  styleUrls: ['./secondapplicant.component.css']
})
export class SecondapplicantComponent {

  applicationForm!: FormGroup;
  applicationId!: number;

  constructor(private data: DataService, private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location:Location,
    private assistService: AssistService,
    private dialog: MatDialog,
  ){}
  

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

  resumeApplication() {
    console.log('Resume application clicked');
    const savedProgressString = localStorage.getItem('applicationProgress');
    if (savedProgressString) {
      const savedProgress = JSON.parse(savedProgressString);
      if (savedProgress && savedProgress.stepIndex !== undefined) {
        console.log('Navigating to step', savedProgress.stepIndex);
        this.router.navigate(['/application'], { queryParams: { step: savedProgress.stepIndex } });
      } else {
        console.log('No saved progress found.');
      }
    } else {
      console.log('No saved progress found.');
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

