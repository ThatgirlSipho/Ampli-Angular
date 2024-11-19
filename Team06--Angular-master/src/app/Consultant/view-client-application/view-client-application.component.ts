import { Component, OnInit,HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,FormControl, AbstractControl  } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Application, LegalEntityDependant, IdentificationType,ExistingCollections, IndustryRegulatoryBody, LegalEntityTypes, AuthorizedSignatory, Shareholder, CollectionType, Seft,Eft, CardPayment,Cash, DebiCheck,Product, AuthenticationMechanisms, SelectedProduct, MandateTypes,ProcessingCode, DebtorManagementSystem, LegalEntityStructures, AlternativeSupplierReason } from 'src/app/services/model';
import { MatSelectChange } from '@angular/material/select';
import { MatStepper} from '@angular/material/stepper';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AlternativeSupplier } from 'src/app/shared/sharonModelClasses/shared/AlternativeSupplier';
import PlaceResult = google.maps.places.PlaceResult;
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
//import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentSideBarComponent } from 'src/app/CommentSideBar/CommentSideBar.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssistService } from 'src/app/services/assist.service';
import { AssistModalComponent } from 'src/app/assist-modal/assist-modal.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-view-client-application',
  templateUrl: './view-client-application.component.html',
  styleUrls: ['./view-client-application.component.css']
})
export class ViewClientApplicationComponent implements OnInit {

  applicationForm: FormGroup;
  identificationTypes: IdentificationType[] = [];
  legalEntityTypes: LegalEntityTypes[] = [];
  legalEntityStructures: LegalEntityStructures[]=[]
  applicationId = 1;
  isLoading = false;
  industryRegulatoryBodies: IndustryRegulatoryBody[] = [];
  collectionTypes: CollectionType[] = [];
  mandateTypes: MandateTypes [] = []; //code added by ropa and njabulo
  selectedCollectionTypes=new Set<number>();
  selectedProducts = new Set<number>();
  products: Product[] = [];
  authenticationMechanisms: AuthenticationMechanisms[]=[];
  banks: any[] = [];
  accountTypes: any[] = [];
  requiredDocuments: any[] = [];
  entityDescription: string = '';
  folderId:string ='';
  isDragOver = false;
  entityId:number=1;
  sameAddress: boolean = false;
  debtorManagementSystems:DebtorManagementSystem[]=[];
applicationStatusId!:number;
  alternativeSupplierReasons:AlternativeSupplierReason[]=[]
documents:any[]=[];
  stepIndex: number = 0;
  selectedDocumentIds: number[] = [];
  disableSubmit: boolean = false;
  isSubmitDisabled: boolean = true;
  maxDate: Date = new Date();
  legalDescription: string='';
  eftCredits: any[] = [];
  eWalletOptions: any[] = [];
  selectedEftCreditId: number | null = null;
  selectedEwalletOptionId: number | null = null;
  errorMessage: string | null = null;
  missingValues: string[] = [];
  accountForm: FormGroup;
  accounts: any[] = [];
  selectedAccount: any = null;
  capitecAetAccount: any = null;
  showAccountForm: boolean = false;
  newlyAddedAccount:{ [index: number]: any } = {};
  selectedAccountId:any;
  radioOptions:any;
  previousAccount: { [index: number]: any } = {}
  @ViewChild('commentSidebar') commentSidebar!: CommentSideBarComponent;
  @ViewChild('stepper', {static: false}) stepper!: MatStepper;
  @ViewChild('physicalAddressInput') physicalAddressInput!: ElementRef;
  @ViewChild('postalAddressInput') postalAddressInput!: ElementRef;
  constructor(private dataService: DataService, private fb: FormBuilder,private route: ActivatedRoute, 
    private router: Router, private http: HttpClient, private snackBar: MatSnackBar,
  private location:Location,private assistService: AssistService, private dialog: MatDialog) {
    this.accountForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankNameId: ['', Validators.required],
      branchName: ['', Validators.required],
      accountTypeId: ['', Validators.required]
    });
    this.applicationForm = this.fb.group({
      legalEntityDependants: this.fb.array([]),
      collectionTypeIds: [[]],
      productIds:[[]],
      legalEntityName: [''],
      legalEntityRegistrationNumber: [''],
      legalEntityTradingName: [''],
      legalEntityPhysicalAddress: [''],
      legalEntityPostalAddress: [''],
      vatRegistrationNumber: [''],
      industryDescription: [''],
      regulatoryBodyRegistrationNumber: [''],
      industryRegulatoryBodyId: [''],
      vatRegisteredBool: [],
      branchOutletBoolean: [],
      callCenterBoolean: [],
      existingPaymentProviderBoolean: [false],
      mandateTypeId: ['' ],
      masterUserFullName: [''],
      masterUserIdnumber: [''],
      masterUserEmail: [''],
      masterUserMobileNumber: [''],
      masterUserCapacity: [''],
      otherIndustryBody: [''],
      masterUserDependantBit: [false], 
      shareholders: this.fb.array([]),
      authorizedSignatories: this.fb.array([]),
      processingcodes: this.fb.array([]),
      otherSupplierReasons: this.fb.array([]),
      //numberofFixedDevices: [null],
      //numberofMobileDevices: [null],
  // selectedCollectionTypes: this.fb.array([]),
      aetEmail: [''],
      monthlyProcessingLimit: ['' ],

     cardPayment: this.fb.group({
      monthlyDebitValue: [''],
      monthlyCreditValue: [''],
      currentServiceProvider: [''],
      debitCommission: [''],
      creditCommission: ['']
    }),
    cash: this.fb.group({
      monthlyValue: [''],
      monthlyVolume: [''],
      successRate: [''],
      electronicBoolean: [false]
    }),
    debiCheck: this.fb.group({
      monthlyValue: [''],
      monthlyVolume: [''],
      successRate: [''],
      existingDispute: [''],
      averageTrackingDaysUsed: ['']
    }),
    eft: this.fb.group({
      monthlyValue: [''],
      monthlyVolume: [''],
      successRate: [''],
      existingDispute: ['']
    }),
    seft: this.fb.group({
      monthlyValue: [''],
      monthlyVolume: [''],
      successRate: ['']
    }),

    /*  deviceSelections: this.fb.group({
      deviceSelectionId: [0],
      selectedProductId: [null],
      numberofFixedDevices: [null],
      numberofMobileDevices: [null]
    }), */


    debiCheckProducts: this.fb.group({
      debiCheckProductId: [0],
      authenticationMechanismsId: [null],
      selectedProductId: [null],
      totalValueMonthly: [null],
      maximumSingleCollection: [null]
    }),
    debitCreditPayments: this.fb.group({
      debitCreditPaymentId: [0],
      selectedProductId: [null],
      totalMonthlyValue: [null],
      averageTransactionalValue: [null],
      balanceEnquiryBool: [false],
      budgetFacilityBool: [false],
      cashBackatPosBool: [false],
      maximumSingleTransactionalValue: [null]
    }),
    socialGrantEfts: this.fb.group({
      socialGrantEftId: [0],
      selectedProductId: [null],
      monthlyValue: [null]
    }),
    avs: this.fb.group({
      avId: [0],
      selectedProductId: [null],
      avsRNumberofRequestsMonthly: [null],
      numberofRequestsMonthly: [null]
    }),
    allpsManagementPlatforms: this.fb.group({
      allpsManagementPlatformId: [0],
      selectedProductId: [null],
      expectedMonthlyRequests: [null],
      feePayableAuthenticationSuccess: [null],
      feePayableDocumentCollection: [null],
      automaticExpiration: [null],
      automaticRevoke: [null]
    }),
    eftDebits: this.fb.group({
      eftDebitId: [0],
      selectedProductId: [null],
      totalValue: [null],
      maximumSingleCollection: [null]
    }),
    eftcreditDetail: this.fb.group({
      deliveryAddress:[''],
      eftcreditDetailId:[0],
      ewalletOptionId:[null],
      numberOfCards:[null],
      numberOfPinMailers:[null],
      selectedProductId: [null],
      eftCreditId:[null]
    }),
    accountForm1: this.fb.group({
      accountHolderName: [''],
      accountNumber: [''],
      accountTypeId: [''],
      bankNameId: [''],
      branchName: [''],
      debitBool: [true],
      aetBool: [false],
      backUpDebitBool: [false]
    }),
    accountForm2: this.fb.group({
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
   

  
  });
  

  }

 

    onAutocompleteSelected(event: any, addressType: string): void {
      const place: PlaceResult = event as PlaceResult;
      console.log('onAutocompleteSelected: ', place);
      if (addressType === 'physical') {
        this.applicationForm.patchValue({ legalEntityPhysicalAddress: place.formatted_address });
      } else  {
        this.applicationForm.patchValue({ legalEntityPostalAddress: place.formatted_address });
      }
    }
  
    onAddressChange(event: any, addressType: string): void {
      const place: PlaceResult = event as PlaceResult;
      console.log('onAddressChange: ', place);
    }
  
    copyAddress(checked: boolean): void {
      if (checked) {
        const physicalAddress = this.applicationForm.get('legalEntityPhysicalAddress')?.value;
        this.applicationForm.patchValue({ legalEntityPostalAddress: physicalAddress });
      }
    }
  
    onProcessingCodeAddressSelected(event: any, index: number): void {
      const place: PlaceResult = event as PlaceResult;
      this.processingcodes.at(index).patchValue({ physicalAddress: place.formatted_address });
    }
  
    onProcessingCodeAddressChange(event: any, index: number): void {
      const place: PlaceResult = event as PlaceResult;
      console.log('Address Changed: ', place);
    }
  
    
  addSupplierReason(): void {
    const supplierReasonGroup = this.fb.group({
      alternativeSupplierReasonsId: [null], // Validators.required
      otherDescription: ['']
    });
    this.otherSupplierReasons.push(supplierReasonGroup);
    this.onAlternativeSupplierReasonsChange(supplierReasonGroup);
  }

    onAlternativeSupplierReasonsChange(supplierReasonGroup: FormGroup): void {
    supplierReasonGroup.get('alternativeSupplierReasonsId')?.valueChanges.subscribe((values: number[]) => {
      if ((values ?? []).includes(7)) {
        supplierReasonGroup.get('otherDescription')?.setValidators([]); //Validators.required
      } else {
        supplierReasonGroup.get('otherDescription')?.clearValidators();
      }
      supplierReasonGroup.get('otherDescription')?.updateValueAndValidity();
    });
  }


  transformFormData(formData: any): any {
    formData.otherSupplierReasons = formData.otherSupplierReasons
      .map((reason: any) => {
        // Ensure alternativeSupplierReasonsId is an array
        const ids = Array.isArray(reason.alternativeSupplierReasonsId)
          ? reason.alternativeSupplierReasonsId
          : [];
  
        return ids.map((id: number) => ({
          alternativeSupplierReasonsId: id,
          otherDescription: id === 7 ? reason.otherDescription : null
        }));
      })
      .flat();
  
    return formData;
  }
  
  
  /* transformFormData(formData: any): any {
    formData.otherSupplierReasons = formData.otherSupplierReasons.map((reason: any) => {
      return reason.alternativeSupplierReasonsId.map((id: number) => ({
        alternativeSupplierReasonsId: id,
        otherDescription: id === 7 ? reason.otherDescription : null
      }));
    }).flat();

    return formData;
  } */




  onIndustryRegulatoryBodyChange(): void {
    this.applicationForm.get('industryRegulatoryBodyId')?.valueChanges.subscribe(value => {
      if (value == 5) {
        this.applicationForm.get('otherIndustryBody')?.setValidators([]); //Validators.required
      } else {
        this.applicationForm.get('otherIndustryBody')?.clearValidators();
      }
      this.applicationForm.get('otherIndustryBody')?.updateValueAndValidity();
    });
  }


  onVatRegisteredChange(): void {
    this.applicationForm.get('vatRegisteredBool')?.valueChanges.subscribe(value => {
      if (!value) {
        this.applicationForm.get('vatRegistrationNumber')?.setValue(null);
      }
    });
  }


  populateFormFromAPI(applicationId: number): void {
    this.dataService.GetApplication(applicationId).subscribe(value => {
      console.log('API response:', value);
      this.applicationForm.patchValue({
        legalEntityName: value.legalEntityName,
        legalEntityRegistrationNumber: value.legalEntityRegistrationNumber,
        legalEntityTradingName: value.legalEntityTradingName,
        legalEntityPhysicalAddress: value.legalEntityPhysicalAddress,
        legalEntityPostalAddress: value.legalEntityPostalAddress,
        vatRegisteredBool: value.vatRegisteredBool,
        vatRegistrationNumber: value.vatRegistrationNumber,
        industryRegulatoryBodyId: value.industryRegulatoryBodyId,
        // otherRegistrationNumber: value.otherRegistrationNumber,
        // otherRegulatoryBody: value.otherRegulatoryBody,
        industryDescription: value.industryDescription,
        regulatoryBodyRegistrationNumber : value.regulatoryBodyRegistrationNumber,
        masterUserFullName: value.masterUserFullName,
        masterUserIdnumber: value.masterUserIdnumber,
        masterUserEmail: value.masterUserEmail,
        masterUserMobileNumber: value.masterUserMobileNumber,
        masterUserCapacity: value.masterUserCapacity,
        branchOutletBoolean: value.branchOutletBoolean,
        callCenterBoolean: value.callCenterBoolean,
        existingPaymentProviderBoolean: value.existingPaymentProviderBoolean,
        aetEmail: value.aetEmail,
        processingMonthlyLimit: value.processingMonthlyLimit,
        mandateTypeId: value.mandateTypeId,
        driveLink:value.driveLink,
        otherIndustryBody:value.otherIndustryBody,
        monthlyProcessingLimit:value.monthlyProcessingLimit
      });
      if (value.accounts?.$values && value.accounts.$values.length > 0) {
        const account1 = value.accounts.$values[0];
        this.applicationForm.patchValue({
          accountForm1: {
            accountHolderName: account1.accountHolderName,
            accountNumber: account1.accountNumber,
            accountTypeId: account1.accountTypeId,
            bankNameId: account1.bankNameId,
            branchName: account1.branchName,
            debitBool: account1.debitBool,
            aetBool: account1.aetBool
          }
        });
        
        // Assuming account2 exists, patch accountForm2 similarly
        if (value.accounts.$values.length > 1) {
          const account2 = value.accounts.$values[1];
          this.applicationForm.patchValue({
            accountForm2: {
              accountHolderName: account2.accountHolderName,
              accountNumber: account2.accountNumber,
              accountTypeId: account2.accountTypeId,
              bankNameId: account2.bankNameId,
              branchName: account2.branchName,
              minimumDailyTransferLimit: account2.minimumDailyTransferLimit,
              debitBool: account2.debitBool,
              aetBool: account2.aetBool
            }
          });
        }}

        const otherSuppliersReasons = value.otherSuppliersReasons?.$values || [];
        const otherDesc= otherSuppliersReasons.map((reason: any) => reason.otherDescription)
        if (otherSuppliersReasons.length > 0) {
          const formArray = this.applicationForm.get('otherSupplierReasons') as FormArray;
          formArray.clear(); // Clear existing form array items
    
          otherSuppliersReasons.forEach((reason: any, index: number) => {
            // Wrap alternativeSupplierReasonsId in an array if it isn't already
            const reasonIds = Array.isArray(reason.alternativeSupplierReasonsId) 
                              ? reason.alternativeSupplierReasonsId 
                              : [reason.alternativeSupplierReasonsId];
    
            const formGroup = this.fb.group({
              alternativeSupplierReasonsId: [reasonIds],
              otherDescription: String(otherDesc)
            });
            formArray.push(formGroup);
          });
        }


      const legalEntityDependants = value.legalEntityDependants?.$values || [];
      if (legalEntityDependants.length === 0) {
        this.addDependant(); // Add an empty dependant if none are present
      } else {
        this.loadDependants(legalEntityDependants);
      }
    //  this.loadDependants(value.legalEntityDependants?.$values || []);
      this.loadAuthorizedSignatories(value.authorizedSignatories?.$values || []);
      this.loadShareholders(value.shareholders?.$values || []);
    //  this.loadProcessingCodes(value.processingCodes?.$values || []);

      const existingCollections = value.existingCollections?.$values || [];
      const selectedCollectionTypeIds = existingCollections.map((collection: any) => collection.collectionTypeId);
      this.applicationForm.patchValue({
        collectionTypeIds: selectedCollectionTypeIds
      });
    this.selectedCollectionTypes = new Set<number>(selectedCollectionTypeIds);
      existingCollections.forEach((collection: any) => {
         
             const debiChecks = collection.debiChecks?.$values || [];
             if (debiChecks.length > 0) {
                 const debiCheck = debiChecks[0];
                 console.log('DebiCheck Object:', debiCheck);
                 this.applicationForm.get('debiCheck')?.patchValue({
                  monthlyValue: debiCheck.monthlyValue,
                  monthlyVolume: debiCheck.monthlyVolume,
                  successRate: debiCheck.successRate,
                  existingDispute: debiCheck.existingDispute,
                  averageTrackingDaysUsed: debiCheck.averageTrackingDaysUsed
              });
             }
            
                  /* if (collection.debiChecks && collection.debiChecks.$values.length > 0) {
                      const debiCheck = collection.debiChecks.$values[0];
                      console.log("debicheck: " +debiCheck)
                      this.applicationForm.get('debiCheck')?.patchValue({
                          monthlyValue: debiCheck.monthlyValue,
                          monthlyVolume: debiCheck.monthlyVolume,
                          successRate: debiCheck.successRate,
                          existingDispute: debiCheck.existingDispute,
                          averageTrackingDaysUsed: debiCheck.averageTrackingDaysUsed
                      });
                  } */
            
                  if (collection.efts && collection.efts.$values.length > 0) {
                      const eft = collection.efts.$values[0];
                      this.applicationForm.get('eft')?.patchValue({
                          monthlyValue: eft.monthlyValue,
                          monthlyVolume: eft.monthlyVolume,
                          successRate: eft.successRate,
                          existingDispute: eft.existingDispute
                      });
                  }
           
                  if (collection.sefts && collection.sefts.$values.length > 0) {
                      const seft = collection.sefts.$values[0];
                      this.applicationForm.get('seft')?.patchValue({
                          monthlyValue: seft.monthlyValue,
                          monthlyVolume: seft.monthlyVolume,
                          successRate: seft.successRate
                      });
                  }
          
                  if (collection.cardPayments && collection.cardPayments.$values.length > 0) {
                      const cardPayment = collection.cardPayments.$values[0];
                      this.applicationForm.get('cardPayment')?.patchValue({
                          monthlyDebitValue: cardPayment.monthlyDebitValue,
                          monthlyCreditValue: cardPayment.monthlyCreditValue,
                          currentServiceProvider: cardPayment.currentServiceProvider,
                          debitCommission: cardPayment.debitCommission,
                          creditCommission: cardPayment.creditCommission
                      });
                  }
              
                  if (collection.cashes && collection.cashes.$values.length > 0) {
                      const cash = collection.cashes.$values[0];
                      this.applicationForm.get('cash')?.patchValue({
                          monthlyValue: cash.monthlyValue,
                          monthlyVolume: cash.monthlyVolume,
                          successRate: cash.successRate,
                          electronicBoolean: cash.electronicBoolean
                      });
                  }
               //   break;

              // Add more cases if there are other collection types
          
      });

    
      const selectedProducts = value.selectedProducts?.$values || [];
      const selectedProductIds = selectedProducts.map((product: any) => product.productId);
      this.applicationForm.patchValue({
        productIds: selectedProductIds
      });
      this.selectedProducts= new Set<number>(selectedProductIds)
 
      selectedProducts.forEach((product:any) => {
          // DebiCheck Products
          const debiCheckProducts = product.debiCheckProducts?.$values || [];
          if (debiCheckProducts.length > 0) {
              const debiCheck = debiCheckProducts[0];
              this.applicationForm.get('debiCheckProducts')?.patchValue({
                  monthlyValue: debiCheck.totalValueMonthly,
                  maximumSingleCollection: debiCheck.maximumSingleCollection,
                  authenticationMechanismsId:debiCheck.authenticationMechanismsId,
                  totalValueMonthly: debiCheck.totalValueMonthly
              });
          }

          // Debit Credit Payments
          const debitCreditPayments = product.debitCreditPayments?.$values || [];
          if (debitCreditPayments.length > 0) {
              const debitCreditPayment = debitCreditPayments[0];
              this.applicationForm.get('debitCreditPayments')?.patchValue({
                  totalMonthlyValue: debitCreditPayment.totalMonthlyValue,
                  averageTransactionalValue: debitCreditPayment.averageTransactionalValue,
                  balanceEnquiryBool: debitCreditPayment.balanceEnquiryBool,
                  budgetFacilityBool: debitCreditPayment.budgetFacilityBool,
                  cashBackatPosBool: debitCreditPayment.cashBackatPosBool,
                  maximumSingleTransactionalValue: debitCreditPayment.maximumSingleTransactionalValue
              });
          }

          // EFT Debits
          const eftDebits = product.eftDebits?.$values || [];
          if (eftDebits.length > 0) {
              const eftDebit = eftDebits[0];
              this.applicationForm.get('eftDebits')?.patchValue({
                  totalValue: eftDebit.totalValue,
                  maximumSingleCollection: eftDebit.maximumSingleCollection
              });
          }

          // AVS
          const avs = product.avs?.$values || [];
          if (avs.length > 0) {
              const avsItem = avs[0];
              this.applicationForm.get('avs')?.patchValue({
                  avsRNumberofRequestsMonthly: avsItem.avsRNumberofRequestsMonthly,
                  numberofRequestsMonthly: avsItem.numberofRequestsMonthly
              });
          }

          // Social Grant EFTs
          const socialGrantEfts = product.socialGrantEfts?.$values || [];
          if (socialGrantEfts.length > 0) {
              const socialGrantEft = socialGrantEfts[0];
              this.applicationForm.get('socialGrantEfts')?.patchValue({
                  monthlyValue: socialGrantEft.monthlyValue
              });
          }

          // AllPS Management Platforms
          const allpsManagementPlatforms = product.allpsManagementPlatforms?.$values || [];
          if (allpsManagementPlatforms.length > 0) {
              const allps = allpsManagementPlatforms[0];
              this.applicationForm.get('allpsManagementPlatforms')?.patchValue({
                  ampId: allps.ampId,
                  expectedMonthlyRequests: allps.expectedMonthlyRequests,
                  feePayableAuthenticationSuccess: allps.feePayableAuthenticationSuccess,
                  feePayableDocumentCollection: allps.feePayableDocumentCollection,
                  automaticExpiration: allps.automaticExpiration,
                  automaticRevoke: allps.automaticRevoke
              });
          }
          const eftcreditDetail= product.eftcreditDetails?.$values || [];
          console.log("eftcreditdetail", product.eftcreditDetails?.$values)
          if (eftcreditDetail.length >0){
            const eft = eftcreditDetail[0];
            this.applicationForm.get('eftcreditDetail')?.patchValue({
              eftcreditDetailId: eft.eftcreditDetailId,
              eftCreditId:eft.eftCreditId,
              ewalletOptionId: eft.ewalletOptionId,
              deliveryAddress:eft.deliveryAddress,
              numberOfCards:eft.numberOfCards,
              numberOfPinMailers:eft.numberOfPinMailers,
            })
          }
      });
      const eftCreditId = this.applicationForm.get('eftcreditDetail.eftCreditId')?.value;
      
      if (eftCreditId) {
        this.onEftCreditChange();
      }
      this.entityId=value.legalEntityTypeId;
      this.folderId=value.driveLink
      console.log(this.folderId)
      // Optional: Log form values for debugging
      console.log('Form values after patching:', this.applicationForm.value);
      this.applicationStatusId=value.applicationStatusId;
      this.disableFormControls(true);
      console.log("AS " + value.applicationStatusId)
      this.isLoading = false; 
      this.legalDescription= value.legalEntityType.description;
   });
}
  
openCommentsSidebar() {
  if (this.commentSidebar) {
    this.commentSidebar.toggleSidebar();
  }
}  


disableFormControls(disabled: boolean): void {
  Object.keys(this.applicationForm.controls).forEach(controlName => {
    const control = this.applicationForm.get(controlName);
    if (control) {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.disableFormGroupOrArray(control, disabled);
      } else {
        if (disabled) {
          control.disable(); // Disable the control
        } else {
          control.enable(); // Enable the control
        }
      }
    }
  });
}

disableFormGroupOrArray(group: FormGroup | FormArray, disabled: boolean): void {
  Object.keys(group.controls).forEach(controlName => {
    const control = group.get(controlName);
    if (control) {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.disableFormGroupOrArray(control, disabled);
      } else {
        if (disabled) {
          control.disable(); // Disable the control
        } else {
          control.enable(); // Enable the control
        }
      }
    }
  });
}

getCapitecAetAccount(applicationId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    this.dataService.getAccounts(applicationId).subscribe({
      next: (response: any) => {
        const accounts = response.$values;
        this.capitecAetAccount = accounts.find((account: any) => account.aetBool === true);
        resolve();
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        reject(error);
      }
    });
  });
}

getBackupAccount(applicationId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    this.dataService.getAccounts(applicationId).subscribe({
      next: (response: any) => {
        const accounts = response.$values;
        const backupAccounts = Array.isArray(accounts) 
          ? accounts.filter((account: any) => account.backUpDebitBool === true) 
          : []; // Defaults to an empty array if not

        resolve(backupAccounts);
      },
      error: (error) => {
        console.error('Error fetching accounts', error);
        reject(error);
      }
    });
  });
}

loadProcessingCodes(): void {
  this.dataService.getProcessingCodes(this.applicationId).subscribe((codes:any) => {
    this.populateProcessingCodes(codes.$values);
  });
}




  populateProcessingCodes(processingCodes: any[]): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.clear();
  
    processingCodes.forEach((code, index) => {
      const formGroup = this.fb.group({
        pC_TradingName: [code.pC_TradingName],
        landlordName: [code.landlordName],
        landlordNumber: [code.landlordNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcEmailAddress: [code.pcEmailAddress, [Validators.email]],
        managerName: [code.managerName],
        managerNumber: [code.managerNumber, [Validators.pattern(/^0\d{9}$/)]],
        abbreviatedName: [code.abbreviatedName],
        physicalAddress: [code.physicalAddress],
        pcDebtorNumber: [code.pcDebtorNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcDebtorName: [code.pcDebtorName],
        pcDebtorTeleNumber: [code.pcDebtorTeleNumber, [Validators.pattern(/^0\d{9}$/)]],
        pcDebtorEmailAddress: [code.pcDebtorEmailAddress, [Validators.email]],
        debtorManagementSystemId: [code.debtorManagementSystemId],
        accountId: [code.accountId],
        optionId: [code.optionId ], // Load selected option from DB
      });
      processingCodeFormArray.push(formGroup);
  
      // Handle the optionId logic after form group is created
      this.handleOptionChangeAfterLoad(code.optionId, index);
    });
  }
  

  handleOptionChangeAfterLoad(optionId: number, index: number): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    const formGroup = processingCodeFormArray.at(index);
  
    // If optionId is 1, show Capitec Aet Account info
    if (optionId === 1) {
      this.getCapitecAetAccount(this.applicationId).then(() => {
        if (this.capitecAetAccount) {
          formGroup.patchValue({ accountId: this.capitecAetAccount.accountId });
        }
      });
    }
    // If optionId is 2, fetch the backup account regardless of whether accountId is set
    else if (optionId === 2) {
      const accountId = formGroup.get('accountId')?.value; // Get accountId from the current formGroup
    this.getBackupAccount(this.applicationId).then((backupAccounts) => {
      console.log('Fetched Backup Accounts:', backupAccounts);

      if (Array.isArray(backupAccounts)) {
        const filteredBackupAccount = backupAccounts.find((account: any) => account.accountId === accountId);

        if (filteredBackupAccount) {
          this.newlyAddedAccount[index] = filteredBackupAccount; // Assign to newlyAddedAccount
          formGroup.patchValue({ accountId: filteredBackupAccount.accountId });
        } else {
          this.newlyAddedAccount[index] = null; // No matching backup account, set to null
          formGroup.patchValue({ accountId: null }); // If no matching backup account found, set accountId to null
        }
      } else {
        console.error('backupAccounts is not an array:', backupAccounts);
        this.newlyAddedAccount[index] = null; // Set to null if not an array
        formGroup.patchValue({ accountId: null });
      }
    }).catch((error) => {
      console.error('Error fetching backup accounts', error);
      this.newlyAddedAccount[index] = null; // Handle error case
      formGroup.patchValue({ accountId: null });
    });
    }
    // If optionId is 3, apply previous selection logic
    else if (optionId === 3) {
      this.applyPreviousSelection(index);
    }
  
    formGroup.patchValue({ optionId: optionId }); // Store selected option
  }






  ngOnInit(): void {
    this.isLoading = true;
    this.loadRadioOptions();
    this.dataService.getEftCredits().subscribe(data => {
      this.eftCredits = data;
    });
    this.dataService.GetAllIndustryRegulatoryBodies().subscribe({
      next: (bodies) => {
        this.industryRegulatoryBodies = bodies;
      },
      error: (error) => {
        console.error('Error fetching industry regulatory bodies', error);
      }
    });
    this.dataService.GetAllRequiredDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
      },
      error: (error) => {
        console.error('Error fetching required documents list', error);
      }
    });
  //  this.onIndustryRegulatoryBodyChange();
    this.addSupplierReason();
    this.onVatRegisteredChange();
    this.applicationId = +this.route.snapshot.paramMap.get('applicationId')!;
    if (this.applicationId) {
    //  this.loadApplicationData();
      this.populateFormFromAPI(this.applicationId);
    
   
  }
 // console.log(this.driveLink);
    this.dataService.GetAllIdentificationTypes().subscribe({
      next: (types: IdentificationType[]) => {
        this.identificationTypes = types;
      },
      error: (error) => {
        console.error('Error fetching identification types', error);
      }
    });
    this.loadProcessingCodes();
    this.dataService.GetAllLegalEntityTypes().subscribe({
      next: (types: LegalEntityTypes[]) => {
        this.legalEntityTypes = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });


    this.dataService.GetAllAlternativeSupplierReasons().subscribe({
      next: (types: AlternativeSupplierReason[]) => {
        this.alternativeSupplierReasons = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });


    this.dataService.GetAllLegalEntityStructures().subscribe({
      next: (types: LegalEntityStructures[]) => {
        this.legalEntityStructures = types;
      },
      error: (error) => {
        console.error('Error fetching legal entity types', error);
      }
    });
    this.dataService.GetAllCollectionTypes().subscribe({
      next: (types) => {
        this.collectionTypes = types;
      },
      error: (error) => {
        console.error('Error fetching collection types', error);
      }
    });
    this.dataService.GetAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
    this.dataService.GetAllAuthenticationMechanisms().subscribe({
      next: (authenticationMechanisms) => {
        this.authenticationMechanisms = authenticationMechanisms;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
    this.dataService.GetAllBankNames().subscribe({
      next: (bankNames) => {
        this.banks = bankNames;
      },
      error: (error) => {
        console.error('Error fetching bank names', error);
      }
    });

    this.dataService.GetAllAccountTypes().subscribe({
      next: (accountTypes) => {
        this.accountTypes = accountTypes;
      },
      error: (error) => {
        console.error('Error fetching account types', error);
      }
    });
 
    this.dataService.GetAllMandateTypes().subscribe(data => {
       console.log('MandateTypes', data)
      this.mandateTypes = data;
     },
     error => {
       console.error('Error loading Mandate Types', error);
     });


     this.dataService.getRequiredDocuments(this.applicationId).subscribe((response: any) => {
      // Type assertion to inform TypeScript about the response structure
      this.requiredDocuments = response.$values;
      console.log("docs", this.requiredDocuments);
  });
  

    this.dataService.GetAllDebtorManagementSystems().subscribe(docs => {
      this.debtorManagementSystems = docs;
     
    });

    this.dataService.GetLegalEntityType(this.entityId).subscribe((desc:any) => {
      this.entityDescription =desc.description ;
    
    });
    this.getRequiredDocs(this.applicationId)

    this.dataService.GetAllDebtorManagementSystems().subscribe(docs => {
      this.debtorManagementSystems = docs;
     
    });
  }

  getRequiredDocs(applicationId:number){
    
    this.dataService.getRequiredDocuments(applicationId).subscribe((response: any) => {
      // Type assertion to inform TypeScript about the response structure
      this.requiredDocuments = response.$values;
      console.log("docs", this.requiredDocuments);
  });
  }
  onEftCreditChange(): void {
    this.selectedEftCreditId = this.applicationForm.get('eftcreditDetail.eftCreditId')?.value;

    if (this.selectedEftCreditId) {
      this.dataService.getEWalletOptions(this.selectedEftCreditId).subscribe(data => {
        this.eWalletOptions = data;
      });
    } else {
      this.eWalletOptions = [];
    }
  }

  onEwalletOptionChange(): void {
    this.selectedEwalletOptionId = this.applicationForm.get('eftcreditDetail.ewalletOptionId')?.value;
  }

  loadRadioOptions(): void {
    this.dataService.GetRadioOptions().subscribe((options:any) => {
      this.radioOptions = options.$values;
      console.log("radio",this.radioOptions)
    });
  }


  loadDependants(dependants: LegalEntityDependant[]): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.clear();

    dependants.forEach(dependant => {
      dependantFormArray.push(this.fb.group({
        legalEntityDependantId: [dependant.legalEntityDependantId],
        dependantsFullName: [dependant.dependantsFullName],
        dependantsIncomeTaxNumber: [dependant.dependantsIncomeTaxNumber],
        identificationTypeId: [dependant.identificationTypeId]
      }));
    });
    console.log("dependants "+dependantFormArray)
  }

  loadAuthorizedSignatories(signatories: AuthorizedSignatory[]): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.clear();

    signatories.forEach(signatory => {
      signatoryFormArray.push(this.fb.group({
        signatoriesEmailAddress: [signatory.signatoriesEmailAddress],
        signatoriesCapacity: [signatory.signatoriesCapacity],
        signatoriesCellNumber: [signatory.signatoriesCellNumber],
        signatoriesIdentificationNumber: [signatory.signatoriesIdentificationNumber],
        legalDependantBit: [signatory.legalDependantBit],
        signatoriesName:[signatory.signatoriesName],
      }));
    });
  }

  loadShareholders(shareholders: Shareholder[]): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.clear();

    shareholders.forEach(shareholder => {
      shareholderFormArray.push(this.fb.group({
        shareholderLegalEntityName: [shareholder.shareholderLegalEntityName],
        legalEntityStructureId: [shareholder.legalEntityStructureId]
      }));
    });
  }

  /*loadProcessingCodes(processingCodes: ProcessingCode[]): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.clear();

    processingCodes.forEach(code => {
        processingCodeFormArray.push(this.fb.group({
            pC_TradingName: [code.pC_TradingName],
            landlordName: [code.landlordName],
            landlordNumber: [code.landlordNumber],
            pcEmailAddress: [code.pcEmailAddress],
            managerName: [code.managerName],
            managerNumber: [code.managerNumber],
            abbreviatedName: [code.abbreviatedName],
            physicalAddress: [code.physicalAddress],
            pcDebtorNumber: [code.pcDebtorNumber],
            pcDebtorName: [code.pcDebtorName],
            pcDebtorTeleNumber: [code.pcDebtorTeleNumber],
            pcDebtorEmailAddress: [code.pcDebtorEmailAddress],
            debtorManagementSystemId: [code.debtorManagementSystemId],
        }));
    });
}
*/
  onCollectionTypeChange(event: MatSelectChange): void {
    const selectedValues = event.value as number[];
    this.selectedCollectionTypes = new Set<number>(selectedValues);
  }

  isCollectionTypeSelected(typeId: number): boolean {
    return this.selectedCollectionTypes.has(typeId);
  }

  getCollectionTypeFormGroup(typeId: number): FormGroup | null {
    switch (typeId) {
      case 1: // DebiCheck
        return this.applicationForm.get('debiCheck') as FormGroup;
      case 2: // EFT
        return this.applicationForm.get('eft') as FormGroup;
      case 3: // SEFT
        return this.applicationForm.get('seft') as FormGroup;
      case 4: // Card Payments
        return this.applicationForm.get('cardPayment') as FormGroup;
      case 5: // Cash
        return this.applicationForm.get('cash') as FormGroup;
      default:
        return null;
    }
  }

  onProductChange(event: MatSelectChange): void {
    const selectedValues = event.value as number[];
    this.selectedProducts = new Set<number>(selectedValues);
  }
  
  isProductSelected(productId: number): boolean {
    return this.selectedProducts.has(productId);
  }
  
  getProductFormGroup(productId: number): FormGroup | null {
    switch (productId) {
      case 1: // DebiCheck
        return this.applicationForm.get('debiCheckProducts') as FormGroup;
      case 2: // Debit & Credit Card Payments
        return this.applicationForm.get('debitCreditPayments') as FormGroup;
      case 3: // Social Grant EFT Debits
        return this.applicationForm.get('socialGrantEfts') as FormGroup;
      case 4: // EFT Debits
        return this.applicationForm.get('eftDebits') as FormGroup;
      case 5: // AVS/AVS-R
        return this.applicationForm.get('avs') as FormGroup;
      case 8: // ALLPS Management Platform
        return this.applicationForm.get('allpsManagementPlatforms') as FormGroup;
     /*  case 9: // Device Selection
        return this.applicationForm.get('deviceSelections') as FormGroup; */
      default:
        return null;
    }
  }
   
  private isSubmitting: boolean = false;

onSubmit(): void {
  
}

nextStep() {
  if (this.stepIndex < 11) {
    this.stepIndex++;
    this.stepper.next();
  }
}





onFinalSubmit(): void {
  if (this.applicationForm.valid) {
    this.dataService.clientSubmit(this.applicationId).subscribe({
      next: (response) => {
        console.log('Application submitted successfully', response);
        this.snackBar.open('Your application has been submitted successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/secondapplicant']);
      },
      error: (error) => {
        console.error('Error submitting application', error);
        this.snackBar.open('Error submitting application. Please try again.', 'Close', {
          duration: 5000, // Duration in milliseconds
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    });
  } else {
    this.snackBar.open('Please fill all required fields.', 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}



  addDependant(): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.push(this.fb.group({
      legalEntityDependantId: [0], // Default value for new dependants
      dependantsFullName: [''],
      dependantsIncomeTaxNumber: [''],
      identificationTypeId: ['']
    }));
  }
  private createDependantGroup(): FormGroup {
    return this.fb.group({
      legalEntityDependantId: [0], // Default value for new dependants
      dependantsFullName: [''],
      dependantsIncomeTaxNumber: [''],
      identificationTypeId: ['']
    });
  }

  removeDependant(index: number): void {
    const dependantFormArray = this.applicationForm.get('legalEntityDependants') as FormArray;
    dependantFormArray.removeAt(index);
  }

  addAuthorizedSignatory(): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    if (signatoryFormArray.length < 2) {
      signatoryFormArray.push(this.fb.group({
        signatoriesEmailAddress: [''],
        signatoriesCapacity: [''],
        signatoriesCellNumber: [''],
        signatoriesIdentificationNumber: [''],
        legalDependantBit: [null],
        signatoriesName: [],
      }));
    }
  }

  removeAuthorizedSignatory(index: number): void {
    const signatoryFormArray = this.applicationForm.get('authorizedSignatories') as FormArray;
    signatoryFormArray.removeAt(index);
  }

  addShareholder(): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.push(this.fb.group({
      shareholderLegalEntityName: [''],
      legalEntityStructureId: ['']
    }));
  }

  removeShareholder(index: number): void {
    const shareholderFormArray = this.applicationForm.get('shareholders') as FormArray;
    shareholderFormArray.removeAt(index);
  }


  addProcessingCode(): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.push(this.fb.group({
        pC_TradingName: [''],
        landlordName: [''],
        landlordNumber: [''],
        pcEmailAddress: [''],
        managerName: [''],
        managerNumber: [''],
        abbreviatedName: [''],
        physicalAddress: [''],
        pcDebtorNumber: [''],
        pcDebtorName: [''],
        pcDebtorTeleNumber: [''],
        pcDebtorEmailAddress: [''],
        debtorManagementSystemId: [''],
        accountId:null,
        optionId:null,
    }));
}

removeProcessingCode(index: number): void {
    const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
    processingCodeFormArray.removeAt(index);
}

get otherSupplierReasons(): FormArray {
  return this.applicationForm.get('otherSupplierReasons') as FormArray;
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

  get processingcodes(): FormArray {
    return this.applicationForm.get('processingcodes') as FormArray;
}
getBankName(bankNameId: number): string {
  const bank = this.banks.find(b => b.bankNameId === bankNameId);
  return bank ? bank.description : 'Unknown';
}

// Function to get account type by accountTypeId
getAccountType(accountTypeId: number): string {
  const accountType = this.accountTypes.find(at => at.accountTypeId === accountTypeId);
  return accountType ? accountType.description : 'Unknown';
}
get accountForm1() {
  return this.applicationForm.get('accountForm1') as FormGroup;
}
get accountForm2() {
  return this.applicationForm.get('accountForm2') as FormGroup;
}
getOptionControl(processingCode: AbstractControl): FormControl {
  return processingCode.get('optionId') as FormControl;
}


onRadioButtonChange(option: number, index: number): void {
  const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
  const formGroup = processingCodeFormArray.at(index);

  if (option === 1) {
    this.getCapitecAetAccount(this.applicationId).then(() => {
      if (this.capitecAetAccount) {
        formGroup.patchValue({ accountId: this.capitecAetAccount.accountId });
       
      }
    });
  } else if (option === 2) {
    formGroup.patchValue({ accountId: null });
  } else if (option === 3) {
   
    this.applyPreviousSelection(index)
  }

  formGroup.patchValue({ optionId: option }); // Store selected option
}

addNewAccount(index: number): void {
  console.log("yes")
  if (this.accountForm.valid) {
    const accountFormData = {
      ...this.accountForm.value,
      applicationId: this.applicationId // Assuming you have `applicationId` in your component
    };
    this.dataService.addBackupAccount(accountFormData).subscribe((newAccount) => {
      this.newlyAddedAccount[index] = newAccount;
      this.showAccountForm = false;
      this.processingcodes.at(index).patchValue({ accountId: newAccount.accountId , optionId:2});
      this.previousAccount = this.newlyAddedAccount;
    });
  }
}
applyPreviousSelection(index: number): void {
  if (index === 0) return; // No previous selection for the first item

const previousFormGroup = (this.applicationForm.get('processingcodes') as FormArray).at(index - 1);
const previousAccountId = previousFormGroup?.get('accountId')?.value;
console.log("previousAccountId ",previousAccountId);
const previousSelectedOption = previousFormGroup?.get('optionId')?.value;

this.dataService.getAccounts(this.applicationId).subscribe({
  next: (response: any) => {
    const accounts = response.$values;
    this.previousAccount[index] = accounts.find((account: any) => account.accountId === previousAccountId);

    // If the previousAccount is found, patch the form group
    if (this.previousAccount) {
      const formGroup = (this.applicationForm.get('processingcodes') as FormArray).at(index);
      formGroup.patchValue({
        accountId: previousAccountId,
        optionId: 3 // Carry over the previous selection
      });
    }
  }
});
}

getPreviousFormGroup(index: number): FormGroup | null {
  const processingCodeFormArray = this.applicationForm.get('processingcodes') as FormArray;
  return index > 0 ? processingCodeFormArray.at(index - 1) as FormGroup : null;
}



loadRequiredDocuments() {
  this.dataService.getRequiredDocuments(this.applicationId).subscribe({
    next: (response: any) => {
      this.requiredDocuments = response.$values;
      this.checkSubmitStatus();
    },
    error: (error) => {
      console.error('Error fetching required documents', error);
    },
  });
}

calculateDocumentAge(date: Date): number {
  const today = new Date();
  const diffInTime = today.getTime() - new Date(date).getTime();
  return Math.floor(diffInTime / (1000 * 60 * 60 * 24 * 30));
}

onDateChange(event: MatDatepickerInputEvent<Date>, submittedDoc: any) {
  if (event.value) {
    submittedDoc.documentAge = this.calculateDocumentAge(event.value);
    this.dataService.consultantVerifyDocument(submittedDoc).subscribe({
      next: () => {
        this.checkSubmitStatus();
      }
    });
  }
}

isHighlighted(age: number): boolean {
  return age > 3;
}

checkSubmitStatus() {
  const hasOldDocuments = this.requiredDocuments.some(doc =>
    doc.submittedDocuments?.$values.some((submittedDoc: any) => submittedDoc.documentAge > 3)
  );

  const hasSelectedDocuments = this.selectedDocumentIds.length > 0;

  this.isSubmitDisabled = hasOldDocuments || hasSelectedDocuments;
}

requestDocuments(applicationId: number): void {
  const dto = {
    applicationId: applicationId,
    requiredDocumentIds: this.selectedDocumentIds
  };

  this.dataService.requestAdditionalDocuments(dto).subscribe(
    response => {
      alert( response.message);
    },
    error => {
     alert(error.message);
    }
  );
}
/* 
removeFile(link:string): void {
  const file = this.selectedFiles[index];

  if (file.uploaded) {
    if (confirm('Are you sure you want to delete this document?')) {
      if (link) {
        // Extract Google Drive Document ID from the link
        const googleDriveDocId = link.split('/d/')[1]?.split('/')[0];

        if (googleDriveDocId) {
          this.dataService.deleteFile(googleDriveDocId).subscribe(
            response => {
              if (response) {
                // Check for success key in the response
                if (response.success) {
                  this.selectedFiles.splice(index, 1);
                  alert('File deleted successfully!'); // Success message
                } else {
                  alert('Failed to delete the file. Please try again.');
                }
              } else {
                alert('No response received from the server.');
              }
            },
            (error) => {
              console.error('Error deleting file:', error);
              alert('Failed to delete the file. Please try again.'); // Error message
            }
          );
        } else {
          console.error('Google Drive document ID is undefined, cannot delete file');
          alert('Failed to delete the file. Document ID is missing.');
        }
      } else {
        alert('File link is missing. Cannot delete the file.');
      }
    }
  } else {
    if (confirm('Are you sure you want to cancel this upload?')) {
      this.selectedFiles.splice(index, 1);
      alert('Upload cancelled.'); // Message for cancelling the upload
    }
  }
}

 */

deleteDocument(submittedDocumentId:number, link:string) {
 
  console.log("link",link)
  if (confirm('Are you sure you want to delete this document?')) {
    const googleDriveDocId = link.split('/d/')[1]?.split('/')[0];
    if (googleDriveDocId) {
      this.dataService.deleteFile(googleDriveDocId).subscribe(
        response => {
          if (response) {
            // Check for success key in the response
            if (response.success) {
             
              this.dataService.deleteSubmittedDocument(submittedDocumentId).subscribe({
                next: (response) => {
                  console.log('Document deleted successfully:', response);
                  alert("Deleted successfully")
                  this.loadRequiredDocuments();
                },
                error: (error) => {
                  alert(error.message);
                },
              });
            } else {
              alert('Failed to delete the file. Please try again.');
            }
          } else {
            alert('No response received from the server.');
          }
        },
        (error) => {
          console.error('Error deleting file:', error);
          alert('Failed to delete the file. Please try again.'); // Error message
        }
      );
    } else {
      console.error('Google Drive document ID is undefined, cannot delete file');
      alert('Failed to delete the file. Document ID is missing.');
    }
   
  }
}
get isDisabled(): boolean {
  return this.applicationStatusId !== 2;
}

isRowDisabled(verificationStatus: boolean): boolean {
  return verificationStatus || this.isDisabled;
}
submitApplication() {
  this.dataService.consultantSubmit(this.applicationId).subscribe(response => {
    alert(response.message);
    this.location.back();
  }, error => {
    alert(error.message);
  });
}

returnApplication() {
  this.dataService.consultantReturn(this.applicationId).subscribe(response => {
    alert(response.message);
    this.location.back();
  }, error => {
    alert(error.message);
  });
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

  openAssist(page: string): void {
    this.assistService.getApplicationContent(page).subscribe(content => {
      this.dialog.open(AssistModalComponent, {
        data: content
      });
    });
  }


 
}
