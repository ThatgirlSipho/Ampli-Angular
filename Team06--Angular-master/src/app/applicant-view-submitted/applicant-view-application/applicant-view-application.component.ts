import { Component } from '@angular/core';

@Component({
  selector: 'app-applicant-view-application',
  templateUrl: './applicant-view-application.component.html',
  styleUrls: ['./applicant-view-application.component.css']
})
export class ApplicantViewApplicationComponent {

  applicationDetails: any = {
    fullName: 'Nanny McPhee',
    registrationNumber: '12345678',
    tradingName: 'ABC DayCare',
    physicalAddress: 'Cottage Village',
    postalAddress: 'Cottage Village',
    vatRegistered: 'No',
    industryRegulatoryBody: 'National Credit Regulatory',
    numberOfLegalRepresentatives: 1,
    legalRepresentativeName: 'Drew Berrymore',
    incomeTaxNumber: '102447447',
    identificationType: 'ID'
  };

}
