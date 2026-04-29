import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-6 animate-in fade-in duration-500 font-cairo">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 border-r-4 border-indigo-500 pr-3">التقارير والإحصائيات</h2>
        <div class="flex gap-2">
          <button class="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded text-[13px] font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <lucide-icon name="download" [size]="16"></lucide-icon>
            تصدير PDF
          </button>
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-[13px] font-bold shadow-sm transition-all flex items-center gap-2">
            <lucide-icon name="filter" [size]="16"></lucide-icon>
            تصفية الفترة
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-bold text-slate-500">أكثر التحاليل طلباً</h3>
            <lucide-icon name="pie-chart" [size]="18" class="text-indigo-400"></lucide-icon>
          </div>
          <div class="space-y-4">
             <div *ngFor="let item of topTests()" class="space-y-1">
                <div class="flex justify-between text-[11px] font-bold">
                  <span class="text-slate-700">{{ item.name }}</span>
                  <span class="text-indigo-600">{{ item.count }} حالة</span>
                </div>
                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-indigo-500 h-full transition-all duration-1000" [style.width]="item.percent + '%'"></div>
                </div>
             </div>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-bold text-slate-500">معدل الإنجاز (TAT)</h3>
            <lucide-icon name="timer" [size]="18" class="text-emerald-400"></lucide-icon>
          </div>
          <div class="flex flex-col items-center justify-center py-4">
             <div class="text-4xl font-black text-slate-900">112 <span class="text-xs font-bold text-slate-400">دقيقة</span></div>
             <p class="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
               <lucide-icon name="arrow-down" [size]="12"></lucide-icon>
               تحسن بنسبة 8% عن الشهر الماضي
             </p>
             <div class="mt-6 w-full h-20 flex items-end gap-1 px-4">
                <div *ngFor="let h of [40, 60, 45, 70, 55, 80, 50]" class="flex-1 bg-emerald-100 rounded-t-sm hover:bg-emerald-500 transition-all cursor-help" [style.height]="h + '%'"></div>
             </div>
          </div>
        </div>

        <div class="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-sm font-bold text-slate-500">الإيرادات الشهرية</h3>
            <lucide-icon name="trending-up" [size]="18" class="text-sky-400"></lucide-icon>
          </div>
          <div class="space-y-6">
             <div>
               <p class="text-xs text-slate-400 font-bold mb-1">صافي الربح</p>
               <p class="text-2xl font-black text-slate-900">342,800 <span class="text-xs font-normal">EGP</span></p>
             </div>
             <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase">الزيارات</p>
                  <p class="text-sm font-bold">1,248</p>
                </div>
                <div>
                  <p class="text-[10px] text-slate-400 font-bold uppercase">المتوسط</p>
                  <p class="text-sm font-bold">274 EGP</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div class="bg-[#0f172a] text-white rounded-xl p-8 overflow-hidden relative">
         <div class="relative z-10">
           <h3 class="text-xl font-bold mb-2">تحليل جودة المعمل العام</h3>
           <p class="text-slate-400 text-sm max-w-md">النظام يشير إلى زيادة في دقة النتائج بنسبة 99.8% خلال الربع الأخير مع التزام تام بمعايير الجودة العالمية.</p>
           <div class="mt-8 flex gap-8">
              <div class="flex flex-col">
                <span class="text-3xl font-black text-sky-400">99.8%</span>
                <span class="text-[10px] uppercase tracking-widest font-black text-slate-500">الجودة الدقيقة</span>
              </div>
              <div class="flex flex-col">
                <span class="text-3xl font-black text-emerald-400">0.02%</span>
                <span class="text-[10px] uppercase tracking-widest font-black text-slate-500">معدل الخطأ</span>
              </div>
           </div>
         </div>
         <lucide-icon name="shield-check" [size]="200" class="absolute -right-20 -bottom-20 text-white/5"></lucide-icon>
      </div>
    </div>
  `
})
export class ReportsComponent {
  topTests = signal([
    { name: 'CBC', count: 450, percent: 85 },
    { name: 'Glucose', count: 320, percent: 65 },
    { name: 'Vitamin D', count: 210, percent: 45 },
    { name: 'Lipid Profile', count: 180, percent: 35 },
    { name: 'TSH', count: 150, percent: 30 },
  ]);
}

