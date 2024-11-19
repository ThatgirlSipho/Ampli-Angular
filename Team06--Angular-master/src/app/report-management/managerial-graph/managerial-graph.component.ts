import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Consultant {
  employeeId: number;
  name: string;
  surname: string;
  consultantName: string;
  numberOfApplicants: number;
}

@Component({
  selector: 'app-managerial-graph',
  templateUrl: './managerial-graph.component.html',
  styleUrls: ['./managerial-graph.component.css']
})
export class ManagerialGraphComponent implements OnInit {

  @ViewChild('chartContainer') chartContainer!: ElementRef;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Number of Applicants linked to Consultants'
    }]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Name of Consultants'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Applicants'
        }
      }
    }
  };

  chartPlugins = [];
  reportGeneratorName: string = ''; // Set dynamically as needed
  reportGeneratorRole: string = ''; // Set dynamically as needed

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this,this.getReportGenerator();
    
    this.dataService.getAllConsultants().subscribe(consultants => {
      console.log('Consultants:', consultants); // Verify consultants data

      const consultantNames: string[] = [];
      const applicantsCount: number[] = [];
      let completedRequests = 0;

      consultants.forEach((consultant, index) => {
        this.dataService.getConsultantsLinkedApplicants(consultant.employeeId).subscribe({
          next: data => {
            console.log('Data for', consultant.employeeId, ':', data); // Verify data fetched for each consultant

            consultantNames.push(data.consultantName);
            applicantsCount.push(data.numberOfApplicants);
            completedRequests++;

            if (completedRequests === consultants.length) {
              this.updateChart(consultantNames, applicantsCount);
            }
          },
          error: error => {
            if (error.status === 404) {
              // Consultant has no applicants
              consultantNames.push(consultant.consultantName);
              applicantsCount.push(0);
              completedRequests++;

              if (completedRequests === consultants.length) {
                this.updateChart(consultantNames, applicantsCount);
              }
            } else {
              console.error('Error fetching consultant data:', error.message);
            }
          }
        });
      });
    });
  }

  private updateChart(labels: string[], data: number[]): void {
    this.barChartData = {
      labels: labels,
      datasets: [{
        data: data,
        label: 'Number of Applicants'
      }]
    };
  }

  getReportGenerator(): void {
    this.dataService.getCurrentUser().subscribe(
      (employee: any) => {
        this.reportGeneratorName = employee.fullName;
        this.reportGeneratorRole = employee.role;
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }

  generatePDF(): void {
    console.log('Generating PDF'); // Add a log to check if this method is called

    if (!this.chartContainer) {
      console.error('Chart container is not available');
      return;
    }

    // Capture the chart as an image
    html2canvas(this.chartContainer.nativeElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();

        // Add background image
  const backgroundImage = new Image();
  backgroundImage.src = '/assets/Portrait Dashboard.png'; 
  doc.addImage(backgroundImage, 'PNG', 0, 0, 210, 297); 
  

      // Add title
      doc.setFontSize(18);
      doc.text('Managerial Report', 14, 20);

      // Add report generation date
      doc.setFontSize(12);
      doc.text(`Report Generation Date: ${new Date().toLocaleDateString()}`, 14, 30);

      // Combine the generator's name and role
      const generatorText = `Generated by: ${this.reportGeneratorName}, ${this.reportGeneratorRole}`;

      // Add generator's details
      doc.setFontSize(12);
      doc.text(generatorText, 14, 40);

      // Add the chart image
      const imgWidth = 180; // Set appropriate width
      const imgHeight = canvas.height * imgWidth / canvas.width; // Calculate height to maintain aspect ratio
      doc.addImage(imgData, 'PNG', 14, 50, imgWidth, imgHeight); // Adjust x, y, width, height as needed

      // Generate the PDF as a Blob
      const pdfBlob = doc.output('blob');

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab/window
      window.open(pdfUrl);

      // Optionally, trigger a download
      // const link = document.createElement('a');
      // link.href = pdfUrl;
      // link.download = 'managerial-report.pdf';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }
}
