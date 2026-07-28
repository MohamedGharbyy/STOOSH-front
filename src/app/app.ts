import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Dashboard } from './components/dashboard/dashboard';
import { Transactions } from './components/transactions/transactions';
import { Transaction } from './transaction.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('STOO$H');
  public transactions: Transaction[] = [{
    id: 1,
    name: 'Salary',
    amount: 2500,
    type: 'income',
    date: new Date('2026-06-29')
  },
  {
    id: 2,
    name: 'Electricity Bill',
    amount: 80,
    type: 'expense',
    date: new Date('2026-07-17')
  },
  {
    id: 3,
    name: 'Grocery Shopping',
    amount: 150,
    type: 'expense',
    date: new Date('2026-07-20')
  },
  {
    id: 4,
    name: 'Freelance Payment',
    amount: 1200,
    type: 'income',
    date: new Date('2026-07-18')
  },
  {
    id: 5,
    name: 'Netflix Subscription',
    amount: 15,
    type: 'expense',
    date: new Date('2026-07-15')
  }];

  isLoggedIn = signal(false);
  isLoading = signal(false);

  /** Show video background only when NOT loading AND NOT logged in (i.e., login page is active). */
  protected showVideoBg = computed(() => !this.isLoading() && !this.isLoggedIn());

  onLoginSuccess() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoggedIn.set(true);
      this.isLoading.set(false);
    }, 1000);
  }

  onSidebarToggle() {
    // Handle sidebar toggle from dashboard
    console.log('Sidebar toggled');
  }

  onHeaderAction(action: string) {
    // Handle header actions from dashboard
    console.log('Header action:', action);
    if (action === 'add') {
      // Add transaction logic
    } else if (action === 'export') {
      // Export logic
    }
  }
}
