import { Component, OnInit} from '@angular/core';
import { DocumentAgeComponent } from '../document-age/document-age.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface Document{
  name: string;
  consultantApproved: boolean;
  amplifinAdminApproved: boolean;
}


@Component({
  selector: 'app-admin-verify-document',
  templateUrl: './admin-verify-document.component.html',
  styleUrls: ['./admin-verify-document.component.css']
})
export class AdminVerifyDocumentComponent {

  folderId: string | null = null;
folderLink: string | null = null;
  isModalOpen = false;

  documents: Document[] = [
    {name: 'Proof of business address',  consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Proof of residential address',  consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Income tax certificate', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Identification document (Front & back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Passport (Front & back, certified, incl. work permit', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Shareholder identification document (Front & back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Master user ID (Front & Back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Sample of mandate currently in use (Front & back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Account holder ID (Front & back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Bank account confirmation (Front & Back, certified)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Letterhead (Clear interior & exterior, and photos)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Proof of address (Valid lease agreement)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Bank account confirmation (Capitec)', consultantApproved: false, amplifinAdminApproved: false},
    {name: 'Bank account confirmation (Debit)', consultantApproved: false, amplifinAdminApproved: false},
   ];
    documentService: any;

    
  comment: string = '';
  comments: string[] = [];

  items = [
    { name: '', checked: false },
  ];
  
   constructor(public dialog: MatDialog, private http: HttpClient) {}
   
  
   openCalculateDocumentAgeDialog() {
     this.dialog.open(DocumentAgeComponent, {
       width: '300px'
     });
   }
  
  toggleAmplifinAdminApproval(document: Document) {
    document.amplifinAdminApproved = !document.amplifinAdminApproved;
    this.documentService.updateDocument(document);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onCancelClick(): void {
    this.closeModal();
  }

  onOkClick(): void {
    const selectedItems = this.items.filter(item => item.checked);
    const selectedItemsNames = selectedItems.map(item => item.name).join(', ');

    // Update comments section
    this.comments.push(`Please upload the following documents: ${selectedItemsNames}`);

    // Send email
    this.sendEmail(selectedItemsNames);

    this.closeModal();
  }

  sendEmail(selectedItemsNames: string): void {
    const emailData = {
      to: 'recipient@example.com',
      subject: 'Selected Items',
      body: `The following items have been selected: ${selectedItemsNames}`
    };

    // Replace the URL with your email sending service endpoint
    this.http.post('https://your-email-service-endpoint.com/send', emailData)
      .subscribe(response => {
        console.log('Email sent successfully', response);
      }, error => {
        console.error('Error sending email', error);
      });
  }

  addItem() {
    this.items.push({ name: '', checked: false });
  }

  removeItem(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    }
  }


  // saveDocuments() {
  //   const newDocuments = this.items.filter(item => item.name).map(item => ({
  //     name: item.name,
  //     link: 'assets/documents/' + item.name + '.pdf', // Adjust the link generation logic as needed
  //     consultantApproved: false,
  //     amplifinAdminApproved: false
  //   }));
    
  //   this.documents = [...this.documents, ...newDocuments];
  //   this.items = [{ name: '', checked: false }];
  //   this.closeModal();
  // }
  
}
