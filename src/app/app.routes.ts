import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'patients',
    loadComponent: () => import('./features/patients/patients.component').then(m => m.PatientsComponent)
  },
  {
    path: 'tests',
    loadComponent: () => import('./features/tests/tests.component').then(m => m.TestsComponent)
  },
  {
    path: 'samples',
    loadComponent: () => import('./features/samples/samples.component').then(m => m.SamplesComponent)
  },
  {
    path: 'results',
    loadComponent: () => import('./features/results/results.component').then(m => m.ResultsComponent)
  },
  {
    path: 'billing',
    loadComponent: () => import('./features/billing/billing.component').then(m => m.BillingComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'home-visit',
    loadComponent: () => import('./features/home-visit/home-visit.component').then(m => m.HomeVisitComponent)
  },
  {
    path: 'call-center',
    loadComponent: () => import('./features/call-center/call-center.component').then(m => m.CallCenterComponent)
  },
  {
    path: 'hr',
    loadComponent: () => import('./features/hr/hr.component').then(m => m.HrComponent)
  },
  {
    path: 'payroll',
    loadComponent: () => import('./features/payroll/payroll.component').then(m => m.PayrollComponent)
  }
];
