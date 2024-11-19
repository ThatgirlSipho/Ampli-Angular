import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pending-applications',
  templateUrl: './view-pending-applications.component.html',
  styleUrls: ['./view-pending-applications.component.css']
})
export class ViewPendingApplicationsComponent implements OnInit {

  pendingApplications = [
    { name: 'Close Corporation', description: 'Pending close corporation application' },
    { name: 'Trust', description: 'Pending trust application' },
    { name: 'Company', description: 'Pending company application' }
  ];

  ngOnInit(): void {
    // Fetch the actual pending applications from a service
  }

}
