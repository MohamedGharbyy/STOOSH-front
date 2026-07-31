import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard';
import { Transactions } from './views/transactions/transactions';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'transactions', component: Transactions },
  { path: '**', redirectTo: '/dashboard' }
];
