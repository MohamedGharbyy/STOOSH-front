import { Routes } from '@angular/router';
import { Dashboard } from './views/dashboard/dashboard.component';
import { Transactions } from './views/transactions/transactions.component';
import { Auth } from './views/auth/auth.component';
import { LogIn } from './views/auth/log-in/log-in.component';
import { SignUp } from './views/auth/sign-up/sign-up.component';
import { ForgotPassword } from './views/auth/forgot-password/forgot-password.component';
import { AuthGuard, GuestGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
  { path: 'transactions', component: Transactions, canActivate: [AuthGuard] },
  {
    path: 'auth',
    component: Auth,
    canActivate: [GuestGuard],
    children: [
      { path: '', redirectTo: 'log-in', pathMatch: 'full' },
      { path: 'log-in', component: LogIn },
      { path: 'sign-up', component: SignUp },
      { path: 'forgot-password', component: ForgotPassword },
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];