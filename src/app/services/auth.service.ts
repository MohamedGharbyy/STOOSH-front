import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isLoggedIn = signal(false);
  readonly isLoading = signal(false);

  constructor(private readonly router: Router) {}

  logIn(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoggedIn.set(true);
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}