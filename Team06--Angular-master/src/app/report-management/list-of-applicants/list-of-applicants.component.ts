import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/services/model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-list-of-applicants',
  templateUrl: './list-of-applicants.component.html',
  styleUrls: ['./list-of-applicants.component.css']
})
export class ListOfApplicantsComponent implements OnInit {

  clients: Client[] = [];
  totalClients: number = 0;
  reportGeneratorName: string = '';
  reportGeneratorRole: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getReportGenerator(); // Fetch report generator details

    this.dataService.GetAllClientsReports().subscribe(
      (data: any) => {
        // Check if data contains $values
        if (data && data.$values) {
          this.clients = data.$values;
        } else {
          this.clients = data; // Fallback if $values is not present
        }
        console.log('Clients data:', this.clients); // Log the data to verify
        this.totalClients = this.clients.length; // Calculate the total number of clients
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
  }

  private getReportGenerator(): void {
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
    console.log('Generating PDF');

    // Create a new jsPDF instance
    const doc = new jsPDF();

       // Add background image
  const backgroundImage = new Image();
  backgroundImage.src = '/assets/Portrait Dashboard.png'; 
  doc.addImage(backgroundImage, 'PNG', 0, 0, 210, 297); 
  

    // Add title
    doc.setFontSize(18);
    doc.text('Report on List of Applicants Registered', 14, 20);

    // Add report generation date
    doc.setFontSize(12);
    doc.text(`Report Generation Date: ${new Date().toLocaleDateString()}`, 14, 30);

    // Combine the generator's name and role
    const generatorText = `Generated by: ${this.reportGeneratorName}, ${this.reportGeneratorRole}`;

    // Add generator's details
    doc.text(generatorText, 14, 40);

    // Add client list in table format
    (doc as any).autoTable({
      startY: 50,
      head: [['#', 'Name', 'Surname', 'Email', 'Cell Number', 'Business Name', 'Title']],
      body: this.clients.map((client, index) => [
        index + 1,
        client.title?.description || 'No Title', 
        client.name,
        client.surname,
        client.email,
        client.cellNumber,
        client.businessName,
      ]),
    });

     // Generate the PDF as a Blob
     const pdfBlob = doc.output('blob');

     // Create a URL for the Blob
     const pdfUrl = URL.createObjectURL(pdfBlob);

     // Open the PDF in a new tab/window
     window.open(pdfUrl);
  }
}
