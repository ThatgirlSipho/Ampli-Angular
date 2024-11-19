import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-resend-registration-link',
  templateUrl: './resend-registration-link.component.html',
  styleUrls: ['./resend-registration-link.component.css']
})
export class ResendRegistrationLinkComponent {

  email: string = 'johndoe@example.com'; // This should be dynamic based on the applicant's email
  isLoading: boolean = false;
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(private dataService: DataService) {}

  resendLink() {
    this.isLoading = true;
    this.message = null;
    this.errorMessage = null;

    this.dataService.sendRegistrationRequest(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.message = response.Message;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error && error.error.errors) {
          this.errorMessage = `Error: ${error.error.title}`;
        } else {
          this.errorMessage = `Error: ${error.message}`;
        }
      },
    });
  }
}
