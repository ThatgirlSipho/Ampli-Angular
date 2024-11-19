import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Application } from 'src/app/services/model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Representative {
  fullName: string;
  incomeTaxNumber: string;
  identificationType: string;
}

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  @Input() applicationId!: number;
  isModalOpen = false;
  comment: string = '';
  comments: string[] = [];
  oneFormGroup!: FormGroup;


  constructor(private http: HttpClient, private dataService: DataService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private dialog: MatDialog,) {
    
    }

    ngOnInit(): void {
      this.applicationId = +this.route.snapshot.paramMap.get('applicationId')!;
    
    
    }

    submitComment() {
      if (this.comment.trim()) {
        const commentData = {
          applicationId: this.applicationId,
          description: this.comment,
          clientViewBool: true
        };
  
        console.log('Sending comment data:', commentData);
  
        this.dataService.submitComment(commentData).subscribe(
          response => {
            console.log('Response from API:', response);
            this.comments.push(this.comment);
            this.comment = '';
          },
          error => {
            console.error('Error from API:', error);
          }
        );
      }
    }
    
    

  sendEmailNotification(comment: string) {
    const email = {
      to: 'applicant@example.com',
      subject: 'New Comment on Your Application',
      body: `You have a new comment on your application: ${comment}`
    };

    this.http.post('/api/send-email', email).subscribe(response => {
      console.log('Email sent successfully');
    }, error => {
      console.error('Error sending email', error);
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onCancelClick(): void {
    this.closeModal();
  }

  sendEmail(selectedItemsNames: string): void {
    const emailData = {
      to: 'recipient@example.com',
      subject: 'Selected Items',
      body: `The following items have been selected: ${selectedItemsNames}`
    };

    // Replace the URL with your email sending service endpoint
    this.http.post('https://your-email-service-endpoint.com/send', emailData)
      .subscribe(response => {
        console.log('Email sent successfully', response);
      }, error => {
        console.error('Error sending email', error);
      });
  }
}
