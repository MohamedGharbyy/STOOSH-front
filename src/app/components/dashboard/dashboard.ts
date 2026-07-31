import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionList } from '../transaction-list/transaction-list';
import { Transaction } from '../../transaction.model';
import { Sidebar, NavItem } from '../sidebar/sidebar';
import { Header, HeaderAction } from '../header/header';
import { StatCard } from '../stat-card/stat-card';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TransactionList, Sidebar, Header, StatCard],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  title = 'Dashboard';
  transactions: Transaction[] = [];
  
  sidebarCollapsed = false;
  
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-house-door', active: true },
    { label: 'Transactions', icon: 'bi-view-list' },
    { label: 'Analytics', icon: 'bi-bar-chart-line' },
    { label: 'Settings', icon: 'bi-gear' },
  ];
  
  // Stat card data
  totalBalance = '$24,580.00';
  income = '+$5,000.00';
  expenses = '-$1,250.00';
  netChange = '+$3,750.00';
  
  // Header actions
  headerActions: HeaderAction[] = [
    { label: 'Export', icon: 'bi-download', variant: 'secondary', action: 'export' },
  ];
  
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() headerAction = new EventEmitter<string>();
  
  constructor(private router: Router, private transactionService: TransactionService) {
    this.transactions = [...this.transactionService.getAllTransactions()];
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id);
    this.transactions = this.transactionService.getAllTransactions();
  }
  
  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebarToggle.emit();
  }
  
  onHeaderAction(action: string): void {
    this.headerAction.emit(action);
  }

  onNavItemClick(item: NavItem): void {
    if (item.label === 'Transactions') {
      this.router.navigate(['/transactions']);
    }
  }
}
