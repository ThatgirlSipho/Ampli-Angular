import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-consultant',
  templateUrl: './view-consultant.component.html',
  styleUrls: ['./view-consultant.component.css']
})
export class ViewConsultantComponent implements OnInit{

  consultant :any;


  constructor(private accountService : AccountService, private route: ActivatedRoute,
   
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.loadUserProfile()
  }
  loadUserProfile(): void {
    this.accountService.GetConsultantProfile().subscribe({
      next: (profile) => this.consultant = profile,
      error: (err) => console.error('Failed to load user profile', err)
    });
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
