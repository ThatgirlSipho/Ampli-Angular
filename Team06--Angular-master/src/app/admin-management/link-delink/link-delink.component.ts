import { Component } from '@angular/core';

@Component({
  selector: 'app-link-delink',
  templateUrl: './link-delink.component.html',
  styleUrls: ['./link-delink.component.css']
})
export class LinkDelinkComponent {

  consultants = [
    { id: 1, name: 'Consultant A' },
    { id: 2, name: 'Consultant B' },
    { id: 3, name: 'Consultant C' }
  ];

  applicants = [
    { id: 1, name: 'Applicant 1' },
    { id: 2, name: 'Applicant 2' },
    { id: 3, name: 'Applicant 3' },
    { id: 4, name: 'Applicant 4' }
  ];

  consultantManagers = [
    { id: 1, name: 'Manager A' },
    { id: 2, name: 'Manager B' },
    { id: 3, name: 'Manager C' }
  ];

  // Variables to store selected options
  selectedConsultant: any;
  selectedApplicants: any[] = [];
  isLinked = false; // State to track if linked or delinked

  selectedConsultantManager: any;
  selectedConsultants: any[] = [];
  isManagerLinked = false; // State to track if linked or delinked

  // Settings for the multi-select dropdown
  dropdownSettings = {
    singleSelection: false, // Allows multiple selection
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  // Method to handle linking or delinking consultant with applicants
  linkOrDelink() {
    if (this.isLinked) {
      this.delinkConsultant();
    } else {
      this.linkConsultant();
    }
  }

  // Method to link consultant with applicants
  linkConsultant() {
    if (this.selectedConsultant && this.selectedApplicants.length > 0) {
      // Implement your linking logic here
      console.log(`Linked Consultant ${this.selectedConsultant.name} with Applicants:`, this.selectedApplicants.map(a => a.name));
      this.isLinked = true;
    } else {
      alert('Please select a consultant and at least one applicant.');
    }
  }

  // Method to delink consultant from applicants
  delinkConsultant() {
    // Implement your delinking logic here
    console.log(`Delinked Consultant ${this.selectedConsultant.name} from Applicants:`, this.selectedApplicants.map(a => a.name));
    this.isLinked = false;
    this.selectedApplicants = []; // Reset selected applicants
  }

  // Method to handle linking or delinking consultant manager with consultants
  linkOrDelinkManager() {
    if (this.isManagerLinked) {
      this.delinkManager();
    } else {
      this.linkManager();
    }
  }

  // Method to link manager with consultants
  linkManager() {
    if (this.selectedConsultantManager && this.selectedConsultants.length > 0) {
      // Implement your linking logic here
      console.log(`Linked Manager ${this.selectedConsultantManager.name} with Consultants:`, this.selectedConsultants.map(c => c.name));
      this.isManagerLinked = true;
    } else {
      alert('Please select a manager and at least one consultant.');
    }
  }

  // Method to delink manager from consultants
  delinkManager() {
    // Implement your delinking logic here
    console.log(`Delinked Manager ${this.selectedConsultantManager.name} from Consultants:`, this.selectedConsultants.map(c => c.name));
    this.isManagerLinked = false;
    this.selectedConsultants = []; // Reset selected consultants
  }

}
