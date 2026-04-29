import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
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
