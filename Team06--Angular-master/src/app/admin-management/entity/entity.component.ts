import { Component, OnInit } from '@angular/core';
import { IndustryRegulatoryBody, LegalEntityTypes } from 'src/app/services/model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  industryRegulatoryBody: IndustryRegulatoryBody[] = [];
  entityTypes: LegalEntityTypes[] = [];
  createForm: FormGroup;
  editForm: FormGroup;
  editEntityForm: FormGroup;
  showCreateModal: boolean = false;
  showCreateEntityModal: boolean = false;
  showEditModal: boolean = false;
  showEditEntityModal: boolean = false;

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

    this.editEntityForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchIndustryRegulatoryBody();
    this.fetchLegalEntityTypes();
  }

  fetchIndustryRegulatoryBody(): void {
    this.dataService.GetAllIndustryRegulatoryBodies().subscribe((data: IndustryRegulatoryBody[]) => {
      this.industryRegulatoryBody = data;
    }, error => {
      console.error('Error fetching industry regulartory body', error);
    });
  }

  fetchLegalEntityTypes(): void {
    this.dataService.GetAllLegalEntityTypes().subscribe((data: LegalEntityTypes[]) => {
      this.entityTypes = data;
    }, error => {
      console.error('Error fetching legal entity types', error);
    });
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.showCreateModal = true;
  }

  openCreateEntityModal(): void {
    this.createForm.reset();
    this.showCreateEntityModal = true;
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
  }

  closeCreateEntityModal(): void {
    this.showCreateEntityModal = false;
  }

  saveNew(): void {
    if (this.createForm.valid) {
      const newDocument: IndustryRegulatoryBody = {
        industryRegulatoryBodyId: 0,
        description: this.createForm.get('name')?.value,  // Assuming 'name' is the form control name for the input
        applications: [] //Added by Njabulo
      };
  
      this.dataService.addIndustryRegulatoryBody(newDocument).subscribe(
        () => {
          this.fetchIndustryRegulatoryBody();
          this.closeCreateModal();
          this.snackBar.open('Industry Regulatory Body created successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error adding new industry regulatory body', error);
          this.snackBar.open('Error creating industry regulatory body', 'Close', { duration: 3000 });
        }
      );
    }
  }
  

  saveNewType(): void {
    if (this.createForm.valid) {
      const description = this.createForm.get('name')?.value;
  
      this.dataService.addLegalEntityType(description).subscribe(
        () => {
          this.fetchLegalEntityTypes(); // Ensure this method is correctly named and implemented
          this.closeCreateEntityModal();
          this.snackBar.open('Legal entity created successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error adding new legal entity', error);
          this.snackBar.open('Error creating legal entity', 'Close', { duration: 3000 });
        }
      );
    }
  }
  

  
  

  openEditModal(required: IndustryRegulatoryBody): void {
    this.editForm.patchValue({
      id: required.industryRegulatoryBodyId,
      name: required.description
    });
    this.showEditModal = true;
  }

  openEntityEditModal(required: LegalEntityTypes): void {
    this.editEntityForm.patchValue({
      id: required.legalEntityTypeId,
      name: required.description
    });
    this.showEditEntityModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  closeEditEntityModal(): void {
    this.showEditEntityModal = false;
  }

  saveEdit(): void {
    if (this.editForm.valid) {
      const updatedBody: IndustryRegulatoryBody = {
        industryRegulatoryBodyId: this.editForm.get('id')?.value,
        description: this.editForm.get('name')?.value,
        applications: [] // Added by Njabulo
      };
      this.dataService.updateIndustryRegulatoryBody(updatedBody.industryRegulatoryBodyId, updatedBody.description).subscribe(
        () => {
          this.fetchIndustryRegulatoryBody(); // Ensure this method is implemented
          this.closeEditModal();
          this.snackBar.open('Industry Regulatory Body updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating industry regulatory body', error);
          this.snackBar.open('Error updating industry regulatory body', 'Close', { duration: 3000 });
        }
      );
    }
  }

  saveEntityEdit(): void {
    if (this.editEntityForm.valid) {
      const updatedLegalEntityType: LegalEntityTypes = {
        legalEntityTypeId: this.editEntityForm.get('id')?.value,
        description: this.editEntityForm.get('name')?.value,
        applications: [],  // Added by Njabulo
       // shareholders: []  // Added by Njabulo

      };
      this.dataService.updateLegalEntityType(updatedLegalEntityType.legalEntityTypeId, updatedLegalEntityType.description).subscribe(
      () => {
        this.fetchLegalEntityTypes();
        this.closeEditEntityModal();
        this.snackBar.open('Legal Entity updated successfully', 'Close', { duration: 3000 });
      }, 
      error => {
        console.error('Error updating legal entity', error);
        this.snackBar.open('Error updating legal entity', 'Close', { duration: 3000 });
      });
    }
  }


  async confirmLegalDelete(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteLegalEntityType(id)
      }
    });
  }

  async confirmDelete(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteIndustryRegulatoryBody(id);
      }
    });
  }
  
  deleteIndustryRegulatoryBody(id: number): void {
    console.log(`Attempting to delete industry regulatory body with id: ${id}`);
    this.dataService.deleteIndustryRegulatoryBody(id).subscribe({
      next: () => {
        console.log('Delete successful');
        this.fetchIndustryRegulatoryBody(); // Refresh the list after deletion
        this.snackBar.open('Industry Regulatory Body deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error deleting industry regulatory body', error);
        if (error.status === 404) {
          console.error('The resource was not found. Please check the URL and resource ID.');
        }
        this.snackBar.open('Error deleting industry regulatory body', 'Close', { duration: 3000 });
      }
    });
  }
  
  
  
  
  
  deleteLegalEntityType(id: number): void {
    console.log(`Attempting to delete legal entity with id: ${id}`);
    this.dataService.deleteLegalEntityType(id).subscribe( {
     next: () => {
      this.fetchLegalEntityTypes();
      this.snackBar.open('Legal entity type deleted successfully', 'Close', { duration: 3000 });
    }, 
    error: (error) => {
      console.error('Error deleting legal entity type', error);
      this.snackBar.open('Error deleting legal entity type', 'Close', { duration: 3000 });
    }
    });
  }

}