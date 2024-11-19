import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Location } from '@angular/common';
import { emailDomainValidator } from '../services/validators';
import { AssistService } from '../services/assist.service';
import { AssistModalComponent } from '../assist-modal/assist-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  titles: any[] = [];
  roles: any[] = [];

  constructor(private fb: FormBuilder, private dataService: AccountService, private router: Router,private location: Location, private assistService: AssistService,
    private dialog: MatDialog) {
    this.employeeForm = this.fb.group({
      titleId: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,emailDomainValidator]],
      cellNumber: ['', [Validators.required, Validators.pattern('^0[0-9]{9}$')]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTitles();
    this.loadRoles();
  }

  loadTitles(): void {
    this.dataService.getAllTitles().subscribe({
      next: (data) => this.titles = data,
      error: (err) => console.error('Failed to load titles', err)
    });
  }

  loadRoles(): void {
    this.dataService.getEmployeeTypes().subscribe({
      next: (data) => {
        if (data && Array.isArray(data.$values)) {
          this.roles = data.$values;}
      },
      error: (err) => console.error('Failed to load roles', err)
    });
  }
  

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const { titleId, name, surname, email, cellNumber, role } = this.employeeForm.value;
      const employeeData = { titleId, name, surname, email, cellNumber };
      console.log(role);
      this.dataService.addEmployee(employeeData, role).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['/administrator']); // Replace with actual dashboard route
        },
        error: (err) => {
          console.error('Failed to add employee', err.error);
          alert(`Failed to add employee. Error: ${err.error.message}`);
        }
      });
    }
  }

  get cellNumber() {
    return this.employeeForm.get('cellNumber');
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

        case 'newemployee':
        this.assistService.getNewEmployeeContentByPage(page).subscribe(content => {
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
