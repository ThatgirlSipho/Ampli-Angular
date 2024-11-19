import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'User Management', url: '/user', },
    { title: 'Document Management', url: '/document', },
    { title: 'Entity Management', url: '/entity', },
    { title: 'Financial Management', url: '/financial',},
    { title: 'Supplier Management', url: '/supplier',},
    { title: 'Settings', url: '/settings', },
    // { title: 'Application Status', url: '/application-status',  },
  ];

  public selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.selectedPath = event.url;
      }
    });
  }

  selectPage(url: string) {
    this.selectedPath = url;
  }
}
