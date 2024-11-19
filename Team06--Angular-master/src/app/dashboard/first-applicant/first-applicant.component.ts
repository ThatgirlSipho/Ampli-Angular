import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-applicant',
  templateUrl: './first-applicant.component.html',
  styleUrls: ['./first-applicant.component.css']
})
export class FirstApplicantComponent {
 
  constructor(private router: Router) { }

  openGuide() {
    // Replace with the actual path to your PDF
    const url = 'assets/Guide.pdf';
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.loadProfileImage();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    
    // You can perform additional checks/validation on the file here
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgSrc = e.target.result;
        // Optionally, you can preview the selected image before uploading
        const profileImg = document.querySelector('.profile-block img') as HTMLImageElement;
        if (profileImg) {
          profileImg.src = imgSrc;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  loadProfileImage(): void {
    const imgSrc = localStorage.getItem('profileImage');
    if (imgSrc) {
      this.setProfileImage(imgSrc);
    }
  }

  setProfileImage(imgSrc: string): void {
    const profileImg = document.querySelector('.profile-image') as HTMLImageElement;
    if (profileImg) {
      profileImg.src = imgSrc;
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
}