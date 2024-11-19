import { Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {

  isCollapsed = false; // Tracks whether the sidebar is collapsed

  // Function to toggle sidebar collapsed state
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
