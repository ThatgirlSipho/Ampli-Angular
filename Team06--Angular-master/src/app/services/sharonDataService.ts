import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountType } from '../shared/sharonModelClasses/shared/AccountType';
import { AlternativeSupplier } from '../shared/sharonModelClasses/shared/AlternativeSupplier';
import { AuthenticationMechanisms } from '../shared/sharonModelClasses/shared/AuthenticationMechanisms';
import { Bank } from '../shared/sharonModelClasses/shared/Bank';
import { DebtorManagement } from '../shared/sharonModelClasses/shared/DebtorManagement';
import { Identification } from '../shared/sharonModelClasses/shared/Identification';
import { IndustryRegulatory } from '../shared/sharonModelClasses/shared/IndustryRegulatory';
import { LegalEntity } from '../shared/sharonModelClasses/shared/LegalEntity';
import { RequiredDocument } from '../shared/sharonModelClasses/shared/RequiredDocument';



@Injectable({
  providedIn: 'root'
})
export class DataServices {


  apiUrl = 'https://localhost:7280/api/'


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) {
  }
//AccountType
  GetAllAccountTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllAccountTypes`)
    .pipe(map(result => result))
  }


  addAccountType(addAccountTypeAtt: AccountType){
    return this.httpClient.post<AccountType>(`${this.apiUrl}CRUD/AddAccountType`, addAccountTypeAtt)
    .pipe(map(result => result))
  }


  getAccountTypeId(accountTypeId: string): Observable<AccountType>{
    return this.httpClient.get<AccountType>(`${this.apiUrl}CRUD/GetAccountTypes/` + accountTypeId)
  }




  updateAccountType(id: number, accountTypeAtt: AccountType): Observable<AccountType>{
    return this.httpClient.put<AccountType>(`${this.apiUrl}CRUD/UpdateAccountType/` + id, accountTypeAtt)
  }


  deleteAccountType(accountTypeId: number): Observable<AccountType>{
    return this.httpClient.delete<AccountType>(`${this.apiUrl}CRUD/DeleteAccountType/` + accountTypeId)
  }


  //AlternativeSupplier
  GetAllAlternativeSupplierReasons(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllAlternativeSupplierReasons`)
    .pipe(map(result => result))
  }


  addAlternativeSupplierReason(addAlternativeSupplierAtt: AlternativeSupplier){
    return this.httpClient.post<AlternativeSupplier>(`${this.apiUrl}CRUD/AddAlternativeSupplierReason`, addAlternativeSupplierAtt)
    .pipe(map(result => result))
  }


  getAlternativeSupplierReasonId(alternativeSupplierId: string): Observable<AlternativeSupplier>{
    return this.httpClient.get<AlternativeSupplier>(`${this.apiUrl}CRUD/GetAlternativeSupplierReasons/` + alternativeSupplierId)
  }




  updateAlternativeSupplierReason(id: number, alternativeSupplierAtt: AlternativeSupplier): Observable<AlternativeSupplier>{
    return this.httpClient.put<AlternativeSupplier>(`${this.apiUrl}CRUD/UpdateAlternativeSupplierReason/` + id, alternativeSupplierAtt)
  }




  deleteAlternativeSupplierReason(alternativeSupplierId: number): Observable<AlternativeSupplier>{
    return this.httpClient.delete<AlternativeSupplier>(`${this.apiUrl}CRUD/DeleteAlternativeReason/` + alternativeSupplierId)
  }

  //Authentication Mechanisms
  GetAllAuthenticationMechanisms(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllAuthenticationMechanisms`)
    .pipe(map(result => result))
  }


  addAuthenticationMechanisms(addAuthenticationMechanismsAtt: AuthenticationMechanisms){
    return this.httpClient.post<AuthenticationMechanisms>(`${this.apiUrl}CRUD/AddAuthenticationMechanisms`, addAuthenticationMechanismsAtt)
    .pipe(map(result => result))
  }


  getAuthenticationMechanismsId(authenticationMechanismsId: string): Observable<AuthenticationMechanisms>{
    return this.httpClient.get<AuthenticationMechanisms>(`${this.apiUrl}CRUD/GetAuthenticationMechanism/` + authenticationMechanismsId)
  }




  updateAuthenticationMechanisms(id: number, authenticationMechanismsAtt: AuthenticationMechanisms): Observable<AuthenticationMechanisms>{
    return this.httpClient.put<AuthenticationMechanisms>(`${this.apiUrl}CRUD/UpdateAuthenticationMechanism/` + id, authenticationMechanismsAtt)
  }


  deleteAuthenticationMechanisms(authenticationMechanismsId: number): Observable<AuthenticationMechanisms>{
    return this.httpClient.delete<AuthenticationMechanisms>(`${this.apiUrl}CRUD/DeleteAuthenticationMechanism/` + authenticationMechanismsId)
  }


  //Bank
  GetAllBankNames(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllBankNames`)
    .pipe(map(result => result))
  }


  addBankName(addBankAtt: Bank){
    return this.httpClient.post<Bank>(`${this.apiUrl}CRUD/AddBankName`, addBankAtt)
    .pipe(map(result => result))
  }


  getBankNameId(bankId: string): Observable<Bank>{
    return this.httpClient.get<Bank>(`${this.apiUrl}CRUD/GetBankName/` + bankId)
  }




  updateBankName(id: number, bankNameAtt: Bank): Observable<Bank>{
    return this.httpClient.put<Bank>(`${this.apiUrl}CRUD/UpdateBankName/` + id, bankNameAtt)
  }


  deleteBankName(bankId: number): Observable<Bank>{
    return this.httpClient.delete<Bank>(`${this.apiUrl}CRUD/DeleteBankName/` + bankId)
  }


  //DebtorManagement
  GetAllDebtorManagementSystems(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllDebtorManagementSystems`)
    .pipe(map(result => result))
  }


  addDebtorManagementSystem(addDebtorManagementSystemAtt: DebtorManagement){
    return this.httpClient.post<DebtorManagement>(`${this.apiUrl}CRUD/AddDebtorManagementSystem`, addDebtorManagementSystemAtt)
    .pipe(map(result => result))
  }


  getDebtorManagementSystemId(debtorManagementId: string): Observable<DebtorManagement>{
    return this.httpClient.get<DebtorManagement>(`${this.apiUrl}CRUD/GetDebtorManagementSystem/` + debtorManagementId)
  }




  updateDebtorManagementSystem(id: number, debtorManagementAtt: DebtorManagement): Observable<DebtorManagement>{
    return this.httpClient.put<DebtorManagement>(`${this.apiUrl}CRUD/UpdateDebtorManagementSystem/` + id, debtorManagementAtt)
  }


  deleteDebtorManagementSystem(debtorManagementId: number): Observable<DebtorManagement>{
    return this.httpClient.delete<DebtorManagement>(`${this.apiUrl}CRUD/DeleteDebtorManagementSystem/` + debtorManagementId)
  }


  //Identification
  GetAllIdentificationTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllIdentificationTypes`)
    .pipe(map(result => result))
  }


  addIdentificationType(addIdentificationTypeAtt: Identification){
    return this.httpClient.post<Identification>(`${this.apiUrl}CRUD/AddIdentificationType`, addIdentificationTypeAtt)
    .pipe(map(result => result))
  }


  getIdentificationTypeId(identificationTypeId: string): Observable<Identification>{
    return this.httpClient.get<Identification>(`${this.apiUrl}CRUD/GetIdentificationType/` + identificationTypeId)
  }




  updateIdentificationType(id: number, identificationTypeAtt: Identification): Observable<Identification>{
    return this.httpClient.put<Identification>(`${this.apiUrl}CRUD/UpdateIdentificationType/` + id, identificationTypeAtt)
  }


  deleteIdentificationType(identificationTypeId: number): Observable<Identification>{
    return this.httpClient.delete<Identification>(`${this.apiUrl}CRUD/DeleteIdentificationType/` + identificationTypeId)
  }


  //IndustryReg
  GetAllIndustryRegulatoryBodies(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllIndustryRegulatoryBodies`)
    .pipe(map(result => result))
  }


  addIndustryRegulatoryBody(addIndustryRegulatoryAtt: IndustryRegulatory){
    return this.httpClient.post<IndustryRegulatory>(`${this.apiUrl}CRUD/AddIndustryRegulatoryBody`, addIndustryRegulatoryAtt)
    .pipe(map(result => result))
  }


  getIndustryRegulatoryBodyId(getIndustryRegulatoryBodyId: string): Observable<IndustryRegulatory>{
    return this.httpClient.get<IndustryRegulatory>(`${this.apiUrl}CRUD/GetIndustryRegulatoryBody/` + getIndustryRegulatoryBodyId)
  }




  updateIndustryRegulatoryBody(id: number, updateIndustryRegulatoryBodyAtt: IndustryRegulatory): Observable<IndustryRegulatory>{
    return this.httpClient.put<IndustryRegulatory>(`${this.apiUrl}CRUD/UpdateIndustryRegulatoryBody/` + id, updateIndustryRegulatoryBodyAtt)
  }


  deleteIndustryRegulatoryBody(industryRegulatoryId: number): Observable<IndustryRegulatory>{
    return this.httpClient.delete<IndustryRegulatory>(`${this.apiUrl}CRUD/DeleteIndustryRegulatoryBody/` + industryRegulatoryId)
  }


  //LegalEntity
  GetAllLegalEntityTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllLegalEntityTypes`)
    .pipe(map(result => result))
  }


  addLegalEntityType(addLegalEntityTypeAtt: LegalEntity){
    return this.httpClient.post<LegalEntity>(`${this.apiUrl}CRUD/AddLegalEntityType`, addLegalEntityTypeAtt)
    .pipe(map(result => result))
  }


  getLegalEntityTypeId(legalEntityTypeId: string): Observable<LegalEntity>{
    return this.httpClient.get<LegalEntity>(`${this.apiUrl}CRUD/GetLegalEntityType/` + legalEntityTypeId)
  }




  updateLegalEntityType(id: number, legalEntityTypeAtt: LegalEntity): Observable<LegalEntity>{
    return this.httpClient.put<LegalEntity>(`${this.apiUrl}CRUD/UpdateLegalEntityType/` + id, legalEntityTypeAtt)
  }


  deleteLegalEntityType(legalEntityId: number): Observable<LegalEntity>{
    return this.httpClient.delete<LegalEntity>(`${this.apiUrl}CRUD/DeleteLegalEntityType/` + legalEntityId)
  }


  //RequiredDocument
  GetAllRequiredDocuments(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllRequiredDocuments`)
    .pipe(map(result => result))
  }


  addRequiredDocument(addRequiredDocumentAtt: RequiredDocument){
    return this.httpClient.post<RequiredDocument>(`${this.apiUrl}CRUD/AddRequiredDocument`, addRequiredDocumentAtt)
    .pipe(map(result => result))
  }


  getRequiredDocumentId(requiredDocumentId: string): Observable<RequiredDocument>{
    return this.httpClient.get<RequiredDocument>(`${this.apiUrl}CRUD/GetRequiredDocument/` + requiredDocumentId)
  }




  updateRequiredDocument(id: number, requiredDocumentAtt: RequiredDocument): Observable<RequiredDocument>{
    return this.httpClient.put<RequiredDocument>(`${this.apiUrl}CRUD/UpdateRequiredDocument/` + id, requiredDocumentAtt)
  }


  deleteRequiredDocument(requiredDocumentId: number): Observable<RequiredDocument>{
    return this.httpClient.delete<RequiredDocument>(`${this.apiUrl}CRUD/DeleteRequiredDocument/` + requiredDocumentId)
  }

  GetAllIndustryRegulartoryBodies(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}CRUD/GetAllIndustryRegulartoryBodies`)
    .pipe(map(result => result))
  }
}