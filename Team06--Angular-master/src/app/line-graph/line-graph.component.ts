import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../services/data.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.css']
})
export class LineGraphComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  applications: any[] = [];
  applicationStatuses: any[] = [];

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Number of Applications per Status'
    }]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Application Statuses'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Applications'
        }
      }
    }
  };

  chartPlugins = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadApplicationsList();
  }

  loadApplicationsList(): void {
    this.dataService.GetApplicationsDto().subscribe(data => {
      this.applications = data;
      this.loadApplicationStatuses();
    });
  }

  loadApplicationStatuses(): void {
    this.dataService.GetAllApplicationStatus().subscribe(data => {
      this.applicationStatuses = data;
      this.updateChart();
    });
  }

  private updateChart(): void {
    const statusCounts: { [key: string]: number } = {};

    // Initialize statusCounts with all available statuses
    this.applicationStatuses.forEach((status: any) => {
      statusCounts[status.description] = 0;
    });

    // Count the number of applications per status
    this.applications.forEach((app: any) => {
      const statusDescription = app.applicationStatusDescription;
      if (statusDescription && statusCounts.hasOwnProperty(statusDescription)) {
        statusCounts[statusDescription]++;
      }
    });

    this.barChartData = {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        label: 'Number of Applications per Status',
        backgroundColor: 'rgb(51, 51, 70)'
      }]
    };
  }
}
