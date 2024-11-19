import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  totalApplicants: number = 0;
  totalApplications: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getTotalApplicants();
    this.getTotalApplications();
  }

  getTotalApplicants(): void {
    this.dataService.GetAllClients().subscribe(data =>{
      this.totalApplicants = data.length;
    });
  }

  getTotalApplications(): void {
    this.dataService.GetApplicationsDto().subscribe(data => {
      this.totalApplications = data.length;
    });
  }
}
