import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: '../auth-forms.css',
})
export class LogIn {
  constructor(private readonly authService: AuthService) {}

  handleAuthSubmit() {
    this.authService.logIn();
  }
}