import { Component, OnInit } from '@angular/core';
import { RequiredDocument } from 'src/app/services/model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  requiredDocuments: RequiredDocument[] = [];
  createForm: FormGroup;
  editForm: FormGroup;
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  addRequiredDocumentAtt: RequiredDocument = {
    requiredDocumentId: 0,
    description: '',
    applicationRequiredDocuments: []
  }

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchRequiredDocuments();
  }

  fetchRequiredDocuments(): void {
    this.dataService.GetAllRequiredDocuments().subscribe((data: RequiredDocument[]) => {
      this.requiredDocuments = data;
    }, error => {
      console.error('Error fetching required documents', error);
    });
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.showCreateModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  saveNew(): void {
    if (this.createForm.valid) {
      const description = this.createForm.get('name')?.value;
  
      this.dataService.addRequiredDocument(description).subscribe(
        {
          next: () => {
            this.fetchRequiredDocuments();
            this.closeCreateModal();
            this.snackBar.open('Document created successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error adding new required document', error);
            this.snackBar.open('Error creating document', 'Close', { duration: 3000 });
          }
        }
      );
    }
  }
  
    
  

  openEditModal(required: RequiredDocument): void {
    this.editForm.patchValue({
      id: required.requiredDocumentId,
      name: required.description
    });
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveEdit(): void {
    if (this.editForm.valid) {
      const updatedDocument: RequiredDocument = {
        requiredDocumentId: this.editForm.get('id')?.value,
        description: this.editForm.get('name')?.value,
        applicationRequiredDocuments: [] 

      };
      this.dataService.updateRequiredDocument(updatedDocument.requiredDocumentId, updatedDocument.description).subscribe(
        () => {
          this.fetchRequiredDocuments();
          this.closeEditModal();
          this.snackBar.open('Document updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating required document', error);
          this.snackBar.open('Error updating document', 'Close', { duration: 3000 });
        }
      );
    }
  }

  async confirmDelete(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRequiredDocument(id);
      }
    });
  }

  deleteRequiredDocument(id: number): void {
    console.log(`Attempting to delete document with id: ${id}`);
    this.dataService.deleteRequiredDocument(id).subscribe({
      next: () => {
        this.fetchRequiredDocuments();
        this.snackBar.open('Document deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error deleting required document', error);
        this.snackBar.open('Error deleting document', 'Close', { duration: 3000 });
      }
    });
  }
}
