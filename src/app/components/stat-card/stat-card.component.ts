import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatCardVariant = 'default' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCard {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() variant: StatCardVariant = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}