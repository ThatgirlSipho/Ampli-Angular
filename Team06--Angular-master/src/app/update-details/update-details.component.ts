import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../services/account.service';
import { Location } from '@angular/common';
import { emailDomainValidator } from '../services/validators';
@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent {
  profileForm: FormGroup;
  isClient: boolean = false;
  titles: any[] = [];
  presetProfileData: any = {}; 
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location
  ) { 
    this.profileForm = this.fb.group({
      titleId: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,emailDomainValidator]],
      cellNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      businessName: [''],
     // profilePic: ['']
    });
  }

  ngOnInit() {
    this.loadUserProfile();
    this.loadTitles();
  }

  loadUserProfile(): void {
    this.accountService.getUserProfile().subscribe({
      next: (profile: any) => {
        this.isClient = profile.hasOwnProperty('businessName') && profile.hasOwnProperty('dateJoined');
        this.presetProfileData = {
          role: profile.role,
          userId: profile.userId,
          fullName: profile.fullName,
          dateJoined: profile.dateJoined,
          Title:profile.Title,
        };

        // Log or use the preset data as needed
        console.log('Preset data:', this.presetProfileData);
        this.profileForm.patchValue(profile);
      },
      error: (err) => {
        console.error('Failed to load user profile', err);
      }
    });
  }
  loadTitles(): void {
    this.accountService.getAllTitles().subscribe({
      next: (titles) => {
        this.titles = titles;
      },
      error: (err) => {
        console.error('Failed to load titles', err);
      }
    });
  }


  onSubmit(): void {
  //  console.log(this.profileForm.value)
    if (this.profileForm.valid) {
      const profileData = this.prepareProfileData();
      console.log(profileData);
      this.accountService.updateUserProfile(profileData).subscribe({
        next: (response) => {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          this.location.back();
        },
        error: (err) => {
          console.error('Failed to update profile', err);
          this.snackBar.open('Failed to update profile', 'Close', { duration: 3000 });
        }
      });
    }
  }

  prepareProfileData(): any {
    const formValue = this.profileForm.value;
    let profileData: any;

    if (this.isClient) {
      profileData = {
        ClientProfile: {
          titleId: formValue.titleId,
          name: formValue.name,
          surname: formValue.surname,
          email: formValue.email,
          cellNumber: formValue.cellNumber,
          businessName: formValue.businessName,
          userId: this.presetProfileData.userId,
          fullName: this.presetProfileData.fullName,
          dateJoined: this.presetProfileData.dateJoined,
          Title:this.presetProfileData.Title,
        }
      };
    } else {
      profileData = {
        EmployeeProfile: {
          titleId: formValue.titleId,
          name: formValue.name,
          surname: formValue.surname,
          email: formValue.email,
          cellNumber: formValue.cellNumber,
          role: this.presetProfileData.role,
          userId: this.presetProfileData.userId,
          fullName: this.presetProfileData.fullName,
          
        }
      };
    }

    return profileData;
  }
  get cellNumber() {
    return this.profileForm.get('cellNumber');
  }
  goBack(): void {
    this.location.back();
  }
  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
  }
}
