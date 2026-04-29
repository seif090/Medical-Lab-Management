import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-emerald-400 pr-3">إدخال ومراجعة النتائج</h2>
        <div class="flex gap-2">
          <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-[13px] font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <lucide-icon name="check-check" [size]="16" class="text-emerald-500"></lucide-icon>
            اعتماد الكل
          </button>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div class="flex gap-4 items-center">
            <div class="relative w-64">
              <input type="text" placeholder="بحث برقم العينة أو المريض..." class="w-full bg-white border border-slate-200 rounded px-10 py-1.5 text-[13px] focus:ring-2 focus:ring-sky-500 outline-none font-medium">
              <lucide-icon name="search" [size]="14" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"></lucide-icon>
            </div>
            <div class="h-6 w-px bg-slate-300"></div>
            <div class="flex gap-2">
              <span class="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-black tracking-wider">بانتظار الإدخال: 8</span>
              <span class="px-2 py-1 bg-sky-100 text-sky-700 rounded text-[10px] font-black tracking-wider">بانتظار المراجعة: 5</span>
            </div>
          </div>
        </div>

        <table class="w-full text-right border-collapse text-[13px]">
          <thead class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[11px] tracking-wider">
            <tr>
              <th class="px-4 py-3 font-bold">العينة</th>
              <th class="px-4 py-3 font-bold">المريض</th>
              <th class="px-4 py-3 font-bold">التحليل</th>
              <th class="px-4 py-3 font-bold">القيمة</th>
              <th class="px-4 py-3 font-bold">المدى الطبيعي</th>
              <th class="px-4 py-3 font-bold text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr *ngFor="let res of pendingResults()" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3 font-mono font-bold text-slate-500 text-xs">{{ res.sampleId }}</td>
              <td class="px-4 py-3 font-bold text-slate-800">{{ res.patient }}</td>
              <td class="px-4 py-3 font-medium text-sky-600">{{ res.test }}</td>
              <td class="px-4 py-3">
                <input 
                  type="text" 
                  [placeholder]="res.unit" 
                  class="w-24 bg-white border border-slate-200 rounded px-2 py-1 text-center font-bold focus:ring-2 focus:ring-sky-500 outline-none"
                  [value]="res.value || ''"
                >
              </td>
              <td class="px-4 py-3 text-slate-500 text-[11px] font-bold">{{ res.referenceRange }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex justify-center gap-2">
                  <button class="px-3 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700 transition-colors">حفظ</button>
                  <button class="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded text-[11px] font-bold hover:bg-slate-50 transition-colors">مراجعة</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="bg-amber-50 border border-amber-100 rounded-lg p-5">
          <h3 class="font-bold text-amber-800 flex items-center gap-2 mb-2">
            <lucide-icon name="alert-triangle" [size]="18"></lucide-icon>
            نتائج حرجة (Critical Values)
          </h3>
          <p class="text-[12px] text-amber-700 leading-relaxed font-bold">يوجد عدد (2) نتائج تتجاوز المدى الخطر، يجب إبلاغ الطبيب المعالج فوراً.</p>
          <div class="mt-4 flex gap-2">
            <button class="text-[11px] font-bold bg-amber-700 text-white px-3 py-1.5 rounded">عرض الحالات الحرجة</button>
          </div>
        </div>
        
        <div class="bg-sky-50 border border-sky-100 rounded-lg p-5">
          <h3 class="font-bold text-sky-800 flex items-center gap-2 mb-2">
            <lucide-icon name="info" [size]="18"></lucide-icon>
            إحصائية الجودة
          </h3>
          <p class="text-[12px] text-sky-700 leading-relaxed font-bold">متوسط وقت الإنجاز (TAT) لهذا اليوم هو 120 دقيقة، وهو ضمن المدى المقبول.</p>
        </div>
      </div>
    </div>
  `
})
export class ResultsComponent {
  pendingResults = signal([
    { sampleId: 'L-2023-882', patient: 'سارة محمد علي', test: 'Hemoglobin (HGB)', value: '11.2', unit: 'g/dL', referenceRange: '12.0 - 16.0', status: 'Pending' },
    { sampleId: 'L-2023-883', patient: 'أحمد حسن القحطاني', test: 'Glucose Fasting', value: '', unit: 'mg/dL', referenceRange: '70 - 110', status: 'Entry' },
    { sampleId: 'L-2023-884', patient: 'فاطمة الزهراء', test: 'TSH', value: '4.5', unit: 'uIU/mL', referenceRange: '0.4 - 4.2', status: 'Review' },
    { sampleId: 'L-2023-885', patient: 'ياسر جلال', test: 'Creatinine', value: '', unit: 'mg/dL', referenceRange: '0.7 - 1.3', status: 'Entry' },
  ]);
}

