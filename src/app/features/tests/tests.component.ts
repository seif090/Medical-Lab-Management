import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-sky-400 pr-3">دليل التحاليل الطبية</h2>
        <button class="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2">
          <lucide-icon name="plus" [size]="16"></lucide-icon>
          إضافة تحليل جديد
        </button>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-4 items-center">
          <div class="relative flex-1 min-w-[200px]">
            <input type="text" placeholder="بحث باسم التحليل أو التصنيف..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
            <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
          </div>
          <div class="flex gap-2 text-[13px]">
            <span class="px-3 py-1 bg-sky-50 text-sky-600 rounded-full font-bold border border-sky-100">الكل: {{ tests().length }}</span>
            <span class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold border border-emerald-100">كيمياء</span>
            <span class="px-3 py-1 bg-amber-50 text-amber-600 rounded-full font-bold border border-amber-100">هرمونات</span>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">كود التحليل</th>
              <th class="px-4 py-3 font-bold">اسم التحليل (مختصر)</th>
              <th class="px-4 py-3 font-bold">الاسم الكامل</th>
              <th class="px-4 py-3 font-bold">التصنيف</th>
              <th class="px-4 py-3 font-bold">السعر (EGP)</th>
              <th class="px-4 py-3 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let t of tests()" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-4 py-3">
                <span class="font-mono font-bold text-slate-500 text-xs">{{ t.code }}</span>
              </td>
              <td class="px-4 py-3 font-bold text-sky-600">{{ t.shortName }}</td>
              <td class="px-4 py-3 text-slate-700 font-medium">{{ t.fullName }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-bold">{{ t.category }}</span>
              </td>
              <td class="px-4 py-3 font-bold text-slate-900">{{ t.price | number }}</td>
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
      </div>
    </div>
  `
})
export class TestsComponent {
  tests = signal([
    { code: 'CBC-01', shortName: 'CBC', fullName: 'Complete Blood Count', category: 'Hematology', price: 150 },
    { code: 'GLU-02', shortName: 'Glucose', fullName: 'Blood Glucose Random', category: 'Biochemistry', price: 80 },
    { code: 'LIP-03', shortName: 'Lipid Profile', fullName: 'Cholesterol, Triglycerides, HDL, LDL', category: 'Biochemistry', price: 350 },
    { code: 'TSH-04', shortName: 'TSH', fullName: 'Thyroid Stimulating Hormone', category: 'Hormones', price: 250 },
    { code: 'KID-05', shortName: 'Kidney Profile', fullName: 'Urea, Creatinine, Uric Acid', category: 'Biochemistry', price: 220 },
    { code: 'VIT-06', shortName: 'Vitamin D', fullName: '25-Hydroxy Vitamin D', category: 'Vitamins', price: 850 },
  ]);
}

