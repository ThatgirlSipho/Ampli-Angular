import { Component, OnInit} from '@angular/core';
import { DocumentAgeComponent } from '../document-age/document-age.component';
import { MatDialog } from '@angular/material/dialog';

interface Document{
  name: string;

  consultantApproved: boolean;
  amplifinAdminApproved: boolean;
}

@Component({
  selector: 'app-verify-documents',
  templateUrl: './verify-documents.component.html',
  styleUrls: ['./verify-documents.component.css']
})
export class VerifyDocumentsComponent {
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

 constructor(public dialog: MatDialog,) {}

 openCalculateDocumentAgeDialog() {
   this.dialog.open(DocumentAgeComponent, {
     width: '300px'
   });
 }

 toggleConsultantApproval(document: Document) {
  document.consultantApproved = !document.consultantApproved;
  this.documentService.updateDocument(document);
}


}
