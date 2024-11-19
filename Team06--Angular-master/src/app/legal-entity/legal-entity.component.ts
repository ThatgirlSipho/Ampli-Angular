import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssistService } from '../services/assist.service';
import { AssistModalComponent } from '../assist-modal/assist-modal.component';
import { HttpClient } from '@angular/common/http';
import { SaveLinkDTO } from '../services/model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.css']
})
export class LegalEntityComponent implements OnInit {
  folderId: string | null = null;
  legalentityform: FormGroup;
  legalEntityTypes: any[] = [];
applicationId!: number;
selectedEntityDescription!:string;
  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private assistService: AssistService,
    private dialog: MatDialog,
    private location: Location
  ) {
    this.legalentityform = this.fb.group({
      legalEntityId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadLegalEntities();
  }

  loadLegalEntities(): void {
    this.data.GetAllLegalEntityTypes().subscribe(
      data => {
        console.log('LegalEntity ', data);
        this.legalEntityTypes = data;
      },
      error => {
        console.error('Error loading legal entities', error);
      }
    );
  }

  onSubmit(): void {
    if (this.legalentityform.valid) {
      const le = this.legalentityform.value;
      console.log('Submitting legal entity:', le);

      // Find the selected legal entity description
      const selectedEntity = this.legalEntityTypes.find(entity => entity.legalEntityTypeId === le.legalEntityId);
       this.selectedEntityDescription = selectedEntity ? selectedEntity.description : '';
      
      this.data.StartApplication(le.legalEntityId).subscribe(
        response => {
          console.log('Product added successfully:', response);
          this.applicationId = response.application.applicationId;

          this.createFolder(this.applicationId.toString(), this.selectedEntityDescription);
          // Create folder on Google Drive
        //  this.createFolder(applicationId, selectedEntityDescription);
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
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
  
      default:
        console.error('Unknown page:', page);
        break;
    }
  }
  
  

  createFolder(applicationId: string, entityDescription: string): void {
    this.http.post<any>('http://localhost:3000/create-folder', {}).subscribe(
      response => {
        this.folderId = response.folderId;
        this.saveLink();
       // this.router.navigate(['application', this.applicationId])
      },
      error => console.error('Error creating folder:', error)
    );
  }

  saveLink(): void {
    const saveLinkDTO: SaveLinkDTO = {
      applicationId: this.applicationId,
      driveLink: this.folderId ?? undefined
    };

    this.data.addLink(saveLinkDTO).subscribe(
      response => {
        console.log('Link saved successfully:', response);
        this.router.navigate(['sapplication', this.applicationId]);
      },
      error => {
        console.error('Error saving link:', error);
      }
    );
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
