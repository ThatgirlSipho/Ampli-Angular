// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Check if user is authenticated
  isLoggedIn(): boolean {
    const user = localStorage.getItem('token'); // Or check using a token, session, etc.
    return !!user; // Return true if user exists
  }
}
