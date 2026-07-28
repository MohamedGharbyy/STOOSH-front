import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../transaction.model';
import { TransactionRow } from '../transaction-row/transaction-row';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, TransactionRow],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {
  @Input() items: Transaction[] = [];
  @Output() editTransaction = new EventEmitter<Transaction>();
  @Output() deleteTransaction = new EventEmitter<Transaction>();
}
