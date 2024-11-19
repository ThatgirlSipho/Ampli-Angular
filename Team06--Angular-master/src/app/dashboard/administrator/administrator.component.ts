import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent {
  
  constructor(private router: Router) { }

  isVideoModalOpen = false;


  openVideo() {
    this.isVideoModalOpen = true;
  }

  closeVideoModal() {
    this.isVideoModalOpen = false;
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

  navigateToMainPage(): void {
    this.router.navigate(['../main']); 
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
