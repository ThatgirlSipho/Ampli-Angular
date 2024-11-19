import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Bank } from 'src/app/shared/sharonModelClasses/shared/Bank';
import { AccountType } from 'src/app/shared/sharonModelClasses/shared/AccountType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {
  bankNames: Bank[] = [];
  accountTypes: AccountType[] = [];
  selectedBank: Bank | null = null;
  selectedAccount: AccountType | null = null;
  bankForm: FormGroup;
  accountForm: FormGroup;
  editBankForm: FormGroup;
  editAccountForm: FormGroup;
  modalType: string = '';
  showCreateBankModal: boolean = false;
  showCreateAccountModal: boolean = false;
  showEditBankModal: boolean = false;
  showEditAccountModal: boolean = false;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.bankForm = this.formBuilder.group({
      name: ['', Validators.required],
      
    });

    this.accountForm = this.formBuilder.group({
      name: ['', Validators.required],
      
    });


    this.editBankForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
    });
  

  this.editAccountForm = this.formBuilder.group({
    id: [{ value: '', disabled: true }, Validators.required],
    name: ['', Validators.required],
  });
}

  ngOnInit(): void {
    this.fetchBankNames();
    this.fetchAccountTypes();
  }

  fetchBankNames(): void {
    this.dataService.GetAllBankNames().subscribe((data: any[]) => {
      this.bankNames = data;
    }, error => {
      console.error('Error fetching bank names', error);
    });
  }

  fetchAccountTypes(): void {
    this.dataService.GetAllAccountTypes().subscribe((data: AccountType[]) => {
      this.accountTypes = data;
    }, error => {
      console.error('Error fetching account types', error);
    });
  }

  openCreateModal(type: string): void {
    if (type === 'bank') {
      this.bankForm.reset();
      this.showCreateBankModal = true;
      this.showCreateAccountModal = false;
    }
  }

  openATCreateModal(type: string): void {
    if (type === 'account') {
      this.accountForm.reset();
      this.showCreateAccountModal = true;
      this.showCreateBankModal = false;
    }
  }

  closeCreateModal(): void {
    this.showCreateBankModal = false;
  }

  closeATCreateModal(): void {
    this.showCreateAccountModal = false;
  }

  openEditBankModal(required: Bank): void {
    this.editBankForm.patchValue({
      id: required.bankNameId,
      name: required.description,
    });
  this.showEditBankModal = true;
}

openEditAccountModal(required: AccountType): void {
  this.editAccountForm.patchValue({
    id: required.accountTypeId,
    name: required.description,
  });
this.showEditAccountModal = true;
}

closeEditBankModal(): void {
  this.showEditBankModal = false;
}

closeEditedAccountModal(): void {
  this.showEditAccountModal = false;
}

  saveNew(): void {
    if (this.bankForm.valid) {
      const description = this.bankForm.get('name')?.value;
      this.dataService.addBankName(description).subscribe({
        next: () => {
          this.fetchBankNames();
          this.closeCreateModal();
          this.snackBar.open('Bank Name created successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding new bank name', error);
          this.snackBar.open('Error creating bank name', 'Close', { duration: 3000 });
        }
      });
    }
  }
  

  saveEditedBank(): void {
    console.log('Form valid:', this.editBankForm.valid);
    console.log('Form values:', this.editBankForm.value);
  
    if (this.editBankForm.valid) {
      const bankNameId = this.editBankForm.get('id')?.value;
      const description = this.editBankForm.get('name')?.value;
  
      this.dataService.updateBankName(bankNameId, description).subscribe(
        () => {
          console.log('Bank name updated successfully');
          this.fetchBankNames();
          this.closeEditBankModal();
          this.snackBar.open('Bank Name updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating Bank Name:', error);
          this.snackBar.open('Error updating bank name', 'Close', { duration: 3000 });
        }
      );
    }
  }
  
  saveEditedAccount(): void {
    if (this.editAccountForm.valid) {
      const accountTypeId = this.editAccountForm.get('id')?.value;
      const description = this.editAccountForm.get('name')?.value;
  
      this.dataService.updateAccountType(accountTypeId, description).subscribe(
        () => {
          this.fetchAccountTypes();
          this.closeEditedAccountModal();
          this.snackBar.open('Account Type updated successfully', 'Close', { duration: 3000 });
        },
        error => {
          console.error('Error updating Account Type', error);
          this.snackBar.open('Error updating account type', 'Close', { duration: 3000 });
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
        this.deleteBankName(id);
      }
    });
  }

  deleteBankName(id: number): void {
    console.log(`Attempting to delete bank name with id: ${id}`);
    this.dataService.deleteBankName(id).subscribe({
      next: () => {
        this.fetchBankNames();
        this.snackBar.open('Bank name deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error deleting bank name', error);
        this.snackBar.open('Error deleting bank name', 'Close', { duration: 3000 });
      }
    });
  }



  saveNewAT(): void {
    if (this.accountForm.valid) {
      const description = this.accountForm.get('name')?.value;
      this.dataService.addAccountType(description).subscribe({
        next: () => {
          this.fetchAccountTypes();
          this.closeATCreateModal();
          this.snackBar.open('Account Type created successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding new account type', error);
          this.snackBar.open('Error creating account type', 'Close', { duration: 3000 });
        }
      });
    }
  }

  async confirmDeleteAT(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this item?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccountType(id);
      }
    });
  }

  deleteAccountType(id: number): void {
    console.log(`Attempting to delete bank name with id: ${id}`);
    this.dataService.deleteAccountType(id).subscribe({
      next: () => {
        this.fetchAccountTypes();
        this.snackBar.open('Account type deleted successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error deleting account type', error);
        this.snackBar.open('Error deleting account type', 'Close', { duration: 3000 });
      }
    });
  }

  
}






