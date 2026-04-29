import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { 
  LUCIDE_ICONS,
  FlaskConical, 
  LayoutDashboard, 
  Users, 
  Beaker, 
  ClipboardCheck, 
  Receipt, 
  BarChart3, 
  Home, 
  PhoneCall, 
  BriefcaseBusiness, 
  WalletCards,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: LUCIDE_ICONS,
      useValue: { 
        FlaskConical, 
        LayoutDashboard, 
        Users, 
        Beaker, 
        ClipboardCheck, 
        Receipt, 
        BarChart3, 
        Home, 
        PhoneCall, 
        BriefcaseBusiness, 
        WalletCards, 
        LogOut, 
        Bell, 
        Search, 
        Menu, 
        X, 
        TrendingUp, 
        TrendingDown, 
        Clock, 
        CheckCircle2, 
        AlertCircle 
      }
    }
  ]
};
