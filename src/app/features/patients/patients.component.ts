import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  UserPlus,
  LucideAngularModule
} from 'lucide-angular';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-sky-400 pr-3">قائمة المرضى</h2>
        <button class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
          <lucide-icon name="user-plus" [size]="16"></lucide-icon>
          إضافة مريض جديد
        </button>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div class="relative flex-1 min-w-[200px]">
            <input type="text" placeholder="بحث باسم المريض أو الكود..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
            <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
          </div>
          <div class="flex gap-2">
            <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded text-[13px] font-bold text-slate-600 hover:bg-slate-50">
              <lucide-icon name="filter" [size]="14"></lucide-icon>
              <span>تصفية</span>
            </button>
            <select class="bg-white border border-slate-200 rounded px-3 py-1.5 text-[13px] text-slate-600 font-bold outline-none focus:ring-2 focus:ring-sky-500">
              <option>جميع المرضى</option>
              <option>مرضى اليوم</option>
              <option>الحالات الطارئة</option>
            </select>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">كود المريض</th>
              <th class="px-4 py-3 font-bold">الاسم بالكامل</th>
              <th class="px-4 py-3 font-bold">رقم الهاتف</th>
              <th class="px-4 py-3 font-bold">العمر / النوع</th>
              <th class="px-4 py-3 font-bold">تاريخ التسجيل</th>
              <th class="px-4 py-3 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let p of patients()" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-4 py-3">
                <span class="font-mono font-bold text-slate-500 text-xs">{{ p.id }}</span>
              </td>
              <td class="px-4 py-3 font-bold text-slate-800">{{ p.name }}</td>
              <td class="px-4 py-3 text-slate-600 font-mono text-[12px]">{{ p.phone }}</td>
              <td class="px-4 py-3 text-slate-600">
                {{ p.age }} سنة / {{ p.gender === 'male' ? 'ذكر' : 'أنثى' }}
              </td>
              <td class="px-4 py-3 text-slate-500 text-[12px] font-medium">{{ p.date }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded transition-all">
                    <lucide-icon name="edit-3" [size]="14"></lucide-icon>
                  </button>
                  <button class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all">
                    <lucide-icon name="trash-2" [size]="14"></lucide-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold bg-slate-50/30">
          <p>عرض {{ patients().length }} سجل من قاعدة البيانات</p>
          <div class="flex gap-1">
            <button class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 hover:bg-white transition-colors">1</button>
            <button class="w-6 h-6 flex items-center justify-center rounded bg-sky-600 text-white">2</button>
            <button class="w-6 h-6 flex items-center justify-center rounded border border-slate-200 hover:bg-white transition-colors text-slate-400">></button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PatientsComponent {
  patients = signal([
    { id: 'PAT-001', name: 'محمد علي منصور', phone: '01012345678', age: 34, gender: 'male', date: '28 أبريل 2026' },
    { id: 'PAT-002', name: 'سامية إبراهيم حسن', phone: '01122334455', age: 28, gender: 'female', date: '28 أبريل 2026' },
    { id: 'PAT-003', name: 'يوسف كمال فؤاد', phone: '01299887766', age: 45, gender: 'male', date: '27 أبريل 2026' },
  ]);
}
