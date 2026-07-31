import { Injectable, signal, computed } from '@angular/core';
import { Transaction } from './models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactions = signal<Transaction[]>([
    {
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
    }
  ]);

  getAllTransactions(): Transaction[] {
    return this.transactions();
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.update(transactions => [...transactions, transaction]);
  }

  updateTransaction(updatedTransaction: Transaction): void {
    this.transactions.update(transactions =>
      transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  }

  deleteTransaction(id: number): void {
    this.transactions.update(transactions => transactions.filter(t => t.id !== id));
  }
}