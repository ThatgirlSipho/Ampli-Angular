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
  cellNumber:string;
}

@Component({
  selector: 'app-getConsultants',
  templateUrl: './getConsultants.component.html',
  styleUrls: ['./getConsultants.component.css']
})
export class GetConsultantsComponent implements OnInit {
 
  isSidebarCollapsed: boolean = false;
  displayedColumns: string[] = ['fullName', 'email', 'cellNumber', 'view'];
  dataSource = new MatTableDataSource<Employee>([]);

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private accountService: AccountService, private router :Router,  private location: Location, private assistService: AssistService,
    private dialog: MatDialog,) {}
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  ngOnInit(): void {
    this.fetchEmployees();
   
  }

  fetchEmployees(): void {
    this.accountService.GetMyConsultants().subscribe({
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

  logout(): void {
    // Clear the localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Optionally redirect to the login page or homepage
    window.location.href = '/login'; // Adjust the URL as needed
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

          case 'consultantapplications':
            this.assistService.getConsultantApplicationsContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'adminapplications':
            this.assistService.getAdminApplicationsContentByPage(page).subscribe(content => {
              this.dialog.open(AssistModalComponent, {
                data: content
              });
            });
            break;

            case 'getconsultants':
            this.assistService.getGetConsultantsContentByPage(page).subscribe(content => {
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

  goBack(): void {
    this.location.back();
  }

}
