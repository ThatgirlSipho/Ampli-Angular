import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AuditLogDetailDialog',
  templateUrl: './AuditLogDetailDialog.component.html',
  styleUrls: ['./AuditLogDetailDialog.component.css']
})
export class AuditLogDetailDialogComponent  {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  

}
