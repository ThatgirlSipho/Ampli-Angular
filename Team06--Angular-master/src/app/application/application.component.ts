import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BankName, IndustryRegulatoryBody, CollectionType, MandateTypes, LegalEntityTypes, AlternativeSupplierReason, AccountType, DebtorManagementSystem, Product, AuthenticationMechanisms, LegalEntityDependant, Shareholder, AuthorizedSignatory, ExistingCollections, IdentificationType, LegalEntityStructures  } from '../services/model';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MatStepper} from '@angular/material/stepper';
import { Injectable } from '@angular/core';
import { Application } from '../services/model';



@Injectable({providedIn: 'root'})
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface UploadFile {
  file: File;
  name: string;
  progress: number;
  uploading: boolean;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ]
})
export class ApplicationComponent implements OnInit {
//upload document
selectedFile: File | null = null;
folderId: string | null = null;
folderLink: string | null = null;
fileLinks: { name: string, link: string }[] = [];
//

  @ViewChild('stepper', {static: false}) stepper!: MatStepper;
  identificationType: IdentificationType [] = [];
  industryRegulatoryBody: IndustryRegulatoryBody[] = [];
  legalEntityTypeId: number = 0;
  legalEntityTypes: LegalEntityTypes[] = [];
  legalEntityStructures:LegalEntityStructures[]=[]
  mandateTypes: MandateTypes[] = [];
  collectionTypes: CollectionType[] = [];
  alternativeSupplierReason: AlternativeSupplierReason[] = [];
  bankName: BankName[] = [];
  accountType: AccountType[] = [];
  debtorManagementSystem: DebtorManagementSystem[] = [];
  product: Product[] = [];
  mechanism: AuthenticationMechanisms [] = [];
  data: any;
  selectedFiles: UploadFile[] = [];
  isDragOver = false;
  applicationForm!: FormGroup;
  applicationId!: number;
  selectedCollectionTypes=new Set<number>();
  selectedProducts = new Set<number>();
  isLoading = false;


  // Explicitly typing FormArray
  representativesFormArray: FormArray = new FormArray<FormGroup>([]);
  shareholdersFormArray: FormArray = new FormArray<FormGroup>([]);
  signaturesFormArray: FormArray = new FormArray<FormGroup>([]);
  nameFormControl = new FormControl('', [Validators.required]);
  registrationNumberFormControl = new FormControl('', [Validators.required]);
  tradingNameFormControl = new FormControl('', [Validators.required]);
  physicalAddressFormControl = new FormControl('', [Validators.required]);
  postalAddressFormControl = new FormControl('', [Validators.required]);
  RegisteredFormControl = new FormControl('', [Validators.required]);
  vatNumberFormControl = new FormControl('', [Validators.required]);
  productFormControl = new FormControl<number[]>([], [Validators.required]);
  debtorManagementFormControl = new FormControl('', [Validators.required]);
  accountTypeFormControl = new FormControl('', [Validators.required]);
  bankNameFormControl = new FormControl('', [Validators.required]);
  existingCollectionsFormControl = new FormControl<number[]>([], [Validators.required]);
  legalEntityStructureFormControl = new FormControl('', [Validators.required]);
  supplierReasonFormControl = new FormControl('', [Validators.required]);
  mandateTypeFormControl = new FormControl('', [Validators.required]);
  industryRegulatoryBodyFormControl = new FormControl<number | null>(null, [Validators.required]);
  otherRegulatoryBodyFormControl = new FormControl('', [Validators.required]);
  regulatoryBodyFormControl = new FormControl('', [Validators.required]);
  otherRegistrationNumberFormControl = new FormControl('', [Validators.required]);
  numberOfRepsFormControl = new FormControl('', [Validators.required]);

  shareholderFormControl = new FormControl('', [Validators.required]);
  shareholderNumber = new FormControl('', [Validators.required]);
  numberOfSignaturesFormControl = new FormControl('', [Validators.required]);
  signatureOfRepFormControl = new FormControl('', [Validators.required]);
  collectionTypeFormControl = new FormControl([], [Validators.required]);
  branchOutletFormControl = new FormControl('', [Validators.required]);
  callCenterFormControl = new FormControl('', [Validators.required]);
  paymentProviderFormControl = new FormControl('', [Validators.required]);
  otherReasonFormControl = new FormControl('', [Validators.required]);
  aetEmailFormControl = new FormControl('', [Validators.required]);
  monthlyLimitFormControl = new FormControl('', [Validators.required]);
  accountHolderFormControl = new FormControl('', [Validators.required]);
  branchNameFormControl = new FormControl('', [Validators.required]);
  branchCodeFormControl = new FormControl('', [Validators.required]);
  accountNumberFormControl = new FormControl('', [Validators.required]);
  processingTradingNameFormControl = new FormControl('', [Validators.required]);
  preferredUserFormControl = new FormControl('', [Validators.required]);
  processingPhysicalAddressFormControl = new FormControl('', [Validators.required]);
  landlordNameFormControl = new FormControl('', [Validators.required]);
  landlordTelephoneFormControl = new FormControl('', [Validators.required]);
  processingTelephoneFormControl = new FormControl('', [Validators.required]);
  processingEmailFormControl = new FormControl('', [Validators.required]);
  managerNameFormControl = new FormControl('', [Validators.required]);
  managerNumberFormControl = new FormControl('', [Validators.required]);
  debtorsNameFormControl = new FormControl('', [Validators.required]);
  debtorsTelephoneFormControl = new FormControl('', [Validators.required]);
  debtorsEmailFormControl = new FormControl('', [Validators.required]);
  debtorOtherFormControl = new FormControl('', [Validators.required]);
  integrationFormControl = new FormControl('', [Validators.required]);
  debicheckMonthlyValueFormControl = new FormControl('',[Validators.required]);
  debicheckMonthlyVolumeFormControl = new FormControl('',[Validators.required]);
  debicheckSuccessRateFormControl = new FormControl('',[Validators.required]);
  debicheckExistingDisputeFormControl = new FormControl('',[Validators.required]);
  debicheckTrackingDaysFormControl = new FormControl('',[Validators.required]);
  eftMonthlyValueFormControl = new FormControl('',[Validators.required]);
  eftMonthlyVolumesFormControl = new FormControl('',[Validators.required]);
  eftSuccessRateFormControl = new FormControl('',[Validators.required]);
  eftExistingDisputeFormControl = new FormControl('',[Validators.required]);
  seftMonthlyValueFormControl = new FormControl('',[Validators.required]);
  seftMonthlyVolumesFormControl = new FormControl('',[Validators.required]);
  seftSuccessRateFormControl = new FormControl('',[Validators.required]);
  debitCardValueCollectedMonthlyFormControl = new FormControl('',[Validators.required]);
  creditCardValueCollectedMonthlyFormControl = new FormControl('',[Validators.required]);
  currentServiceProviderFormControl = new FormControl('',[Validators.required]);
  debitCardTransactionCommissionFormControl = new FormControl('',[Validators.required]);
  creditCardTransactionCommissionFormControl = new FormControl('',[Validators.required]);
  collectedMonthlyFormControl = new FormControl('',[Validators.required]);
  collectedMonthlyRateFormControl = new FormControl('',[Validators.required]);
  collectedElectronicallyFormControl = new FormControl('',[Validators.required]);
  debicheckSubmittedMonthlyFormControl = new FormControl('',[Validators.required]);
  debicheckMaxiumumValueFormControl = new FormControl('',[Validators.required]);
  cardEstimatedMonthlyFormControl = new FormControl('',[Validators.required]);
  cardAverageValueFormControl = new FormControl('',[Validators.required]);
  cardTransactionalValueFormControl = new FormControl('',[Validators.required]);
  cardOptionFormControl = new FormControl('',[Validators.required]);
  mechanismFormControl = new FormControl('', [Validators.required]);

  displayVatForm: boolean = false; 

  toggleDisplayVat() {
    this.displayVatForm = this.applicationForm.get('vatRegisteredBool')?.value === true;
  }

  matcher = new MyErrorStateMatcher();
  nameMatcher = new MyErrorStateMatcher();
  registrationNumberMatcher = new MyErrorStateMatcher();
  tradingNameMatcher = new MyErrorStateMatcher();
  physicalAddressMatcher = new MyErrorStateMatcher();
  postalAddressMatcher = new MyErrorStateMatcher();
  otherRegulatoryBodyMatcher = new MyErrorStateMatcher();
  regulatoryBodyMatcher = new MyErrorStateMatcher();
  otherRegistrationNumberMatcher = new MyErrorStateMatcher();
  shareholderMatcher = new MyErrorStateMatcher();
  numberOfShareholderMatcher = new MyErrorStateMatcher();
  legalEntityNameMatcher = new MyErrorStateMatcher();
  legalEntityStructureMatcher = new MyErrorStateMatcher();
  numberOfSignaturesrMatcher = new MyErrorStateMatcher();
  otherReasonMatcher = new MyErrorStateMatcher();
  debtorOtherMatcher = new MyErrorStateMatcher();

  entityDescription: string = '';
  stepIndex: number = 0;


  // applicationForm: FormGroup = new FormGroup({
  //   legalEntityName : new FormControl('', [Validators.required]),
  //   legalEntityRegistrationNumber : new FormControl('', [Validators.required]),
  //   legalEntityTradingName : new FormControl('', [Validators.required]),
  //   legalEntityPhysicalAddress : new FormControl('', [Validators.required]),
  //   legalEntityPostalAddress : new FormControl('', [Validators.required]),
  //   vatRegisteredBool : new FormControl (false),
  //   vatRegistrationNumber : new FormControl('', [Validators.required]),
  //   industryDescription : new FormControl('', [Validators.required]),
  //   industryRegulatoryBodyId: new FormControl('', [Validators.required]),
  //   regulatoryBodyRegistrationNumber : new FormControl('',[Validators.required]),
  //   otherRegulatoryBodyFormControl :  new FormControl('', [Validators.required]),
  //   regulatoryBodyFormControl :  new FormControl('', [Validators.required]),
  //   otherRegistrationNumberFormControl :  new FormControl('', [Validators.required]),
  //   numberOfRepsFormControl : new FormControl('', [Validators.required]),
  //   representativesFormArray : new FormControl('', [Validators.required]),
  //   legalEntityDependants: this.formBuilder.array([]),
  // });

  // applicationForm: FormGroup = new FormGroup ({
  //   shareholderFormControl: new FormControl('', [Validators.required]),
  //   numberOfShareholderFormControl: new FormControl('', [Validators.required]),
  //   shareholdersFormArray: new FormArray<FormGroup>([]),
  //   shareholders: this.formBuilder.array([]),
  //   authorizedSignatories: this.formBuilder.array([]),

  // });
  // threeFormGroup: FormGroup = new FormGroup ({
  //   masterUserFullName: new FormControl('', [Validators.required]),
  //   masterUserIdnumber: new FormControl('', [Validators.required]),
  //   masterUserEmail: new FormControl('', [Validators.required]),
  //   masterUserMobileNumber: new FormControl('', [Validators.required]),
  //   masterUserCapacity: new FormControl('', [Validators.required]),
  // });
  // fourFormGroup: FormGroup = new FormGroup ({
  //   branchOutletBoolean: new FormControl(false),
  //   mandateTypeId: new FormControl('', [Validators.required]),
  //   callCenterBoolean: new FormControl(false),


  // });
  // fiveFormGroup: FormGroup = new FormGroup ({
    
  // })
  // sixFormGroup: FormGroup = new FormGroup ({
    
  // });
  // sevenFormGroup: FormGroup = new FormGroup ({
    
  // });
  // eightFormGroup: FormGroup  = new FormGroup({

  // });
  // nineFormGroup: FormGroup  = new FormGroup({

  // });
  // tenFormGroup: FormGroup  = new FormGroup({

  // });
  // elevenFormGroup: FormGroup  = new FormGroup({

  // });
  // twelveFormGroup: FormGroup = new FormGroup({

  // });
  

  constructor(private dataService: DataService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private http:HttpClient) {

      this.applicationForm = this.formBuilder.group({
        legalEntityName: [''],
        legalEntityRegistrationNumber: [''],
        legalEntityTradingName: [''],
        legalEntityPhysicalAddress: [''],
        legalEntityPostalAddress: [''],
        vatRegistrationNumber: [''],
        industryDescription: [''],
        regulatoryBodyRegistrationNumber: [''],
        industryRegulatoryBodyId: [''],
        vatRegisteredBool: [false],
        legalEntityDependants: this.formBuilder.array([]),
        branchOutletBoolean: [false],
        callCenterBoolean: [false],
        existingPaymentProviderBoolean: [false],
        mandateTypeId: ['' ],
        masterUserFullName: [''],
        masterUserIdnumber: [''],
        masterUserEmail: [''],
        masterUserMobileNumber: [''],
        masterUserCapacity: [''],
    //  masterUserDependantBit: [false], 
        shareholders: this.formBuilder.array([]),
        authorizedSignatories: this.formBuilder.array([]),
    //  selectedCollectionTypes: this.fb.array([]),
        aetEmail: [''],
        processingMonthlyLimit: ['' ],
  
       cardPayment: this.formBuilder.group({
        monthlyDebitValue: [''],
        monthlyCreditValue: [''],
        currentServiceProvider: [''],
        debitCommission: [''],
        creditCommission: ['']
      }),
      cash: this.formBuilder.group({
        monthlyValue: [''],
        monthlyVolume: [''],
        successRate: [''],
        electronicBoolean: [false]
      }),
      debiCheck: this.formBuilder.group({
        monthlyValue: [''],
        monthlyVolume: [''],
        successRate: [''],
        existingDispute: [''],
        averageTrackingDaysUsed: ['']
      }),
      eft: this.formBuilder.group({
        monthlyValue: [''],
        monthlyVolume: [''],
        successRate: [''],
        existingDispute: ['']
      }),
      seft: this.formBuilder.group({
        monthlyValue: [''],
        monthlyVolume: [''],
        successRate: ['']
      }),
      debiCheckProducts: this.formBuilder.group({
        debiCheckProductId: [0],
        authenticationMechanismsId: [null],
        selectedProductId: [null],
        totalValueMonthly: [null],
        maximumSingleCollection: [null]
      }),
      debitCreditPayments: this.formBuilder.group({
        debitCreditPaymentId: [0],
        selectedProductId: [null],
        totalMonthlyValue: [null],
        averageTransactionalValue: [null],
        balanceEnquiryBool: [false],
        budgetFacilityBool: [false],
        cashBackatPosBool: [false],
        maximumSingleTransactionalValue: [null]
      }),
      socialGrantEfts: this.formBuilder.group({
        socialGrantEftId: [0],
        selectedProductId: [null],
        monthlyValue: [null]
      }),
      avs: this.formBuilder.group({
        avId: [0],
        selectedProductId: [null],
        avsRNumberofRequestsMonthly: [null],
        numberofRequestsMonthly: [null]
      }),
      allpsManagementPlatforms: this.formBuilder.group({
        allpsManagementPlatformId: [0],
        selectedProductId: [null],
        expectedMonthlyRequests: [null],
        feePayableAuthenticationSuccess: [null],
        feePayableDocumentCollection: [null],
        automaticExpiration: [false],
        automaticRevoke: [false]
      }),
      deviceSelections: this.formBuilder.group({
        deviceSelectionId: [0],
        selectedProductId: [null],
        numberofFixedDevices: [null],
        numberofMobileDevices: [null]
      }),
      eftDebits: this.formBuilder.group({
        eftDebitId: [0],
        selectedProductId: [null],
        totalValue: [null],
        maximumSingleCollection: [null]
      }),
      accountForm1: this.formBuilder.group({
        accountHolderName: [''],
        accountNumber: [''],
        accountTypeId: [''],
        bankNameId: [''],
        branchName: [''],
        debitBool: [true],
        aetBool: [false],
        backUpDebitBool: [false]
      }),
      accountForm2: this.formBuilder.group({
        accountHolderName: [''],
        accountNumber: [''],
        accountTypeId: [''],
        bankNameId: [''],
        branchName: [''],
        minimumDailyTransferLimit: [null],
        debitBool: [false],
        aetBool: [true],
        backUpDebitBool: [false]
      }),
      accountForm3: this.formBuilder.group({
        accountHolderName: [''],
        accountNumber: [''],
        accountTypeId: [''],
        bankNameId: [''],
        branchName: [''],
        debitBool: [false],
        aetBool: [false],
        backUpDebitBool: [true]
  
      }),
  
    
    });

    const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
          this.entityDescription = navigation.extras.state['entityDescription'];
        }
      }

      ngOnInit(): void {

        this.applicationForm.get('vatRegisteredBool')?.valueChanges.subscribe(() => {
          this.toggleDisplayVat();
        });
        
    
        this.applicationId = +this.route.snapshot.paramMap.get('applicationId')!;
        if (this.applicationId) {
          this.loadApplicationData();
          // this.populateFormFromAPI(this.applicationId);
        }
        this.loadReegulatoryBodies();
        this.loadIdentificationTypes();
        this.loadCollectionTypes();

        this.dataService.GetApplication(this.applicationId).subscribe({
          next: (application: Application) => {
            // this.applicationForm.patchValue(application);
            this.loadDependants(application.legalEntityDependants);
            this.loadAuthorizedSignatories(application.authorizedSignatories);
            this.loadShareholders(application.shareholders);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error fetching application details', error);
            this.isLoading = false;
          }
        });  
      }

//       populateFormFromAPI(applicationId: number): void {
//         this.dataService.GetApplication(applicationId).subscribe(value => {
//           console.log('API response:', value);
//           this.applicationForm.patchValue({
//             legalEntityName: value.legalEntityName,
//             legalEntityRegistrationNumber: value.legalEntityRegistrationNumber,
//             legalEntityTradingName: value.legalEntityTradingName,
//             legalEntityPhysicalAddress: value.legalEntityPhysicalAddress,
//             legalEntityPostalAddress: value.legalEntityPostalAddress,
//             vatRegisteredBool: value.vatRegisteredBool,
//             vatRegistrationNumber: value.vatRegistrationNumber,
//             industryRegulatoryBodyId: value.industryRegulatoryBodyId,
//             otherRegistrationNumber: value.otherRegistrationNumber,
//             otherRegulatoryBody: value.otherRegulatoryBody,
//             industryDescription: value.industryDescription,
//             regulatoryBodyRegistrationNumber : value.regulatoryBodyRegistrationNumber,
//             masterUserFullName: value.masterUserFullName,
//             masterUserIdnumber: value.masterUserIdnumber,
//             masterUserEmail: value.masterUserEmail,
//             masterUserMobileNumber: value.masterUserMobileNumber,
//             masterUserCapacity: value.masterUserCapacity,
//             branchOutletBoolean: value.branchOutletBoolean,
//             callCenterBoolean: value.callCenterBoolean,
//             existingPaymentProviderBoolean: value.existingPaymentProviderBoolean,
//             aetEmail: value.aetEmail,
//             processingMonthlyLimit: value.pr,
//           });
//   });
// }
      loadIdentificationTypes() {
        this.dataService.GetAllIdentificationTypes().subscribe(data => {
          console.log('IdentificationType', data)
          this.identificationType = data;
        },
        error => {
          console.error('Error loading Identification Types', error);
        });
    
      }
      loadReegulatoryBodies(): void {
        this.dataService.GetAllIndustryRegulatoryBodies().subscribe(data => {
          console.log('InustryRegulatoryBody', data)
          this.industryRegulatoryBody = data;
        },
        error => {
          console.error('Error loading Industry Regulatory Bodies', error);
        });
      }
      loadCollectionTypes(): void {
        this.dataService.GetAllCollectionTypes().subscribe(
          (data: any[]) => {
            console.log('CollectionType ', data)
            this.collectionTypes = data;
          },
          (error: any) => {
            console.error('Error loading collection types', error);
          }
        );
      }

      numberOfRepsChanged(): void {
        const numberOfRepsParsed : number =  this.applicationForm.value.numberOfRepsFormControl;
        while (this.representativesFormArray.length !== numberOfRepsParsed) {
          if (this.representativesFormArray.length < numberOfRepsParsed) {
            this.representativesFormArray.push(this.createRepresentativeFormGroup());
          } else {
            this.representativesFormArray.removeAt(this.representativesFormArray.length - 1);
          }
        }
      }

      loadApplicationData(): void {
        // if (this.applicationId) {
        //   this.dataService.GetApplication(this.applicationId).subscribe(
        //     data => {
        //       this.applicationForm.patchValue(data);
        //     },
        //     error => {
        //       console.error('Error loading application data', error);
        //     }
        //   );
        // }
    

    this.dataService.GetAllLegalEntityTypes().subscribe(data => {
      console.log('LegalEntityTypes', data)
      this.legalEntityTypes = data;
    },
    error => {
      console.error('Error loading Legal Entity Types', error);
    });
    this.dataService.GetAllLegalEntityStructures().subscribe(data => {
     
      this.legalEntityStructures = data;
    },
    error => {
      console.error('Error loading Legal Entity Types', error);
    });
    this.dataService.GetAllMandateTypes().subscribe(data => {
      console.log('MandateTypes', data)
      this.mandateTypes = data;
    },
    error => {
      console.error('Error loading Mandate Types', error);
    });


    this.dataService.GetAllCollectionTypes().subscribe(data => {
      console.log('CollectionTypes', data)
      this.collectionTypes = data;
    },
    error => {
      console.error('Error loading Existing Collection Types', error);
    });

//Alternative supplier
this.dataService.GetAllAlternativeSupplierReasons().subscribe(data => {
  console.log('AlternativeSupplierReason', data)
  this.alternativeSupplierReason = data;
},
error => {
  console.error('Error loading Alternative Supplier Reason', error);
});

//Bank Name
this.dataService.GetAllBankNames().subscribe(data => {
  console.log('BankName', data)
  this.bankName = data;
},
error => {
  console.error('Error loading Bank Name', error);
});


//Account Type
this.dataService.GetAllAccountTypes().subscribe(data => {
  console.log('AccountType', data)
  this.accountType = data;
},
error => {
  console.error('Error loading Alternative Supplier Reason', error);
});


//Debtor
this.dataService.GetAllDebtorManagementSystems().subscribe(data => {
  console.log('DebtorManagementSystem', data)
  this.debtorManagementSystem= data;
},
error => {
  console.error('Error loading Debtor Management System', error);
});

//Product
this.dataService.GetAllProducts().subscribe(data => {
  console.log('Product', data)
  this.product= data;
},
error => {
  console.error('Error loading Debtor Management System', error);
});

    this.shareholderNumber.valueChanges.subscribe((numberOfShareholder) => {
      if (numberOfShareholder !== null && numberOfShareholder !== undefined) {
        const numberofShareholderParsed = parseInt(numberOfShareholder, 10);
        if (!isNaN(numberofShareholderParsed)) {
          while (this.shareholdersFormArray.length !== numberofShareholderParsed) {
            if (this.shareholdersFormArray.length < numberofShareholderParsed) {
              this.shareholdersFormArray.push(this.createShareholderFormGroup());
            } else {
              this.shareholdersFormArray.removeAt(this.shareholdersFormArray.length - 1);
            }
          }
        }
      }
    });

    this.numberOfSignaturesFormControl.valueChanges.subscribe((numberOfSignatures) => {
      if (numberOfSignatures !== null && numberOfSignatures !== undefined) {
        const numberOfSignaturesParsed = parseInt(numberOfSignatures, 10);
        if (!isNaN(numberOfSignaturesParsed)) {
          while (this.signaturesFormArray.length !== numberOfSignaturesParsed) {
            if (this.signaturesFormArray.length < numberOfSignaturesParsed) {
              this.signaturesFormArray.push(this.createSignatureFormGroup());
            } else {
              this.signaturesFormArray.removeAt(this.signaturesFormArray.length - 1);
            }
          }
        }
      }
    });
  }



  createRepresentativeFormGroup(): FormGroup {
    return new FormGroup({
      fullName: new FormControl('', Validators.required),
      incomeTaxNumber: new FormControl('', Validators.required),
      identificationType: new FormControl('', Validators.required),
    });
  }

  createShareholderFormGroup(): FormGroup {
    return new FormGroup({
      legalEnityName: new FormControl('', Validators.required),
      legalEntityStructure: new FormControl('', Validators.required),
    });
  }

  createSignatureFormGroup(): FormGroup {
    return new FormGroup({
      signatureOfRep: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      idNumber: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      emailAddress: new FormControl('', Validators.required),
      capacity: new FormControl('', Validators.required),
    });
  }

  createOtherSupplierReasonGroup(): FormGroup {
    return this.formBuilder.group({
      AlternativeSupplierReasonsId: [null],  // Initialize as single value, not array
      OtherDescription: ['']
    });
  }

  loadDependants(dependants: LegalEntityDependant[]): void {
    console.log(this.applicationForm);
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.clear();

    dependants.forEach(dependant => {
      dependantFormArray.push(this.formBuilder.group({
        legalEntityDependantId: [dependant.legalEntityDependantId],
        dependantsFullName: [dependant.dependantsFullName, Validators.required],
        dependantsIncomeTaxNumber: [dependant.dependantsIncomeTaxNumber],
        identificationTypeId: [dependant.identificationTypeId]
      }));
    });
  }

  

  loadAuthorizedSignatories(signatories: AuthorizedSignatory[]): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.clear();

    signatories.forEach(signatory => {
      signatoryFormArray.push(this.formBuilder.group({
        signatoriesEmailAddress: [signatory.signatoriesEmailAddress, Validators.required],
        signatoriesCapacity: [signatory.signatoriesCapacity, Validators.required],
        signatoriesCellNumber: [signatory.signatoriesCellNumber],
        signatoriesIdentificationNumber: [signatory.signatoriesIdentificationNumber],
        legalDependantBit: [signatory.legalDependantBit]
      }));
    });
  }

  loadShareholders(shareholders: Shareholder[]): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.clear();

    shareholders.forEach(shareholder => {
      shareholderFormArray.push(this.formBuilder.group({
        shareholderLegalEntityName: [shareholder.shareholderLegalEntityName, Validators.required],
        legalEntityStructureId: [shareholder.legalEntityStructureId, Validators.required]
      }));
    });
  }

  addDependant(): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.push(this.formBuilder.group({
      legalEntityDependantId: [0], // Default value for new dependants
      dependantsFullName: [''],
      dependantsIncomeTaxNumber: [''],
      identificationTypeId: ['']
    }));
  }

  removeDependant(index: number): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.removeAt(index);
  }

  addAuthorizedSignatory(): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.push(this.formBuilder.group({
      signatoriesEmailAddress: ['', Validators.required],
      signatoriesCapacity: ['', Validators.required],
      signatoriesCellNumber: [''],
      signatoriesIdentificationNumber: [''],
      legalDependantBit: [false]
    }));
  }

  removeAuthorizedSignatory(index: number): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.removeAt(index);
  }

  addShareholder(): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.push(this.formBuilder.group({
      shareholderLegalEntityName: ['', Validators.required],
      legalEntityStructureId: ['', Validators.required]
    }));
  }

  removeShareholder(index: number): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.removeAt(index);
  }

  onAlternativeSupplierReasonsChange(event: any, reason: FormGroup): void {
    const selectedValues = event.value;
    reason.get('AlternativeSupplierReasonsId')?.setValue(selectedValues);

    if (selectedValues.includes(7) && !reason.get('OtherDescription')) {
      reason.addControl('OtherDescription', this.formBuilder.control(''));
    } else if (!selectedValues.includes(7) && reason.get('OtherDescription')) {
      reason.removeControl('OtherDescription');
    }
  }



  get legalEntityDependants(): FormArray {
    return this.applicationForm.get('legalEntityDependants') as FormArray;
  }

  get authorizedSignatories(): FormArray {
    return this.applicationForm.get('authorizedSignatories') as FormArray;
  }

  get shareholders(): FormArray {
    return this.applicationForm.get('shareholders') as FormArray;
  }

  get representativeFormGroups(): FormGroup[] {
    return this.representativesFormArray.controls as FormGroup[];
  }

  get shareholderFormGroups(): FormGroup[] {
    return this.shareholdersFormArray.controls as FormGroup[];
  }

  get signatureFormGroups(): FormGroup[] {
    return this.signaturesFormArray.controls as FormGroup[];
  }

  get otherSupplierReasons(): FormArray {
    return this.applicationForm.get('OtherSupplierReasons') as FormArray;
  }

//upload document
  get fileInput(): HTMLInputElement {
    return document.getElementById('fileInput') as HTMLInputElement;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push({
        file: files[i],
        name: files[i].name,
        progress: 0,
        uploading: false
      });
    }
    // Save updated files to localStorage or elsewhere as needed
  }

  uploadFile(file: UploadFile): void {
    file.uploading = true;
    if (this.folderId) {
      const formData = new FormData();
      formData.append('file', file.file);
      formData.append('folderId', this.folderId);

      this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
        response => {
          file.uploading = false;
          file.progress = 100;
          this.fileLinks.push({ name: file.name, link: response.link });
        },
        error => {
          console.error('Error uploading file:', error);
          file.uploading = false;
        }
      );
    }
  }

  removeFile(index: number): void {
    if (confirm('Are you sure you want to cancel this upload?')) {
      this.selectedFiles.splice(index, 1);
      // Update storage or UI as needed
    }
  }

 

  uploadAll(): void {
    this.selectedFiles.forEach(file => {
      if (!file.uploading) {
        this.uploadFile(file);
      }
    });
  }


  removeAll(): void {
    if (confirm('Are you sure you want to cancel all uploads?')) {
      this.selectedFiles = [];
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }
   
 
 // 

saveProgress(): void {
  if (this.applicationId && this.applicationId > 0) {
    const formValue = this.applicationForm.value;

    // Extract form values and create a partial Application object
    const vatRegisteredBool = formValue.vatRegisteredBool === 'true';

    const application: Partial<Application> = {
      legalEntityName: this.applicationForm.get('legalEntityName')?.value,
      legalEntityRegistrationNumber: this.applicationForm.get('legalEntityRegistrationNumber')?.value,
      legalEntityTradingName: this.applicationForm.get('legalEntityTradingName')?.value,
      legalEntityPhysicalAddress: this.applicationForm.get('legalEntityPhysicalAddress')?.value,
      legalEntityPostalAddress: this.applicationForm.get('legalEntityPostalAddress')?.value,
      vatRegisteredBool: vatRegisteredBool,
      vatRegistrationNumber: this.applicationForm.get('vatRegistrationNumber')?.value,
      industryDescription: this.applicationForm.get('industryDescription')?.value,
      industryRegulatoryBodyId: this.applicationForm.get('industryRegulatoryBodyId')?.value,
      regulatoryBodyRegistrationNumber: this.applicationForm.get('regulatoryBodyRegistrationNumber')?.value,
      // Map other fields from the form to DTO
    };

    // Log the payload for debugging purposes
    console.log('Payload:', application);

    // Call the data service to update the application
    this.dataService.updateApplication(this.applicationId, application).subscribe(
      response => {
        // Log success message and handle response if needed
        console.log('Application saved successfully', response);
        // Optionally, provide user feedback here (e.g., success message, redirect)
      },
      error => {
        // Log the full error response
        console.error('Error saving application', error);

        // Extract and log error details
        if (error.status === 400) {
          console.error('Bad Request - Possibly validation issues:', error.error);
        } else if (error.status === 404) {
          console.error('Not Found - Check if the endpoint is correct:', error.error);
        } else if (error.status === 500) {
          console.error('Server Error - Issue with the server:', error.error);
        } else {
          console.error('Unexpected Error:', error.error);
        }
      }
    );
  } else {
    console.error('Invalid application ID');
  }
}

  nextStep(){
    if(this.stepIndex < 12)
    this.saveProgress();
    this.stepIndex++;
    this.stepper.next();
  }

  saveAndContinue() {
    this.saveProgress();
    this.nextStep();
  }

  loadProgress() {
    const savedProgress = localStorage.getItem('applicationProgress');
  if (savedProgress) {
    const { stepIndex, formValues } = JSON.parse(savedProgress);
    this.stepIndex = stepIndex;
    // this.applicationForm.patchValue(formValues);
    this.selectedFiles = formValues.files.map((file: any) => ({
      file: new File([], file.name), // Placeholder for File object
      name: file.name,
      progress: 0,
      uploading: file.uploading
    }));
  }
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      const application: Application = this.applicationForm.value;
      application.applicationId = this.applicationId;
      application.existingCollections = Array.from(this.selectedCollectionTypes).map(typeId => {
        const existingCollections: ExistingCollections = {
          existingCollectionsId: 0,
          collectionTypeId: typeId,
          applicationId: this.applicationId,
          application: null,
          cardPayments: typeId === 4 ? [this.applicationForm.get('cardPayment')!.value] : [],
          cashes: typeId === 5 ? [this.applicationForm.get('cash')!.value] : [],
          debiChecks: typeId === 1 ? [this.applicationForm.get('debiCheck')!.value] : [],
          efts: typeId === 2 ? [this.applicationForm.get('eft')!.value] : [],
          sefts: typeId === 3 ? [this.applicationForm.get('seft')!.value] : []
        };
        return existingCollections;
      });
    }

  
  
}


}
