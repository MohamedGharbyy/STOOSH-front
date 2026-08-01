import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar {
  @Input() collapsed: boolean = false;
  @Input() navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-house-door', active: true },
    { label: 'Transactions', icon: 'bi-view-list' },
    { label: 'Analytics', icon: 'bi-bar-chart-line' },
    { label: 'Settings', icon: 'bi-gear' },
  ];

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() navItemClick = new EventEmitter<NavItem>();

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onNavItemClick(item: NavItem): void {
    this.navItemClick.emit(item);
  }
}
