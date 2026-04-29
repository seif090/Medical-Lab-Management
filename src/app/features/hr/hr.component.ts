import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-indigo-400 pr-3">الموارد البشرية (شؤون الموظفين)</h2>
        <div class="flex gap-2">
          <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-[13px] font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <lucide-icon name="user-plus" [size]="16"></lucide-icon>
            إضافة موظف
          </button>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div class="flex gap-8">
            <div class="flex flex-col">
              <span class="text-2xl font-bold text-slate-800">24</span>
              <span class="text-[10px] uppercase font-black text-slate-400 tracking-wider">إجمالي الموظفين</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-bold text-emerald-600">18</span>
              <span class="text-[10px] uppercase font-black text-slate-400 tracking-wider">متواجد حالياً</span>
            </div>
            <div class="flex flex-col">
              <span class="text-2xl font-bold text-amber-600">03</span>
              <span class="text-[10px] uppercase font-black text-slate-400 tracking-wider">في إجازة</span>
            </div>
          </div>
          
          <div class="relative w-64">
            <input type="text" placeholder="البحث عن موظف..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
            <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">اسم الموظف</th>
              <th class="px-4 py-3 font-bold">المسمى الوظيفي</th>
              <th class="px-4 py-3 font-bold">القسم</th>
              <th class="px-4 py-3 font-bold">الحالة</th>
              <th class="px-4 py-3 font-bold text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let staff of employees()" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3 font-bold text-slate-800">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-slate-500 font-bold">
                    {{ staff.name.charAt(0) }}
                  </div>
                  {{ staff.name }}
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600 font-medium">{{ staff.position }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold">{{ staff.department }}</span>
              </td>
              <td class="px-4 py-3">
                <span 
                  class="flex items-center gap-1.5 text-[11px] font-bold"
                  [ngClass]="staff.status === 'Present' ? 'text-emerald-600' : 'text-slate-400'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" [ngClass]="staff.status === 'Present' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'"></span>
                  {{ staff.status === 'Present' ? 'متواجد' : 'خارج المناوبة' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex justify-center gap-2">
                  <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all shadow-sm">
                    <lucide-icon name="user-check" [size]="14"></lucide-icon>
                  </button>
                  <button class="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all shadow-sm">
                    <lucide-icon name="file-text" [size]="14"></lucide-icon>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HrComponent {
  employees = signal([
    { name: 'د. أحمد المختبر', position: 'مدير النظام / استشاري مختبر', department: 'الإدارة العليا', status: 'Present' },
    { name: 'محمد محمود', position: 'فني سحب عينات', department: 'العمليات الميدانية', status: 'Present' },
    { name: 'سارة خالد', position: 'كيميائية مختصصة', department: 'مختبر الكيمياء', status: 'Present' },
    { name: 'ياسين علي', position: 'موظف استقبال', department: 'خدمة العملاء', status: 'Absent' },
    { name: 'نورا حسن', position: 'فنية تحاليل', department: 'الهيماتولوجي', status: 'Present' },
  ]);
}

