import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-side',
  templateUrl: './shared-side.component.html',
  styleUrls: ['./shared-side.component.css']
})
export class SharedSideComponent implements OnInit {
  userRole: string | null = '';
  isCollapsed = false;
  constructor() { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
