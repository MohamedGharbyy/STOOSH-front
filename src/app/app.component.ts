import { Component, signal, computed } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Auth } from './views/auth/auth.component';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Auth],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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

  constructor(
    private readonly router: Router,
    private readonly transactionService: TransactionService
  ) {}

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
    if (action === 'add') {
      this.router.navigate(['/transactions']);
    } else if (action === 'export') {
      this.exportTransactions();
    }
  }

  private exportTransactions(): void {
    const transactions = this.transactionService.getAllTransactions();
    const csv = [
      ['ID', 'Name', 'Amount', 'Type', 'Date'],
      ...transactions.map(t => [
        t.id,
        `"${t.name.replaceAll('"', '""')}"`,
        t.amount,
        t.type,
        t.date.toISOString().split('T')[0]
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `stoosh-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
