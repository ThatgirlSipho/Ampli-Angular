import { Component } from '@angular/core';
import { AlternativeSupplierReason } from 'src/app/services/model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplierReason: AlternativeSupplierReason[] = [];
  createForm: FormGroup;
  editForm: FormGroup;
  showCreateModal: boolean = false;
  showEditModal: boolean = false;

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
    this.fetchAlternativeSupplierReasons();
  }

  fetchAlternativeSupplierReasons(): void {
    this.dataService.GetAllAlternativeSupplierReasons().subscribe((data: AlternativeSupplierReason[]) => {
      this.supplierReason = data;
    }, error => {
      console.error('Error fetching supplier reasons', error);
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
    console.log('Save button clicked');
  
    if (this.createForm.valid) {
      const description = this.createForm.get('name')?.value;
  
      console.log('Description:', description);
  
      this.dataService.addAlternativeSupplierReason(description).subscribe({
        next: () => {
          console.log('Success: Alternative supplier reason created');
          this.fetchAlternativeSupplierReasons();
          this.closeCreateModal();
          this.snackBar.open('Alternative supplier reason created successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding new alternative supplier reason', error);
          this.snackBar.open('Error creating alternative supplier reason', 'Close', { duration: 3000 });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  
  
  
  
  openEditModal(required: AlternativeSupplierReason): void {
    this.editForm.patchValue({
      id: required.alternativeSupplierReasonsId,
      name: required.description
    });
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveEdit(): void {
    if (this.editForm.valid) {
      const id = this.editForm.get('id')?.value;
      const description = this.editForm.get('name')?.value;

      this.dataService.updateAlternativeSupplierReason(id, description).subscribe(
        () => {
          this.fetchAlternativeSupplierReasons();  // Ensure this method is implemented to refresh data
          this.closeEditModal();
          this.snackBar.open('Supplier Reason updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating supplier reason', error);
          this.snackBar.open('Error updating supplier reason', 'Close', { duration: 3000 });
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
        this.deleteAlternativeSupplierReason(id);
      }
    });
  }

  deleteAlternativeSupplierReason(id: number): void {
    this.dataService.deleteAlternativeSupplierReason(id).subscribe(
      () => {
        this.fetchAlternativeSupplierReasons();
        this.snackBar.open('Reason deleted successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error deleting supplier reason', error);
        console.error('Request URL:', this.dataService.apiUrl + 'CRUD/DeleteAlternativeReason/' + id);
        this.snackBar.open('Error deleting supplier reason', 'Close', { duration: 3000 });
      }
    );
  }
}

