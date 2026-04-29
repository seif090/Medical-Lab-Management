import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-samples',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-sky-400 pr-3">إدارة وتتبع العينات</h2>
        <div class="flex gap-2">
          <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all hover:bg-slate-50 flex items-center gap-2">
            <lucide-icon name="printer" [size]="16"></lucide-icon>
            طباعة الباركود
          </button>
          <button class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
            <lucide-icon name="plus" [size]="16"></lucide-icon>
            تسجيل عينة
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div class="relative w-64">
              <input type="text" placeholder="بحث برقم العينة..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
              <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
            </div>
            <div class="flex gap-1.5">
              <button class="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-sky-600"><lucide-icon name="filter" [size]="14"></lucide-icon></button>
              <button class="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-sky-600"><lucide-icon name="refresh-cw" [size]="14"></lucide-icon></button>
            </div>
          </div>

          <table class="w-full text-right border-collapse text-[13px]">
            <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th class="px-4 py-3 font-bold">رقم العينة</th>
                <th class="px-4 py-3 font-bold">المريض</th>
                <th class="px-4 py-3 font-bold">نوع العينة</th>
                <th class="px-4 py-3 font-bold">وقت السحب</th>
                <th class="px-4 py-3 font-bold text-center">الحالة</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr *ngFor="let s of samples()" class="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                <td class="px-4 py-3 font-mono font-bold text-sky-600 text-xs">{{ s.id }}</td>
                <td class="px-4 py-3 font-bold text-slate-800">{{ s.patient }}</td>
                <td class="px-4 py-3 text-slate-600 font-medium">{{ s.type }}</td>
                <td class="px-4 py-3 text-slate-500 text-xs font-bold">{{ s.time }}</td>
                <td class="px-4 py-3 text-center">
                  <span 
                    class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider inline-block"
                    [ngClass]="{
                      'bg-emerald-50 text-emerald-700 border border-emerald-100': s.status === 'مكتمل',
                      'status-processing': s.status === 'قيد المعالجة',
                      'status-pending': s.status === 'بانتظار السحب'
                    }"
                  >
                    {{ s.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="space-y-6">
          <div class="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h3 class="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <lucide-icon name="activity" [size]="18" class="text-sky-500"></lucide-icon>
              حالة الأجهزة اليوم
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between group">
                <span class="text-sm font-medium text-slate-600">Cobas 6000 (Chemistry)</span>
                <span class="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  متصل
                </span>
              </div>
              <div class="flex items-center justify-between group">
                <span class="text-sm font-medium text-slate-600">Sysmex XN-1000</span>
                <span class="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                  <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  متصل
                </span>
              </div>
              <div class="flex items-center justify-between group">
                <span class="text-sm font-medium text-slate-600">Mini Vidas</span>
                <span class="flex items-center gap-1 text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold border border-amber-100">
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  صيانة
                </span>
              </div>
            </div>
          </div>

          <div class="bg-slate-900 text-white rounded-lg p-5 shadow-lg">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-sky-500 rounded flex items-center justify-center text-lg">🧪</div>
              <p class="text-xs font-bold text-sky-300">نصيحة المعمل</p>
            </div>
            <p class="text-[13px] leading-relaxed opacity-90">يجب التأكد من درجة حرارة الثلاجة المركزية وحفظ المحاليل الحساسة فور وصولها.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SamplesComponent {
  samples = signal([
    { id: 'S-2023-101', patient: 'يوسف العتيبي', type: 'Serum', time: '08:30 AM', status: 'مكتمل' },
    { id: 'S-2023-102', patient: 'هدى محمد', type: 'Whole Blood', time: '09:15 AM', status: 'قيد المعالجة' },
    { id: 'S-2023-103', patient: 'كريم محمود', type: 'Urine', time: '09:45 AM', status: 'قيد المعالجة' },
    { id: 'S-2023-104', patient: 'منى زكي', type: 'Serum', time: '10:10 AM', status: 'بانتظار السحب' },
    { id: 'S-2023-105', patient: 'أحمد علي', type: 'Plasma', time: '10:30 AM', status: 'قيد المعالجة' },
  ]);
}

