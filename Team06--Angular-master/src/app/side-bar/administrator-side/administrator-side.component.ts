import { Component } from '@angular/core';

@Component({
  selector: 'app-administrator-side',
  templateUrl: './administrator-side.component.html',
  styleUrls: ['./administrator-side.component.css']
})
export class AdministratorSideComponent {

  isCollapsed = false; // Tracks whether the sidebar is collapsed

  // Function to toggle sidebar collapsed state
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
