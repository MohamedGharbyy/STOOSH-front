import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../transaction.model';

@Component({
  selector: 'app-transaction-row',
  imports: [CommonModule],
  templateUrl: './transaction-row.html',
  styleUrl: './transaction-row.css',
})
export class TransactionRow {
  @Input() item!: Transaction;
  @Output() edit = new EventEmitter<Transaction>();
  @Output() delete = new EventEmitter<Transaction>();

  onRowClick(): void {
    this.edit.emit(this.item);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.item);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.item);
  }
}
