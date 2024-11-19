import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AccountService } from '../services/account.service';
import { Location } from '@angular/common';
import { emailDomainValidator } from '../services/validators';
import { AssistService } from '../services/assist.service';
import { AssistModalComponent } from '../assist-modal/assist-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-applicant',
  templateUrl: './new-applicant.component.html',
  styleUrls: ['./new-applicant.component.css']
})
export class NewApplicantComponent implements OnInit {
  payload: FormGroup;
  titles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private accountService:AccountService,
    private location: Location,
    private assistService: AssistService,
    private dialog: MatDialog,
  ) {
    this.payload = fb.group({
      TitleId: ['', Validators.required],
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email,emailDomainValidator]],
      CellNumber: ['', [Validators.required,Validators.pattern('^0[0-9]{9}$')]],
      BusinessName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTitles();
  }

  loadTitles(): void {
    this.accountService.getAllTitles().subscribe({
      next: (titles: any[]) => {
        this.titles = titles;
      },
      error: (err) => {
        console.error('Failed to load titles', err);
      }
    });
  }

  get TitleId() { return this.payload.get('TitleId'); }
  get Name() { return this.payload.get('Name'); }
  get Surname() { return this.payload.get('Surname'); }
  get Email() { return this.payload.get('Email'); }
  get CellNumber() { return this.payload.get('CellNumber'); }
  get BusinessName() { return this.payload.get('BusinessName'); }

  onSubmit(): void {
    if (this.payload.invalid) {
      window.alert("Please provide all required fields");
      return;
    }

    this.dataService.addClient(this.payload.value).subscribe({
      next: (response) => {
        alert(response.message);
        this.router.navigate(['/administrator']);
      },
      error: (error) => {
        window.alert("An error occurred: " + error.error);
      }
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
