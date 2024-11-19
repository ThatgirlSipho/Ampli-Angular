import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../services/model';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';
import { Login } from '../services/model';
import { emailDomainValidator } from '../services/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email,emailDomainValidator]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.loginService.login(loginData).subscribe({
        next: (user: any) => {
          if (user.message?.includes('OTP')) {
            this.router.navigate(['/login-2fa'], { queryParams: { username: this.loginForm.value.userName } });
            const message="The 2-FA code has been sent to your email "
            this.snackBar.open(message, 'Close', { duration: 5000 });
          } else {
          console.log(loginData);
          localStorage.setItem('userName', user.username);
          localStorage.setItem('token', user.jwt);
          localStorage.setItem('role',user.role);
          if (user.role=="Administrator"){
            this.router.navigate(['/administrator']);
          }
          else if (user.role=="Amplifin Admin"){
            this.router.navigate(['/amplifin-admin']);
          }
          else if (user.role=="Consultant"){
            this.router.navigate(['/consultant']);
          }
           else if (user.role=="Consultant Manager"){
            this.router.navigate(['/consultant-manager']);
          }
          else {
            this.router.navigate(['/first-applicant']);
          }

        }
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    }
  }
  }

