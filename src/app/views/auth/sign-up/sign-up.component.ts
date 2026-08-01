import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: '../auth-forms.css',
})
export class SignUp {
  constructor(private readonly authService: AuthService) {}

  handleAuthSubmit() {
    this.authService.logIn();
  }
}