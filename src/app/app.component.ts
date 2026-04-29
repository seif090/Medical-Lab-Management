import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  LayoutDashboard, 
  Users, 
  FlaskConical, 
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
  X
} from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  template: `
    <div class="flex h-screen bg-[#f8fafc] text-[#1e293b] font-cairo" dir="rtl">
      <!-- Sidebar -->
      <aside 
        class="fixed inset-y-0 right-0 z-50 w-[220px] bg-[#0f172a] text-[#f1f5f9] flex-shrink-0 shadow-xl lg:shadow-none transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
        [class.translate-x-full]="!isSidebarOpen"
      >
        <div class="flex flex-col h-full font-sans">
          <!-- Logo -->
          <div class="p-6 border-b border-slate-700/50 mb-4">
            <h1 class="text-xl font-bold text-sky-400">LabOS Pro</h1>
            <p class="text-[10px] text-slate-400 mt-1 font-bold">إدارة المعامل الذكية</p>
          </div>

          <!-- Navigation -->
          <nav class="flex-grow overflow-y-auto custom-scrollbar">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-item">
              <span class="text-lg">🏠</span>
              <span>لوحة القيادة</span>
            </a>
            <a routerLink="/patients" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">👥</span>
              <span>المرضى</span>
            </a>
            <a routerLink="/tests" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">📘</span>
              <span>دليل التحاليل</span>
            </a>
            <a routerLink="/samples" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">🧪</span>
              <span>تتبع العينات</span>
            </a>
            <a routerLink="/results" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">🖊️</span>
              <span>إدخال النتائج</span>
            </a>
            <a routerLink="/billing" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">💰</span>
              <span>الحسابات</span>
            </a>

            <div class="px-5 py-3 text-[10px] uppercase font-black text-slate-500 tracking-widest mt-4">إضافات</div>

            <a routerLink="/home-visit" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">📍</span>
              <span>الزيارات المنزلية</span>
            </a>
            <a routerLink="/call-center" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">📞</span>
              <span>مركز الاتصال</span>
            </a>
            <a routerLink="/inventory" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">📦</span>
              <span>المخزون</span>
            </a>
            
            <div class="px-5 py-3 text-[10px] uppercase font-black text-slate-500 tracking-widest mt-4">النظام</div>

            <a routerLink="/hr" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">👔</span>
              <span>الموظفين</span>
            </a>
            <a routerLink="/payroll" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">💳</span>
              <span>الرواتب</span>
            </a>
            <a routerLink="/reports" routerLinkActive="active" class="sidebar-item">
              <span class="text-lg">📊</span>
              <span>التقارير</span>
            </a>
          </nav>
          
          <div class="p-4 text-[10px] text-slate-500 border-t border-slate-800">
            نسخة النظام: 1.2.0-stable
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow flex flex-col min-w-0 overflow-hidden relative">
        <!-- Header -->
        <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <div class="flex items-center gap-4 w-1/2">
            <button (click)="toggleSidebar()" class="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded">
              <lucide-icon [name]="isSidebarOpen ? 'x' : 'menu'" [size]="20"></lucide-icon>
            </button>
            <div class="relative w-full">
              <input type="text" placeholder="بحث عن مريض، عينة، أو نتيجة..." class="w-full bg-slate-100 border-none rounded-md py-2 px-10 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
              <lucide-icon name="search" [size]="16" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-end">
              <span class="text-sm font-bold text-slate-900 leading-tight">د. أحمد المختبر</span>
              <span class="text-[10px] text-slate-500 font-bold">مدير النظام</span>
            </div>
            <div class="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-sky-50">
              أ
            </div>
          </div>
        </header>

        <!-- Page View -->
        <div class="flex-1 overflow-y-auto custom-scrollbar scroll-smooth" (scroll)="onScroll($event)">
          <div class="p-6">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
      
      <!-- Overlay -->
      <div *ngIf="isSidebarOpen" (click)="toggleSidebar()" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"></div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100%; }
    .sidebar-item {
      @apply py-3 px-5 flex items-center gap-3 transition-all cursor-pointer text-sm text-slate-300 border-r-4 border-transparent font-medium;
    }
    .sidebar-item:hover {
      @apply bg-[#1e293b] text-slate-100;
    }
    .sidebar-item.active {
      @apply bg-[#1e293b] text-white border-sky-400;
    }
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
  `]
})
export class AppComponent {
  isSidebarOpen = false;
  isScrolled = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.isScrolled = target.scrollTop > 20;
  }
}
