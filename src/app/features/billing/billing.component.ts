import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-sky-400 pr-3">الحسابات والفواتير</h2>
        <button class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
          <lucide-icon name="plus" [size]="16"></lucide-icon>
          فاتورة جديدة
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="stat-card">
          <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">إجمالي مبيعات اليوم</p>
          <h3 class="text-xl font-bold text-slate-900">12,450 EGP</h3>
          <p class="text-[10px] text-emerald-600 mt-2 font-bold flex items-center gap-1">
             <lucide-icon name="trending-up" [size]="10"></lucide-icon>
             +15% عن أمس
          </p>
        </div>
        <div class="stat-card">
          <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">المبلغ المحصل</p>
          <h3 class="text-xl font-bold text-emerald-600">10,200 EGP</h3>
          <div class="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
            <div class="bg-emerald-500 h-full w-[82%]"></div>
          </div>
        </div>
        <div class="stat-card">
          <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">المبلغ المتبقي</p>
          <h3 class="text-xl font-bold text-rose-600">2,250 EGP</h3>
          <p class="text-[10px] text-slate-400 mt-2 font-bold">12 فاتورة غير مسددة</p>
        </div>
        <div class="stat-card">
          <p class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">متوسط قيمة الفاتورة</p>
          <h3 class="text-xl font-bold text-sky-600">450 EGP</h3>
          <p class="text-[10px] text-slate-400 mt-2 font-bold">بناءً على 28 فاتورة</p>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-700 font-sans tracking-tight">آخر الفواتير الصادرة</h3>
          <div class="flex gap-2">
            <button class="text-[12px] font-bold text-sky-600 hover:underline px-2">عرض الكل</button>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">رقم الفاتورة</th>
              <th class="px-4 py-3 font-bold">المريض</th>
              <th class="px-4 py-3 font-bold">المبلغ الكلي</th>
              <th class="px-4 py-3 font-bold text-center">الحالة</th>
              <th class="px-4 py-3 font-bold text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let inv of invoices()" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-4 py-3 font-mono font-bold text-slate-500 text-xs">{{ inv.id }}</td>
              <td class="px-4 py-3 font-bold text-slate-800">{{ inv.patient }}</td>
              <td class="px-4 py-3 font-bold text-slate-900">{{ inv.total | number }} EGP</td>
              <td class="px-4 py-3 text-center">
                <span 
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  [ngClass]="{
                    'bg-emerald-100 text-emerald-700': inv.remaining === 0,
                    'bg-amber-100 text-amber-700': inv.remaining > 0
                  }"
                >
                  {{ inv.remaining === 0 ? 'مسدد بالكامل' : 'رصيد متبقي' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <button class="text-sky-600 hover:text-sky-700 font-bold">
                  طباعة
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BillingComponent {
  invoices = signal([
    { id: 'INV-2023-001', patient: 'أحمد محمود', total: 650, paid: 650, remaining: 0 },
    { id: 'INV-2023-002', patient: 'سارة علي', total: 1200, paid: 500, remaining: 700 },
    { id: 'INV-2023-003', patient: 'ياسر محمد', total: 350, paid: 350, remaining: 0 },
    { id: 'INV-2023-004', patient: 'ليلى إبراهيم', total: 850, paid: 0, remaining: 850 },
    { id: 'INV-2023-005', patient: 'محمود حسن', total: 450, paid: 450, remaining: 0 },
  ]);
}

