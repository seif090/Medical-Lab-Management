import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-emerald-400 pr-3">نظام الرواتب والأجور</h2>
        <div class="flex gap-2 text-[13px]">
           <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
            <lucide-icon name="calculator" [size]="16"></lucide-icon>
            اعتماد مسير الرواتب
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div class="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-sky-600">
             <lucide-icon name="users" [size]="24"></lucide-icon>
           </div>
           <div>
             <p class="text-[11px] font-black text-slate-400 uppercase">إجمالي الموظفين</p>
             <p class="text-xl font-black text-slate-900">24 موظف</p>
           </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div class="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
             <lucide-icon name="banknote" [size]="24"></lucide-icon>
           </div>
           <div>
             <p class="text-[11px] font-black text-slate-400 uppercase">إجمالي الرواتب</p>
             <p class="text-xl font-black text-slate-900">142,500 EGP</p>
           </div>
        </div>
        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex items-center gap-4">
           <div class="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
             <lucide-icon name="calendar-days" [size]="24"></lucide-icon>
           </div>
           <div>
             <p class="text-[11px] font-black text-slate-400 uppercase">يوم الصرف</p>
             <p class="text-xl font-black text-slate-900">25 من كل شهر</p>
           </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-700">قائمة الرواتب التفصيلية - أبريل 2026</h3>
          <div class="flex gap-2">
             <button class="p-1.5 text-slate-400 hover:text-sky-600"><lucide-icon name="search" [size]="14"></lucide-icon></button>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">الموظف</th>
              <th class="px-4 py-3 font-bold">الراتب الأساسي</th>
              <th class="px-4 py-3 font-bold">الإضافات / البدلات</th>
              <th class="px-4 py-3 font-bold text-rose-600">الخصومات</th>
              <th class="px-4 py-3 font-bold">صافي الراتب</th>
              <th class="px-4 py-3 font-bold text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let p of payroll()" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3">
                <div class="font-bold text-slate-800">{{ p.name }}</div>
                <div class="text-[10px] text-slate-400 font-bold uppercase">{{ p.role }}</div>
              </td>
              <td class="px-4 py-3 font-medium text-slate-600">{{ p.base | number }}</td>
              <td class="px-4 py-3 font-medium text-emerald-600">+ {{ p.allowance | number }}</td>
              <td class="px-4 py-3 font-medium text-rose-600">- {{ p.deductions | number }}</td>
              <td class="px-4 py-3 font-black text-slate-900">{{ p.net | number }} EGP</td>
              <td class="px-4 py-3 text-center">
                <button class="p-1.5 text-slate-400 hover:text-sky-600 border border-transparent hover:border-slate-200 rounded transition-all">
                  <lucide-icon name="file-text" [size]="14"></lucide-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PayrollComponent {
  payroll = signal([
    { name: 'د. أحمد المختبر', role: 'System Admin', base: 12000, allowance: 2500, deductions: 0, net: 14500 },
    { name: 'سارة خالد', role: 'Biologist', base: 8500, allowance: 1200, deductions: 300, net: 9400 },
    { name: 'محمد محمود', role: 'Technician', base: 6000, allowance: 1500, deductions: 0, net: 7500 },
    { name: 'نورا حسن', role: 'Lab Assistant', base: 4500, allowance: 500, deductions: 150, net: 4850 },
    { name: 'ياسين علي', role: 'Receptionist', base: 4000, allowance: 300, deductions: 500, net: 3800 },
  ]);
}

