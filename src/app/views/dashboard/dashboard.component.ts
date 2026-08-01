import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionList } from '../../components/transaction-list/transaction-list.component';
import { Transaction } from '../../models/transaction.model';
import { Sidebar, NavItem } from '../../components/sidebar/sidebar.component';
import { Header, HeaderAction } from '../../components/header/header.component';
import { StatCard } from '../../components/stat-card/stat-card.component';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TransactionList, Sidebar, Header, StatCard],
  templateUrl: './dashboard.component.html',
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
  
  constructor(private readonly router: Router, private readonly transactionService: TransactionService) {
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
