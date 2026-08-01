import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HeaderAction {
  label: string;
  icon: string;
  variant: 'primary' | 'secondary' | 'ghost';
  action: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header {
  @Input() title: string = 'Dashboard';
  @Input() actions: HeaderAction[] = [];

  @Output() actionClick = new EventEmitter<string>();

  profileMenuOpen = false;

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  onActionClick(action: string): void {
    this.actionClick.emit(action);
  }
}
