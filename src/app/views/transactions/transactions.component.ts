import { Component, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionList } from '../../components/transaction-list/transaction-list.component';
import { Sidebar, NavItem } from '../../components/sidebar/sidebar.component';
import { Header, HeaderAction } from '../../components/header/header.component';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

export type FilterType = 'all' | 'today' | 'lastWeek' | 'month';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule, TransactionList, Sidebar, Header],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class Transactions {
  transactions: Transaction[] = [];
  
  @Output() navigateToDashboard = new EventEmitter<void>();

  sidebarCollapsed = false;
  showAddModal = false;
  showEditModal = false;
  editingTransaction: Transaction | null = null;

  // Filter state
  selectedFilter = signal<FilterType>('all');
  selectedMonth = signal<number>(new Date().getMonth());
  selectedYear = signal<number>(new Date().getFullYear());

  // Form model
  newTransaction = {
    name: '',
    amount: 0,
    type: 'expense' as 'income' | 'expense',
    date: new Date()
  };

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  currentYear = new Date().getFullYear();
  years = Array.from({ length: 10 }, (_, i) => this.currentYear - 5 + i);

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'bi-house-door' },
    { label: 'Transactions', icon: 'bi-view-list', active: true },
    { label: 'Analytics', icon: 'bi-bar-chart-line' },
    { label: 'Settings', icon: 'bi-gear' },
  ];

  headerActions: HeaderAction[] = [
    { label: 'Add Transaction', icon: 'bi-plus-lg', variant: 'primary', action: 'add' },
  ];

  filteredTransactions = computed(() => {
    let result = [...this.transactions];
    const filter = this.selectedFilter();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (filter) {
      case 'today':
        result = result.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= today;
        });
        break;
      case 'lastWeek': {
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        result = result.filter(t => {
          const txDate = new Date(t.date);
          return txDate >= lastWeek && txDate <= now;
        });
        break;}
      case 'month':
        result = result.filter(t => {
          const txDate = new Date(t.date);
          return txDate.getMonth() === this.selectedMonth() && 
                 txDate.getFullYear() === this.selectedYear();
        });
        break;
    }

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  constructor(private readonly router: Router, private readonly transactionService: TransactionService) {
    this.transactions = this.transactionService.getAllTransactions();
  }

  onSidebarToggle(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onNavItemClick(item: NavItem): void {
    if (item.label === 'Dashboard') {
      this.router.navigate(['/dashboard']);
    }
  }

  onNavItemClickEvent(item: NavItem): void {
    this.onNavItemClick(item);
  }

  onHeaderAction(action: string): void {
    if (action === 'add') {
      this.openAddModal();
    }
  }

  openAddModal(): void {
    this.newTransaction = {
      name: '',
      amount: 0,
      type: 'expense',
      date: new Date()
    };
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  onModalKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeAddModal();
      this.closeEditModal();
    }
  }

  openEditModal(transaction: Transaction): void {
    this.editingTransaction = { ...transaction };
    this.newTransaction = {
      name: transaction.name,
      amount: transaction.amount,
      type: transaction.type,
      date: new Date(transaction.date)
    };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingTransaction = null;
  }

  onFilterChange(filter: FilterType): void {
    this.selectedFilter.set(filter);
  }

  onMonthChange(month: number): void {
    this.selectedMonth.set(month);
    this.selectedFilter.set('month');
  }

  onYearChange(year: number): void {
    this.selectedYear.set(year);
    this.selectedFilter.set('month');
  }

  saveTransaction(): void {
    if (!this.newTransaction.name || this.newTransaction.amount <= 0) {
      return;
    }

    const transaction: Transaction = {
      id: this.editingTransaction ? this.editingTransaction.id : Date.now(),
      name: this.newTransaction.name,
      amount: this.newTransaction.amount,
      type: this.newTransaction.type,
      date: this.newTransaction.date
    };

    if (this.editingTransaction) {
      this.transactionService.updateTransaction(transaction);
    } else {
      this.transactionService.addTransaction(transaction);
    }

    this.transactions = this.transactionService.getAllTransactions();
    this.closeAddModal();
    this.closeEditModal();
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id);
    this.transactions = this.transactionService.getAllTransactions();
  }
}