import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { emailDomainValidator } from 'src/app/services/validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  email: string | null = null;
  token: string | null = null;
  registrationSuccessful: boolean = false;
  registrationMessage: string = '';

  
  constructor(private router: Router, private dataService: AccountService, private fb: FormBuilder, private snackBar: MatSnackBar,private route: ActivatedRoute,) { 
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email,emailDomainValidator]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] 
      this.token = params['token'] 
    
        this.confirm();
      
    });
  }

  passwordMatchValidator(formGroup: AbstractControl): { [key: string]: boolean } | null {
    return formGroup.get('password')!.value !== formGroup.get('confirmPassword')!.value ? { mismatch: true } : null;
  }
  passwordValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /\d/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const isValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;
    return !isValid ? { invalidPassword: true } : null;
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      const { password, username } = this.registerForm.value;
      this.dataService.register(password, username).subscribe({
        next: (response: any) => {
          alert(response.message); // Display success message
        },
        error: (err) => {
          console.error('Failed to register user', err);
          alert(`Failed to register user. Error: ${err.error.Message || err.message}`); // Display error message
        },
        complete: () => {
          this.router.navigate(['/login']); // Redirect to login page
        }
      });
    }
  }


  confirm(): void {
    if (this.email && this.token) {
      // Perform the registration using the email and token
      this.dataService.ConfirmRegistrationRequest( this.token,this.email,).subscribe(
        response => {
          this.registrationSuccessful = true;
          this.registrationMessage = response.message || 'Registration completed successfully.';
        },
        error => {
          this.registrationSuccessful = false;
          this.registrationMessage = 'An error occurred during email confirmation.';
          console.error('Error:', error);
        }
      );
    }
  }
  
  goBack(): void {
    // Navigate back to the previous page
    this.router.navigate(['/login']); // Replace '/previous-page' with the actual route of your previous page
  }
}


