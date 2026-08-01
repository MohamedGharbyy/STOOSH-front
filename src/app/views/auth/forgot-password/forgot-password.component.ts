import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../auth-forms.css',
})
export class ForgotPassword {
  constructor(private readonly authService: AuthService) {}

  handleAuthSubmit() {
    this.authService.logIn();
  }
}
