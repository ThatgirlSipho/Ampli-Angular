import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-view-submitted',
  templateUrl: './applicant-view-submitted.component.html',
  styleUrls: ['./applicant-view-submitted.component.css']
})
export class ApplicantViewSubmittedComponent {

  submittedApplications = [
    { name: 'Close Corporation', description: 'Submitted close corporation application' },
    { name: 'Trust', description: 'Submitted trust application' },
    { name: 'Company', description: 'Submitted company application' }
  ];

  ngOnInit(): void {
    // Fetch the actual submitted applications from a service
  }

  constructor(private router: Router) {}

  goToProductSchedule() {
    this.router.navigate(['/view-applicant/product-schedule']);
  }

  showHelperMessage() {
    alert('Select an application you want to view or sign your product schedule by clicking the button');
  }

}
