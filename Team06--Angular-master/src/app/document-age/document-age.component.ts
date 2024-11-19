import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { differenceInMonths} from 'date-fns';

@Component({
  selector: 'app-document-age',
  templateUrl: './document-age.component.html',
  styleUrls: ['./document-age.component.css']
})
export class DocumentAgeComponent {
  documentDateForm = new FormGroup({
    documentDate: new FormControl('')
  });

  resultMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<DocumentAgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  calculateAge() {
   console.log('Calculate button clicked');
   const documentDate = this.documentDateForm.value.documentDate;
   console.log('Document date:', documentDate);
    if (documentDate) {
      // Convert the date to ISO string format
      const parsedDate = new Date(documentDate);
      const isoString = parsedDate.toISOString();
      const monthsDifference = differenceInMonths(new Date(), new Date(isoString));
      console.log('Months difference:', monthsDifference);

      if (monthsDifference > 3) {
        this.resultMessage = 'Deficient document';
      } else {
        this.resultMessage = 'Valid document';
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
