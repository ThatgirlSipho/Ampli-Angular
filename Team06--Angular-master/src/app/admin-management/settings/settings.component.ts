import { Component, OnInit } from '@angular/core';
import { AuthenticationMechanisms, DebtorManagementSystem, IdentificationType} from 'src/app/services/model';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { DebtorManagement } from 'src/app/shared/sharonModelClasses/shared/DebtorManagement';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  mechanisms: AuthenticationMechanisms[] = [];
  debtorSystem: DebtorManagementSystem[] = [];
  identification: IdentificationType[] = [];
  createMechForm: FormGroup;
  createDEBForm: FormGroup;
  createIdForm: FormGroup;
  editMechForm: FormGroup;
  editDEBForm: FormGroup;
  editIdForm: FormGroup;
  showCreateMechModal: boolean = false;
  showCreateDEBModal: boolean = false;
  showCreateIdModal: boolean = false;
  showEditMechModal: boolean = false;
  showEditDEBModal: boolean = false;
  showEditIdModal: boolean = false;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createMechForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  
    
      this.createDEBForm = this.formBuilder.group({
        name: ['', Validators.required],
      });

      this.createIdForm = this.formBuilder.group({
        name: ['', Validators.required],
      });
  

    this.editMechForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });

    this.editDEBForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });

    this.editIdForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchAuthenticationMechanisms();
    this.fetchDebtorManagementSystems();
    this.fetchIdentificationTypes();
  }

  fetchAuthenticationMechanisms(): void {
    this.dataService.GetAllAuthenticationMechanisms().subscribe((data: AuthenticationMechanisms[]) => {
      this.mechanisms = data;
    }, error => {
      console.error('Error fetching required documents', error);
    });
  }

fetchDebtorManagementSystems(): void {
  this.dataService.GetAllDebtorManagementSystems().subscribe((data: DebtorManagementSystem[]) => {
    this.debtorSystem = data;
  }, error => {
    console.error('Error fetching debtor management systems', error);
  });
}

fetchIdentificationTypes(): void {
  this.dataService.GetAllIdentificationTypes().subscribe((data: IdentificationType[]) => {
    this.identification = data;
  }, error => {
    console.error('Error fetching debtor management systems', error);
  });
}

  openCreateMechModal(): void {
    this.createMechForm.reset();
    this.showCreateMechModal = true;
  }

  openCreateDEBModal(): void {
    this.createDEBForm.reset();
    this.showCreateDEBModal = true;
  }

  openCreateIdModal(): void {
    this.createIdForm.reset();
    this.showCreateIdModal = true;
  }

  closeCreateMechModal(): void {
    this.showCreateMechModal = false;
  }

  closeCreateDEBModal(): void {
    this.showCreateDEBModal = false;
  }

  closeCreateIdModal(): void {
    this.showCreateIdModal = false;
  }

  saveNewMech(): void {
    if (this.createMechForm.valid) {
      const description = this.createMechForm.get('name')?.value;
  
      this.dataService.addAuthenticationMechanisms(description).subscribe(
        {
          next: () => {
            this.fetchAuthenticationMechanisms();
            this.closeCreateMechModal();
            this.snackBar.open('Mechanism created successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error adding new mechanism', error);
            this.snackBar.open('Error creating mechanism', 'Close', { duration: 3000 });
          }
        }
      );
    }
  }
  
  saveNewDEB(): void {
    if (this.createDEBForm.valid) {
      const description = this.createDEBForm.get('name')?.value;
  
      this.dataService.addDebtorManagementSystem(description).subscribe({
        next: () => {
          this.fetchDebtorManagementSystems();
          this.closeCreateDEBModal();
          this.snackBar.open('Debtor Management System created successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding new debtor management system', error);
          this.snackBar.open('Error creating debtor management system', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
  saveNewId(): void {
    if (this.createIdForm.valid) {
      const description = this.createIdForm.get('name')?.value;
  
      this.dataService.addIdentificationType(description).subscribe({
        next: () => {
          this.fetchIdentificationTypes();
          this.closeCreateIdModal();
          this.snackBar.open('Identification Type created successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding new IdentificationType', error);
          this.snackBar.open('Error creating IdentificationType', 'Close', { duration: 3000 });
        }
      });
    }
  }
  
  

  openEditMechModal(required: AuthenticationMechanisms): void {
    this.editMechForm.patchValue({
      id: required.authenticationMechanismsId,
      name: required.description
    });
    this.showEditMechModal = true;
  }

  openDEditModal(required: DebtorManagementSystem): void {
    this.editDEBForm.patchValue({
      id: required.debtorManagementSystemId,
      name: required.description
    });
    this.showEditDEBModal = true;
  }

  openEditIdModal(required: IdentificationType): void {
    this.editIdForm.patchValue({
      id: required.identificationTypeId,
      name: required.description
    });
    this.showEditIdModal = true;
  }

  closeEditMechModal(): void {
    this.showEditMechModal = false;
  }

  closeEditDEBModal(): void {
    this.showEditDEBModal = false;
  }

  closeEditIdModal(): void {
    this.showEditIdModal = false;
  }


  saveEditMech(): void {
    if (this.editMechForm.valid) {
      const updatedAuthenticationMechanisms: AuthenticationMechanisms = {
        authenticationMechanismsId: this.editMechForm.get('id')?.value,
        description: this.editMechForm.get('name')?.value
      };
  
      this.dataService.updateAuthenticationMechanisms(
        updatedAuthenticationMechanisms.authenticationMechanismsId, 
        updatedAuthenticationMechanisms.description
      ).subscribe(
        () => {
          this.fetchAuthenticationMechanisms();
          this.closeEditMechModal();
          this.snackBar.open('Mechanism updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating mechanism', error);
          this.snackBar.open('Error updating mechanism', 'Close', { duration: 3000 });
        }
      );
    }
  }
  

  saveEditDEB(): void {
    console.log('Form valid:', this.editDEBForm.valid);
    console.log('Form values:', this.editDEBForm.value);

    if (this.editDEBForm.valid) {
        const updatedDebtorManagementSystem: DebtorManagementSystem = {
            debtorManagementSystemId: this.editDEBForm.get('id')?.value,
            description: this.editDEBForm.get('name')?.value,
            processingCodes: []
        };
        
        console.log('Updated Debtor Management System:', updatedDebtorManagementSystem);

        this.dataService.updateDebtorManagementSystem(
            updatedDebtorManagementSystem.debtorManagementSystemId, 
            updatedDebtorManagementSystem.description
        ).subscribe(
            () => {
                console.log('Debtor Management System updated successfully');
                this.fetchDebtorManagementSystems();
                this.closeEditDEBModal();
                this.snackBar.open('Debtor Management System updated successfully', 'Close', { duration: 3000 });
            },
            error => {
                console.error('Error updating debtor management system', error);
                this.snackBar.open('Error updating debtor management system', 'Close', { duration: 3000 });
            }
        );
    }
}

  saveEditId(): void {
    if (this.editIdForm.valid) {
      const updatedIdentificationType: IdentificationType = {
        identificationTypeId: this.editIdForm.get('id')?.value,
        description: this.editIdForm.get('name')?.value
      };
  
      this.dataService.updateIdentificationType(
        updatedIdentificationType.identificationTypeId, 
        updatedIdentificationType.description
      ).subscribe(
        () => {
          this.fetchIdentificationTypes();
          this.closeEditIdModal();
          this.snackBar.open('Identification Type updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating Identification Type', error);
          this.snackBar.open('Error updating Identification Type', 'Close', { duration: 3000 });
        }
      );
    }
  }
  


  deleteAuthenticationMechanisms(id: number): void {
    this.dataService.deleteAuthenticationMechanisms(id).subscribe(() => {
      this.fetchAuthenticationMechanisms();
      this.snackBar.open('Mechanism deleted successfully', 'Close', { duration: 3000 });
    }, error => {
      console.error('Error deleting required mechanism', error);
      this.snackBar.open('Error deleting mechanism', 'Close', { duration: 3000 });
    });
  }

  async confirmDeleteMech(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAuthenticationMechanisms(id);
      }
    });
  }

  deleteDebtorManagementSystem(id: number): void {
    console.log('Deleting Debtor Management System with ID:', id); // Log the ID being deleted
    this.dataService.deleteDebtorManagementSystem(id).subscribe(
      () => {
        this.fetchDebtorManagementSystems(); // Refresh the list after deletion
        this.snackBar.open('Debtor Management System deleted successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error deleting debtor management system', error); // Log the error
        this.snackBar.open('Error deleting Debtor Management System', 'Close', { duration: 3000 });
      }
    );
  }

  // Method to open a confirmation dialog before deletion
  async confirmDeleteDEB(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If the user confirms the deletion
        this.deleteDebtorManagementSystem(id);
      }
    });
  }
  

  deleteIdentificationType(id: number): void {
    this.dataService.deleteIdentificationType(id).subscribe( () => {
        this.fetchIdentificationTypes();
        this.snackBar.open('Identification type deleted successfully', 'Close', { duration: 3000 });
      },
      error => {
        console.error('Error deleting Identification type', error);
        this.snackBar.open('Error deleting Identification type', 'Close', { duration: 3000 });
    });
  }
  async confirmIdDelete(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteIdentificationType(id); // Correct function name
      }
    });
  }
}