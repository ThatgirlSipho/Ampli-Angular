import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { AssistService } from 'src/app/services/assist.service';
import { MatDialog } from '@angular/material/dialog';

interface Employee {
  employeeId:number;
  fullName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-View-Employees',
  templateUrl: './View-Employees.component.html',
  styleUrls: ['./View-Employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  role!: string;
  isSidebarCollapsed: boolean = false;
  displayedColumns: string[] = ['fullName', 'email', 'role', 'view'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private accountService: AccountService, private router :Router,  private location: Location,  private assistService: AssistService,
    private dialog: MatDialog,) {}
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  ngOnInit(): void {
    this.fetchEmployees();
    this.role = localStorage.getItem('role') || '';
  }

  fetchEmployees(): void {
    this.accountService.GetAllEmployees().subscribe({
      next: (employees) => {
        this.dataSource.data = employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Failed to fetch employees', err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewEmployee(employee: Employee): void {
    this.router.navigate(['/view-employee', employee.employeeId])
  }

  openAssist(page: string): void {
    // Use the correct service method based on the page parameter.
    switch (page.toLowerCase()) {
      case 'legal-entity':
        this.assistService.getLegalContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'forgot-password':
        this.assistService.getForgotContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'start':
        this.assistService.getStartContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      case 'application':
        this.assistService.getApplicationContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'list':
        this.assistService.getListContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'createapplicant':
        this.assistService.getCreateApplicantContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'newemployee':
        this.assistService.getNewEmployeeContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;

        case 'viewemployee':
        this.assistService.getViewEmployeeContentByPage(page).subscribe(content => {
          this.dialog.open(AssistModalComponent, {
            data: content
          });
        });
        break;
  
      default:
        console.error('Unknown page:', page);
        break;
    }
  }

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
  }
  goBack(): void {
    this.location.back();
  }


}
