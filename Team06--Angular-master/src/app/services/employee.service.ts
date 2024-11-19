import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:44312/api/Administration/GetAllEmployees'; // Ensure this URL is correct
  private userProfileUrl = 'https://localhost:44312/api/Administration/GetEmployee';

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserProfile(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.userProfileUrl}/${employeeId}`);
  }
}

