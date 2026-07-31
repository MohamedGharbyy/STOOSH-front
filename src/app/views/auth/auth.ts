import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './auth.html',
})
export class Auth {
  authMode: 'login' | 'signup' | 'forgot' = 'login';

  @Output() loginSuccess = new EventEmitter<void>();

  handleAuthSubmit() {
    if (this.authMode === 'login') {
      this.loginSuccess.emit();
    }
  }

  switchAuthMode(mode: 'login' | 'signup' | 'forgot') {
    this.authMode = mode;
  }
}