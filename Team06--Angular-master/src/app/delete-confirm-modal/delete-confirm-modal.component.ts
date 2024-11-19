import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent {

  deleteForm:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    private fb: FormBuilder
  ) {
    this.deleteForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.deleteForm.valid) {
      const reason = this.deleteForm.get('reason')?.value;
      this.dialogRef.close({ confirmed: true, reason });
    }
  }

}
